import plugin from '../plugin.json';
import { snippets } from './snippets.js';

const editor = editorManager.editor;
const { snippetManager } = ace.require('ace/snippets');

class AcodePluginRN {
constructor() {
this.editor = editor;
this.snippetManager = snippetManager;
this.directoryPaths = {};
this.insertSnippets();
}

insertSnippets() {
this.editor.completers = [this];
}

getLastWord(editor) {
const cursor = editor.getCursorPosition();
const line = editor.session.getLine(cursor.row);
return line.substr(0, cursor.column).split(/\s+/).pop();
}

async getRootFilesPaths() {
try {
const fileList = acode.require('fileList');
const list = await fileList();

for (const item of list) {
this.directoryPaths[item.name] = {
url: item.url,
path: item.path,
};
}

console.log('Directory Paths:', this.directoryPaths); // Log para depuração
} catch (error) {
console.error('Erro ao arquivar caminhos:', error);
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
// body: snippet.body,
snippet: snippet.snippet,
meta: snippet.type,
value: snippet.snippet,
// score: snippet.score !== undefined ? snippet.score: 600,
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
await this.getRootFilesPaths(); // Chame o método para arquivar os caminhos
}

async handleCodeChange(e) {
const session = this.editor.session;
const cp = this.editor.getCursorPosition();
const mainRow = session.getValue().split('\n')[cp.row];
const openCol = this.findTagOpening(mainRow, cp.column);

if (openCol !== -1) {
const tagName = this.extractTag(mainRow, openCol);
console.log('Tag Name:', tagName); // Log para depuração
await this.getRootFilesPaths(); // Certifique-se de que os caminhos estão atualizados antes de continuar
const componentCache = await this.findTagNamePaths(tagName);

if (componentCache && componentCache.directoryForTagName) {
await this.importIntellisense(tagName, componentCache);
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

async findTagNamePaths(tagName) {
  try {
    const { activeFile } = editorManager;
    const currentFileName = activeFile.filename || '';
    const dir = activeFile.uri || '';

    console.log('dir', dir); // Log para depuração

    const extensions = ['.tsx', '.ts', '.js'];
    let targetPath;

    for (const ext of extensions) {
      targetPath = this.directoryPaths[tagName + ext];
      if (targetPath) break;
    }

    console.log('targetPath', targetPath); // Log para depuração

    const currentFilePath = this.directoryPaths[currentFileName];
    console.log('currentFilePath', currentFilePath); // Log para depuração

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
    console.log('Directory:', directory); // Log para depuração

    const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);
    console.log('Relative Path:', relativePath); // Log para depuração

    const fileExists = await this.checkIfFileExists(directory.directoryForTagName);
    console.log('File Exists:', fileExists); // Log para depuração

    if (!fileExists) {
      window.toast('Component file not found', 4000);
      return;
    }

    // Extrair o nome do componente do caminho do diretório sem a extensão
    const componentNameWithExtension = directory.directoryForTagName.split('/').pop();
    const componentName = componentNameWithExtension.split('.').slice(0, -1).join('.');

    // Remover a extensão do caminho relativo
    const relativePathWithoutExtension = relativePath.split('.').slice(0, -1).join('.');

    const importStatement = `import ${componentName} from '${relativePathWithoutExtension}';`;

    const code = this.editor.session.getValue();
    const importRegex = new RegExp(`import\\s+${componentName}\\s+from\\s+'${relativePathWithoutExtension}'`);

    if (!importRegex.test(code)) {
      const insertionPosition = this.findInsertionPosition();
      this.editor.session.insert(insertionPosition, `${importStatement}\n`);
      this.closeTag();
      window.toast('The import was created at the top ☝️ successfully', 3000);
      
      
    }
  } catch (error) {
    console.error('Erro no importIntellisense:', error);
    window.toast('Component not found', 4000);
  }
}

async checkIfFileExists(path) {
  try {
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
  this.editor.session.insert(cp, ' />\n'); 
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