import plugin from '../plugin.json';
import { snippets } from './snippets.js';

const editor = editorManager.editor;
const { snippetManager } = ace.require('ace/snippets');

/**
*  Plugin React Native
*  Snippets para React Native
*  ImportIntellisense de Componentes
*/

class AcodePlugin {
constructor() {
console.log('AcodePlugin constructor');
this.editor = editor;
this.snippetManager = snippetManager;
this.directoryPaths = {};
}

async init(baseUrl, $page, cacheFileUrl, cacheFile) {
console.log('AcodePlugin init');
console.log('baseUrl:', baseUrl);
console.log('page:', $page);
console.log('cacheFileUrl:', cacheFileUrl);
console.log('cacheFile:', cacheFile);

const style = document.createElement('style');
style.id = 'helpDescription';
style.innerHTML = `
.ace_tooltip.ace_doc-tooltip {
display: flex !important;
gap :3 ;
background-color: var(--secondary-color);
color: #acacb7;
max-width: 98%;
white-space: pre; font-style: inherit; font-variant: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-size-adjust: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; overflow: visible;

}
`;
document.head.append(style);

this.editor.on('change', this.handleCodeChange.bind(this));

await this.getRootFilesPaths();

this.insertSnippets();
this.setupIntellisense();
}

async destroy() {
console.log('AcodePlugin destroy');
// Clean up if necessary
}

async getRootFilesPaths() {
console.log('getRootFilesPaths');
// Implementação específica para obter os caminhos dos arquivos raiz
// Talvez uma chamada para uma API ou leitura de diretórios
}

// Insere o completador de snippets personalizados no editor
insertSnippets() {
console.log('insertSnippets');

// Registrar snippets para JavaScript
this.snippetManager.register(snippets, 'javascript');

// Registrar snippets para JSX (React)
this.snippetManager.register(snippets, 'jsx');

// Registrar snippets para TypeScript
this.snippetManager.register(snippets, 'typescript');

// Registrar snippets para TSX (React + TypeScript)
this.snippetManager.register(snippets, 'typescriptjsx');
}

setupIntellisense() {
console.log('setupIntellisense');
// Adiciona o completador de snippets personalizados ao editor
this.editor.completers.push(this);
}

handleCodeChange(delta) {
console.log('handleCodeChange');
console.log('delta:', delta);
// Implementação para tratar mudanças no editor
}

// Obtém sugestões de autocompletar para o editor com base no prefixo
getCompletions(editor, session, pos, prefix, callback) {
console.log('getCompletions called');

const { activeFile } = editorManager;

console.log('activeFile:', activeFile);

const fileExtension = activeFile.filename.split('.').pop();

console.log('fileExtension:', fileExtension);

// Somente fornece sugestões se a extensão do arquivo for adequada para React Native
const validExtensions = ['tsx', 'ts', 'js', 'jsx'];

if (!validExtensions.includes(fileExtension)) {
console.log('Invalid file extension. No suggestions provided.');

return callback(null, []);
}

const cursor = editor.getCursorPosition();
console.log('cursor:', cursor);
const line = session.getLine(cursor.row);
console.log('line:', line);
const lastWord = this.getLastWord(editor);
console.log('lastWord:', lastWord);
const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));
console.log('matchedSnippets:', matchedSnippets);

if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {
const fileName = activeFile.filename.split('/').pop().split('.').slice(0, -1).join('.'); // Obtém o nome do arquivo sem extensão
console.log('fileName:', fileName);

const suggestions = matchedSnippets.map(snippet => ({
caption: snippet.prefix,
snippet: snippet.snippet.replace(/FILE_NAME/g, fileName),
meta: snippet.type,
value: snippet.snippet.replace(/FILE_NAME/g, fileName),
type: 'snippet',
score: 600,
docHTML: snippet.description || '',
}));

console.log('suggestions:', suggestions);

if (typeof extraSyntaxHighlightsInstalled !== 'undefined' && extraSyntaxHighlightsInstalled) {
suggestions.forEach(suggestion => (suggestion.icon = 'icon ace_completion-icon ace_class'));
}

return callback(null, suggestions);
} else {
console.log('No matching snippets found.');
return callback(null, []);
}
}

// Obtém a última palavra na posição do cursor no editor
getLastWord(editor) {
console.log('getLastWord');
const cursor = editor.getCursorPosition();
console.log('cursor:', cursor);
const line = editor.session.getLine(cursor.row);
console.log('line:', line);
const words = line.substr(0, cursor.column).trim().split(/\s+/);
console.log('words:', words);
return words.length ? words[words.length - 1]: '';
}
}

if (window.acode) {
console.log('Initializing AcodePlugin');
const acodePlugin = new AcodePlugin();
acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
console.log('Plugin init callback');
if (!baseUrl.endsWith('/')) {
baseUrl += '/';
}
await acodePlugin.init(baseUrl, $page, cacheFileUrl, cacheFile);
});
acode.setPluginUnmount(plugin.id, () => {
console.log('Plugin unmount callback');
acodePlugin.destroy();
});
}