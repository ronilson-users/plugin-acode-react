import Button from './component/Button.js'

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

async handleCodeChange(e) {
// Lógica para capturar a abertura da tag `<` e observar o que vem depois
const session = this.editor.session;
const cp = this.editor.getCursorPosition();

const mainRow = session.getValue().split('\n')[cp.row];

const openCol = this.findTagOpening(mainRow, cp.column);

if (openCol !== -1) {
const tagName = this.extractTag(mainRow, openCol);

const contentAfterOpeningTag = mainRow.substring(openCol + 1);

//Faz busca do componente no diretorio para realizar a construção do importIntellisense
const componentCache = await this.findTagNameCachePath(tagName);

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

if (cachedItem) {
//	console.log(`Diretório do arquivo cache ${cachedItem.path}`);
} else {
console.log(`Arquivo "${tagName}" não encontrado no cache.`);
}

// Busca no cache para o activeFile
const currentItem = this.directoryCache.get(currentFileName);

if (currentItem) {
//console.log(`Diretório do arquivo atual "${currentFileName}": ${currentItem.path}`);
} else {
console.log(`Arquivo atual "${currentFileName}" não encontrado no cache.`);
}

// Retorna ambos os diretórios ou null se não encontrados
return {
directoryForTagName: cachedItem ? cachedItem.path: null,
directoryForCurrentFile: currentItem ? currentItem.path: null,
};
}

getFormattedPath(path) {
if (path && path.startsWith('content://com.termux.documents/tree')) {
path = path.split('::')[1];
let termuxPath = path.replace(
/^\/data\/data\/com\.termux\/files\/home/,
'$HOME',



// depois de $Home como avancar o diretórios ate pasta do projeto,
);

// Divide o caminho em partes usando '
const parts = termuxPath.split('/');
// Remove o último elemento do array, que é o nome do arquivo


parts.pop();
// Junta as partes novamente para formar o caminho do diretório


const directoryPath = parts.join('/');
// Retorna o caminho do diretório

// console.log('termuxPath', termuxPath)
return directoryPath;
}
}



importIntellisense(tagName, directory) {
try {
const currentFilePath = editorManager.activeFile.uri;



const formattedPath = this.getFormattedPath(currentFilePath);


console.log('baseDirectory', formattedPath);



if (!formattedPath || typeof directory !== 'object') {
console.error('Parâmetros inválidos.');
return;
}



const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);

console.log('directoryForTagName:', directory.directoryForTagName);

console.log('directoryForCurrentFile:', directory.directoryForCurrentFile);

console.log('relativePath 2', relativePath);


// const component = tagName()
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




calculateRelativePath(formattedPath, importDirectory) {
const formattedPathParts = formattedPath.split('/');
const importPathParts = importDirectory.split('/');

// Encontra o índice do diretório 'src' em cada caminho
const srcIndexFormatted = formattedPathParts.indexOf('src');
const srcIndexImport = importPathParts.indexOf('src');

// Verifica se ambos os caminhos contêm o diretório 'src'
if (srcIndexFormatted !== -1 && srcIndexImport !== -1) {
// Verifica se o caminho formatado é igual ao caminho de importação até o diretório 'src'
const formattedPathBeforeSrc = formattedPathParts.slice(0, srcIndexFormatted + 1).join('/');
const importPathBeforeSrc = importPathParts.slice(0, srcIndexImport + 1).join('/');

if (formattedPathBeforeSrc === importPathBeforeSrc) {
// Ambos os arquivos estão no mesmo diretório ou em diretórios pai
// Calcule a diferença de níveis entre os diretórios
const levelsDifference = importPathParts.length - formattedPathParts.length;
if (levelsDifference === 0) {
return './'; // Estão no mesmo diretório
} else if (levelsDifference > 0) {
return './../'.repeat(levelsDifference); // O arquivo de importação está em um diretório pai
}
}
}

// Caso contrário, retorne o caminho absoluto
return importDirectory;
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