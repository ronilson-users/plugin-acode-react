// testando

import plugin from '../plugin.json';
import LRUCache from './cache.js';
//import { snippets } from './snippets.js';

const editor = editorManager.editor;
const { activeFile } = editorManager;
//const { snippetManager } = ace.require('ace/snippets');

class AcodePluginAutoImport {
	constructor() {
		this.directoryCache = new LRUCache(50);

		this.editor = editor;
		//this.snippetManager = snippetManager;
		//this.initializeSnippetInsertion();
		this.archivePathsInCache();
	}

	async archivePathsInCache() {
		const fileList = acode.require('fileList');
		const list = await fileList();

		list.forEach(item => {
			this.directoryCache.set(item.name, {
				url: item.url,
				path: item.path,
			});

			//	console.log('item', item.path);
		});
	}

	async init() {
		this.editor.on('change', this.handleCodeChange.bind(this)); // Adicione um ouvinte de alteração no código
	}

	handleCodeChange(e) {
		console.log('handlEnvent', e);

		// Lógica para capturar a abertura da tag `<` e observar o que vem depois
		const session = this.editor.session;
		const cp = this.editor.getCursorPosition();

		const mainRow = session.getValue().split('\n')[cp.row];

		const openCol = this.findTagOpening(mainRow, cp.column);

		if (openCol !== -1) {
			const tagName = this.extractTag(mainRow, openCol);

			const contentAfterOpeningTag = mainRow.substring(openCol + 1);

			//Faz busca do componente no diretorio para realizar a construção do importIntellisense
			const componentCache = this.findTagNameCachePath(tagName);
			console.log('findTagNameCachePath', componentCache);
			// Verifica se o componente foi encontrado no cache antes de chamar criarImportIntellisense
			if (componentCache && componentCache.directoryForTagName) {
				this.importIntellisense(tagName, componentCache);

				// console.log('tagName', tagName)
				//     console.log('componentCache', componentCache)
			}
		}
	}

	findTagOpening(row, column) {
		for (let n = column; n >= 0; n--) {
			if (row[n] === '<') {
				return n;
			}
		}
		return -1; // Retorna -1 se não encontrar a abertura da tag
	}

	extractTag(row, openCol) {
		let tagName = '';
		for (let i = openCol + 1; i < row.length; i++) {
			if (row[i] === ' ' || row[i] === '>') {
				break;
			}
			tagName += row[i];
		}
		return tagName;
	}

	findTagNameCachePath(tagName) {
		const { activeFile } = editorManager;

		const currentFileName = activeFile.filename || '';

		// Busca no cache para o tagName
		const cachedItem = this.directoryCache.get(tagName);

		console.log('cachedItem', cachedItem);

		if (cachedItem) {
			console.log(`Diretório do arquivo cache ${cachedItem.path}`);
		} else {
			console.log(`Arquivo "${tagName}" não encontrado no cache.`);
		}

		// Busca no cache para o activeFile
		const currentItem = this.directoryCache.get(currentFileName);

		if (currentItem) {
			console.log(`Diretório do arquivo atual "${currentFileName}": ${currentItem.path}`);
		} else {
			console.log(`Arquivo atual "${currentFileName}" não encontrado no cache.`);
		}

		// Retorna ambos os diretórios ou null se não encontrados
		return {
			directoryForTagName: cachedItem ? cachedItem.path : null,

			directoryForCurrentFile: currentItem ? currentItem.path : null,
		};
	}

	getFormattedPath(path) {
		if (path && path.startsWith('content://com.termux.documents/tree')) {
			path = path.split('::')[1];
			let termuxPath = path.replace(/^\/data\/data\/com\.termux\/files\/home/, '$HOME');

			// Adicione a lógica para avançar até a pasta do projeto, considerando "src" como base
			termuxPath = termuxPath.replace(/\/path\/path\//, '/path/path/src/');

			// console.log('termuxPath', termuxPath)
			return termuxPath;
		}
		// Caso não satisfaça a condição, retorne o caminho original
		return path;
	}

	importIntellisense(tagName, directory) {
		try {
			if (!editorManager.activeFile.filename) return;

			const currentFilePath = editorManager.activeFile.filename;
			//
			const formattedPath = this.getFormattedPath(currentFilePath);

			console.log('arquivo ativo', formattedPath);

			if (!formattedPath || typeof directory !== 'object') {
				console.error('Parâmetros inválidos.');
				return;
			}

			const relativePath = this.calculateRelativePath(formattedPath, directory.directoryForTagName);

			console.log('relativePath', relativePath);

			const importStatement = `import ${tagName} from '${relativePath}';`;

			const insertionPosition = this.findInsertionPosition(); // Lembre-se de definir esta função conforme a lógica do seu código

			this.editor.session.insert(insertionPosition, `${importStatement}\n`);
			console.log(`Importação automática para "${tagName}" realizada.`);
		} catch (error) {
			console.error('Erro no importIntellisense ◇ :', error);
		}
	}

	findInsertionPosition() {
		// Encontra a posição de inserção, por exemplo, no topo do arquivo
		return {
			row: 0,
			column: 0,
		};
	}

	calculateRelativePath(fromPath, toPath) {
		const fromParts = fromPath.split('/');
		const toParts = toPath.split('/');

		// Encontrar o índice da parte 'src'
		const srcIndex = fromParts.indexOf('src');

		console.log(srcIndex);

		// Se 'src' estiver presente, encontre a última parte comum a partir de 'src'
		let commonIndex = srcIndex === -1 ? 0 : srcIndex;

		while (
			commonIndex < fromParts.length &&
			commonIndex < toParts.length &&
			fromParts[commonIndex] === toParts[commonIndex]
		) {
			commonIndex++;
		}

		// Se não houver partes comuns, os caminhos estão no mesmo diretório
		if (commonIndex === 0) {
			return `./${toPath}`;
		}

		// Construa o caminho relativo subindo de 'src' e descendo para 'toPath'
		const relativePath = Array(fromParts.length - commonIndex)
			.fill('..')
			.concat(toParts.slice(commonIndex))
			.join('/');
		return `./${relativePath}`;
	}

	async destroy() {
		// Adicione sua lógica de limpeza aqui, se necessário
		this.editor.off('change', this.handleCodeChange); // Remova o ouvinte de alteração no código
	}
}

if (window.acode) {
	const acodePlugin = new AcodePluginAutoImport();
	acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
		if (!baseUrl.endsWith('/')) {
			baseUrl += '/';
		}
		acodePlugin.baseUrl = baseUrl;
		await acodePlugin.init($page, cacheFile, cacheFileUrl);
	});
	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}
