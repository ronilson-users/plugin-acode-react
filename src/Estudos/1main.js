
import plugin from '../plugin.json';
import LRUCache from './cache.js';
import { snippets } from './snippets.js';


const toast = acode.require("toast");
const editor = editorManager.editor;
const { activeFile } = editorManager;
const { snippetManager } = ace.require('ace/snippets');

class AcodePluginRN {
constructor() {

this.directoryCache = new LRUCache();
this.editor = editor;
this.snippetManager = snippetManager;
this.initializeSnippetInsertion();
this.archivePathsInCache();

}

initializeSnippetInsertion() {
this.editor.completers = [this];
}

getLastWord(editor) {
const cursor = editor.getCursorPosition();

const line = editor.session.getLine(cursor.row);

return line.substr(0, cursor.column).split(/\s+/).pop();

}

async archivePathsInCache() {
const fileList = acode.require('fileList');

const list = await fileList();

list.forEach(item => {
this.directoryCache.set(item.name, {
url: item.url,
path: item.path,
});


});
}

getCompletions(editor, session, pos, prefix, callback) {
const cursor = editor.getCursorPosition();

const line = session.getLine(cursor.row);

const lastWord = this.getLastWord(editor);

const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));

if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {

const suggestions = matchedSnippets.map(snippet => {

const contentSnippets = {
caption: snippet.prefix,
snippet: snippet.snippet,
meta: snippet.type,
value: snippet.snippet,
score: 600 || 0,
type: 'snippet',
docHTML: snippet.description || '',
};

if (typeof extraSyntaxHighlightsInstalled !== 'undefined' && extraSyntaxHighlightsInstalled) {
return {
...contentSnippets,
icon: 'icon react-snippet-icon',
};

} else {
return contentSnippets;
}
});

return callback(null, suggestions);
} else {
return callback(null, []);
}
}

async init() {

// Adiciona o estilo para ace_tooltip
const tipsbox = document.createElement('style');

tipsbox.id = 'helpDescription';
tipsbox.innerHTML = `
.ace_tooltip.ace_doc-tooltip {
display: flex !important;
background-color: var(--secondary-color);
color: var(--secondary-text-color);
max-width: 78%;
white-space: pre-wrap;
}
`;
document.head.append(tipsbox);



this.editor.on('change', this.handleCodeChange.bind(this)); // Adiciona um ouvinte de alteração no código
}

async handleCodeChange(e) {
// console.log('event' , e);


// Lógica para capturar a abertura da tag `<` e observar o que vem depois
const session = this.editor.session;
const cp = this.editor.getCursorPosition();

const mainRow = session.getValue().split('\n')[cp.row];

const openCol = this.findTagOpening(mainRow, cp.column);

if (openCol !== -1) {
const tagName = this.extractTag(mainRow, openCol);

const contentAfterOpeningTag = mainRow.substring(openCol + 1);

//Faz a busca do componente no diretorio para realizar a construção do importIntellisense
const componentCache = await this.findTagNameCachePath(tagName);

// Verifica se o componente foi encontrado no cache antes de chamar criar ImportIntellisense
if (componentCache && componentCache.directoryForTagName) {
this.importIntellisense(tagName, componentCache);
}
}

}
/**

* @param {string} row - A linha de texto onde a busca é realizada.
* @param {number} column - A posição na linha onde a busca começa.
* @returns {number} A posição da abertura da tag, ou -1 se não for encontrada.
*/

findTagOpening(row, column) {
// Lógica para encontrar a abertura da tag começando da posição atual e indo para trás
for (let n = column; n >= 0; n--) {
if (row[n] === '<') {
return n; // Retorna a posição da abertura da tag
}
}
return -1; // Retorna -1 se não encontrar a abertura da tag
}

