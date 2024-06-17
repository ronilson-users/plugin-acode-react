import plugin from '../plugin.json';
import { snippets } from './snippets.js';

const editor = editorManager.editor;
const { snippetManager } = ace.require('ace/snippets');

class AcodePluginRN {
	constructor() {
		this.editor = editor;
		this.snippetManager = snippetManager;
		this.directoryPaths = {};
		this.initializeSnippetInsertion();
	}

	initializeSnippetInsertion() {
		this.editor.completers = [this];
	}

	getLastWord(editor) {
		const cursor = editor.getCursorPosition();
		const line = editor.session.getLine(cursor.row);
		return line.substr(0, cursor.column).split(/\s+/).pop();
	}

	async getPathsRoot() {
		try {
			const fileList = acode.require('fileList');
			const list = await fileList();

			for (const item of list) {
				this.directoryPaths[item.name] = {
					url: item.url,
					path: item.path,
				};
			}
		} catch (error) {
			console.error('Erro ao arquivar caminhos :', error);
		}
	}

	getCompletions(editor, session, pos, prefix, callback) {
		const cursor = editor.getCursorPosition();
		const line = session.getLine(cursor.row);
		const lastWord = this.getLastWord(editor);
		const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));

		if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {
			const suggestions = matchedSnippets.map(snippet => ({
				caption: snippet.prefix,
				snippet: snippet.snippet,
				meta: snippet.type,
				value: snippet.snippet,
				score: 600 || 0,
				type: 'snippet',
				docHTML: snippet.description || '',
			}));

			if (typeof extraSyntaxHighlightsInstalled !== 'undefined' && extraSyntaxHighlightsInstalled) {
				suggestions.forEach(suggestion => (suggestion.icon = 'icon ace_completion-icon ace_class'));
			}

			return callback(null, suggestions);
		} else {
			return callback(null, []);
		}
	}

	async init() {
		const style = document.createElement('style');
		style.id = 'helpDescription';
		style.innerHTML = `
      .ace_tooltip.ace_doc-tooltip {
        display: flex !important;
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        max-width: 78%;
        white-space: pre-wrap;
      }
    `;
		document.head.append(style);
		this.editor.on('change', this.handleCodeChange.bind(this));
		await this.getPathsRoot(); // Chame o método para arquivar os caminhos
	}

	async handleCodeChange(e) {
		const session = this.editor.session;
		const cp = this.editor.getCursorPosition();
		const mainRow = session.getValue().split('\n')[cp.row];
		const openCol = this.findTagOpening(mainRow, cp.column);

		if (openCol !== -1) {
			const tagName = this.extractTag(mainRow, openCol);
			const componentCache = await this.findTagNameCachePath(tagName);

			if (componentCache && componentCache.directoryForTagName) {
				this.importIntellisense(tagName, componentCache);
			}
		}
	}

	findTagOpening(row, column) {
		for (let n = column; n >= 0; n--) {
			if (row[n] === '<') {
				return n;
			}
		}
		return -1;
	}

	extractTag(row, openCol) {
		let tagName = '';
		let closeTag = false;

		for (let i = openCol + 1; i < row.length; i++) {
			if (row[i] === ' ' || row[i] === '>') {
				if (closeTag) {
					tagName += '>';
				}
				break;
			}
			if (row[i] === '<') {
				closeTag = true;
			}
			tagName += row[i];
		}
		return tagName;
	}

	async findTagNameCachePath(tagName) {
		try {
			const { activeFile } = editorManager;
			const currentFileName = activeFile.filename || '';
			const dir = activeFile.uri || '';

			const targetPath = this.directoryPaths[tagName];
			const currentFilePath = this.directoryPaths[currentFileName];

			if (targetPath) {
				return {
					directoryForTagName: targetPath.path,
					directoryForCurrentFile: currentFilePath ? currentFilePath.path : null,
				};
			} else {
				return {
					directoryForTagName: null,
					directoryForCurrentFile: null,
				};
			}
		} catch (error) {
			console.error('Erro ao encontrar o caminho do cache para o tagName:', error);
			return {
				directoryForTagName: null,
				directoryForCurrentFile: null,
			};
		}
	}

	async importIntellisense(tagName, directory) {
		try {
			const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);
			const fileExists = await this.checkIfFileExists(directory.directoryForTagName);

			if (!fileExists) {
				window.toast('Component file not found', 4000);
				return;
			}

			const extensionIndex = tagName.lastIndexOf('.');
			const tagNameWithoutExtension = tagName.substring(0, extensionIndex);
			const importStatement = `import ${tagNameWithoutExtension} from '${relativePath}';`;

			const code = this.editor.session.getValue();
			const importRegex = new RegExp(`import\\s+${tagNameWithoutExtension}\\s+from\\s+'${relativePath}'`);

			if (!importRegex.test(code)) {
				const insertionPosition = this.findInsertionPosition();
				this.editor.session.insert(insertionPosition, `${importStatement}\n`);
				this.closeTag();
				window.toast('The import was created at the top ☝️ ', 3000);
			}
		} catch (error) {
			console.error('Erro no importIntellisense:', error);
			window.toast('Component not found', 4000);
			await this.getPathsRoot();
		}
	}

	async checkIfFileExists(path) {
		try {
			// Implementação para verificar se o arquivo existe usando o fileList ou outro método apropriado
			const fileList = acode.require('fileList');
			const list = await fileList();
			const fileExists = list.some(item => item.path === path);
			return fileExists;
		} catch (error) {
			console.error('Erro ao verificar a existência do arquivo:', error);
			return false;
		}
	}

	closeTag() {
		const cp = this.editor.getCursorPosition();
		this.editor.session.insert(cp, `/>\n`);
	}

	findInsertionPosition() {
		return { row: 0, column: 0 };
	}

	calculateRelativePath(currentDirectory, targetDirectory) {
		const currentPathParts = currentDirectory.split('/');
		const targetPathParts = targetDirectory.split('/');

		let commonPathLength = 0;
		while (
			commonPathLength < currentPathParts.length &&
			commonPathLength < targetPathParts.length &&
			currentPathParts[commonPathLength] === targetPathParts[commonPathLength]
		) {
			commonPathLength++;
		}

		let relativePath = '';
		if (commonPathLength === currentPathParts.length - 1 && commonPathLength === targetPathParts.length - 1) {
			relativePath = './' + targetPathParts[targetPathParts.length - 1];
		} else {
			for (let i = commonPathLength; i < currentPathParts.length - 1; i++) {
				relativePath += '../';
			}

			if (!relativePath.startsWith('./') && !relativePath.startsWith('../')) {
				relativePath = './' + relativePath;
			}

			for (let i = commonPathLength; i < targetPathParts.length; i++) {
				relativePath += targetPathParts[i] + '/';
			}

			if (relativePath.endsWith('/')) {
				relativePath = relativePath.slice(0, -1);
			}
		}

		return relativePath;
	}

	async destroy() {
		this.editor.off('change', this.handleCodeChange);
	}
}

if (window.acode) {
	const acodePlugin = new AcodePluginRN();

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