extractTag(row, openCol) {
let tagName = '';
let closeTag = false;

for (let i = openCol + 1; i < row.length; i++) {
if (row[i] === ' ' || row[i] === '>') {
if (closeTag) {
tagName += '>';
console.log('tag fechada')

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
console.log(dir);



const cachedItem = await this.directoryCache.get(tagName);
const currentItem = await this.directoryCache.get(currentFileName);

if (cachedItem) {
return {
directoryForTagName: cachedItem.path,
directoryForCurrentFile: currentItem ? currentItem.path: null
};
} else {
// Se o item não estiver em cache, retorne nulo para ambos os diretórios
return {
directoryForTagName: null,
directoryForCurrentFile: null
};
}
} catch (error) {
console.error('Erro ao encontrar o caminho do cache para o tagName:', error);
// Em caso de erro, retorne nulo para ambos os diretórios
return {
directoryForTagName: null,
directoryForCurrentFile: null
};
}
}

importIntellisense(tagName, directory) {
try {

// Calcular o caminho relativo
const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);



console.log('directoryForCurrentFile', directory.directoryForCurrentFile);

console.log('directoryForTagName', directory.directoryForTagName);

console.log('relativePath', relativePath);


// Extrair extensão do arquivo
const extensionIndex = tagName.lastIndexOf('.');

const extension = tagName.substring(extensionIndex);



// Remover extensão do tagName
const tagNameWithoutExtension = tagName.substring(0, extensionIndex);

// Criar declaração de importação sem a extensão
const importStatement = `import ${tagNameWithoutExtension} from '${relativePath}';`;

const code = this.editor.session.getValue();

const importRegex = new RegExp(`import\\s+${tagNameWithoutExtension}\\s+from\\s+'${relativePath}'`);

if (!importRegex.test(code)) {
const insertionPosition = this.findInsertionPosition();

this.editor.session.insert(insertionPosition, `${importStatement}\n`);

this.closeTag();

window.toast("The import was created at the top ☝️ ", 3000)

}

} catch (error) {
console.error('Erro no importIntellisense:', error);
window.toast("Component not found", 4000)
// se o arquivo nao exitir cria ele 



this.archivePathsInCache();
}
}

closeTag(editor) {

// Obter a posição do cursor atual
const cp = this.editor.getCursorPosition();


// Inserir o fechamento da tag na mesma linha do cursor
this.editor.session.insert(cp, `/>\n`);
}

findInsertionPosition() {
return {
row: 0,
column: 0,
};
}



// Resolve o caminho relativo com base em um caminho de referência dado
calculateRelativePath(currentDirectory, targetDirectory) {
// Divide as strings em arrays usando o separador '/'
const currentPathParts = currentDirectory.split('/');
const targetPathParts = targetDirectory.split('/');

// Encontra o comprimento do caminho comum
let commonPathLength = 0;
while (commonPathLength < currentPathParts.length && commonPathLength < targetPathParts.length && currentPathParts[commonPathLength] === targetPathParts[commonPathLength]) {
commonPathLength++;
}

// Inicializa a string que conterá o caminho relativo
let relativePath = '';

// Se os diretórios estiverem no mesmo nível
if (commonPathLength === currentPathParts.length - 1 && commonPathLength === targetPathParts.length - 1) {
// Constrói um caminho relativo simples ('./' + nome do arquivo)
relativePath = './' + targetPathParts[targetPathParts.length - 1];
} else {
// Adiciona '../' para cada diretório restante no diretório atual
for (let i = commonPathLength; i < currentPathParts.length - 1; i++) {
relativePath += '../';
}

// Adiciona os diretórios restantes no diretório de destino
// Verifica se relativePath já possui algum prefixo ('./' ou '../')
if (!relativePath.startsWith('./') && !relativePath.startsWith('../')) {
// Se não tiver nenhum prefixo, adiciona './'
relativePath = './' + relativePath;
}

// Adiciona os diretórios restantes no diretório de destino
for (let i = commonPathLength; i < targetPathParts.length; i++) {
relativePath += targetPathParts[i] + '/';
}

// Remove a barra final se existir
if (relativePath.endsWith('/')) {
relativePath = relativePath.slice(0, -1);
}
}

// Retorna o caminho relativo calculado
return relativePath;
}

async destroy() {
// Adicione sua lógica de limpeza aqui, se necessário
this.editor.off('change', this.handleCodeChange); // Remova o ouvinte de alteração no código
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