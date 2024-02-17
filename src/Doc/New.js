




import plugin from '../plugin.json';
import LRUCache from './cache.js'; // Importing LRUCache class from cache.js
import { snippets } from './snippets.js'; // Importing snippets array from snippets.js

const editor = editorManager.editor; // Getting editor instance
const { activeFile } = editorManager; // Getting activeFile from editorManager
const { snippetManager } = ace.require('ace/snippets'); // Getting snippetManager from Ace editor

// AcodePluginAutoImport class definition
class AcodePluginAutoImport {
 constructor() {
  this.directoryCache = new LRUCache(); // Initializing LRUCache instance for directory caching
  this.editor = editor; // Setting editor reference
  this.snippetManager = snippetManager; // Setting snippetManager reference
  this.initializeSnippetInsertion(); // Initializing snippet insertion
  this.archivePathsInCache(); // Archiving paths in cache on initialization
 }

 initializeSnippetInsertion() {
  this.editor.completers = [this]; // Setting this class instance as the completer for the editor
 }

 // Function to get the last word in the editor
 getLastWord(editor) {
  const cursor = editor.getCursorPosition(); // Getting cursor position
  const line = editor.session.getLine(cursor.row); // Getting current line
  return line.substr(0, cursor.column).split(/\s+/).pop(); // Extracting last word
 }

 // Asynchronously archive paths in cache
 async archivePathsInCache() {
  const fileList = acode.require('fileList'); // Getting fileList function from acode
  const list = await fileList(); // Getting file list asynchronously

  // Iterating through the file list and caching paths
  list.forEach(item => {
   this.directoryCache.set(item.name, {
    url: item.url,
    path: item.path,
   });

   console.log('item', item.path); // Logging cached path
  });
 }

 // Function to provide completions for the editor
 getCompletions(editor, session, pos, prefix, callback) {
  const cursor = editor.getCursorPosition(); // Getting cursor position
  const line = session.getLine(cursor.row); // Getting current line
  const lastWord = this.getLastWord(editor); // Getting last word in the line

  // Filtering snippets based on last word
  const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));

  // Handling matched snippets
  if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {
   const suggestions = matchedSnippets.map(snippet => {
    // Structure for snippet suggestions
    const structureSnippets = {
     caption: snippet.prefix,
     snippet: snippet.snippet,
     meta: snippet.type,
     value: snippet.snippet,
     score: 600 || 0,
     type: 'snippet',
     docHTML: snippet.description || '',
    };

    // Adding extra syntax highlight icon if installed
    if (typeof extraSyntaxHighlightsInstalled !== 'undefined' && extraSyntaxHighlightsInstalled) {
     return {
      ...structureSnippets,
      icon: 'icon react-snippet-icon',
     };
    } else {
     return structureSnippets;
    }
   });

   return callback(null, suggestions); // Returning suggestions to callback
  } else {
   return callback(null, []); // Returning empty array if no matches found
  }
 }

 // Function to initialize the plugin
 async init() {
  // Adding style for ace_tooltip
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

  // Adding event listener for code changes
  this.editor.on('change', this.handleCodeChange.bind(this));
 }

 // Function to handle code changes
 async handleCodeChange(e) {
  const session = this.editor.session; // Getting editor session
  const cp = this.editor.getCursorPosition(); // Getting cursor position

  const mainRow = session.getValue().split('\n')[cp.row]; // Getting current row content

  const openCol = this.findTagOpening(mainRow, cp.column); // Finding opening tag column

  if (openCol !== -1) {
   const tagName = this.extractTag(mainRow, openCol); // Extracting tag name
   const contentAfterOpeningTag = mainRow.substring(openCol + 1); // Getting content after opening tag

   // Finding cache path for tag name and importing if found
   const componentCache = await this.findTagNameCachePath(tagName);
   if (componentCache && componentCache.directoryForTagName) {
    this.importIntellisense(tagName, componentCache);
   }
  }
 }

 // Function to find opening tag in a row
 findTagOpening(row, column) {
  for (let n = column; n >= 0; n--) {
   if (row[n] === '<') {
    return n;
   }
  }
  return -1; // Return -1 if opening tag not found
 }

 // Function to extract tag from a row
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

 // Function to find cache path for tag name
 async findTagNameCachePath(tagName) {
  const { activeFile } = editorManager;
  const currentFileName = activeFile.filename || '';

  const cachedItem = await this.directoryCache.get(tagName); // Getting cached item for tag name

  if (cachedItem) {
   // console.log(`Diretório do arquivo cache ${cachedItem.path}`);
  } else {
   console.log(`Arquivo "${tagName}" não encontrado no cache.`);
  }

  const currentItem = this.directoryCache.get(currentFileName); // Getting cached item for current file

  if (currentItem) {
   // console.log(`Diretório do arquivo atual "${currentFileName}": ${currentItem.path}`);
  } else {
   console.log(`Arquivo atual "${currentFileName}" não encontrado no cache.`);
  }

  // Returning directories for tag name and current file
  return {
   directoryForTagName: cachedItem ? cachedItem.path : null,
   directoryForCurrentFile: currentItem ? currentItem.path : null,
  };
 }

 // Function to import tag intelligently
 async importIntellisense(tagName, directory) {
  try {
   const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName); // Calculating relative path

   // Extracting extension of the file
   const extensionIndex = tagName.lastIndexOf('.');
   const extension = tagName.substring(extensionIndex);

   // Removing extension from tag name
   const tagNameWithoutExtension = tagName.substring(0, extensionIndex);

   // Creating import statement without extension
   const importStatement = `import ${tagNameWithoutExtension} from '${relativePath}';`;

   const code = this.editor.session.getValue(); // Getting the current code
   const importRegex = new RegExp(`import\\s+${tagNameWithoutExtension}\\s+from\\s+'${relativePath}'`);

   // Checking if import statement already exists
   if (!importRegex.test(code)) {
    const insertionPosition = this.findInsertionPosition(); // Finding insertion position
    this.editor.session.insert(insertionPosition, `${importStatement}\n`); // Inserting import statement
    this.closeTag(); // Closing tag automatically
    window.toast("The import was created at the top ☝️ ", 2000); // Showing success message
   }
  } catch (error) {
   console.error('Erro no importIntellisense:', error);
   window.toast("Component not found", 4000); // Showing error message if component not found
  }
 }

 // Function to close tag
 closeTag(editor) {
  const cp = this.editor.getCursorPosition(); // Getting cursor position
  this.editor.session.insert(cp, `/>\n`); // Inserting closing tag
 }

 // Function to find insertion position
 findInsertionPosition() {
  return {
   row: 0,
   column: 0,
  };
 }

 // Function to calculate relative path between directories
 calculateRelativePath(currentDirectory, targetDirectory) {
  const currentPathParts = currentDirectory.split('/'); // Splitting current directory into parts
  const targetPathParts = targetDirectory.split('/'); // Splitting target directory into parts
  let relativePath = '';

  // Finding the index of the first different directory
  let i = 0;
  while (i < currentPathParts.length && i < targetPathParts.length && currentPathParts[i] === targetPathParts[i]) {
   i++;
  }

  // Adding '../' for each remaining directory in the current directory
  for (let j = i; j < currentPathParts.length; j++) {
   relativePath += './';
  }

  // Adding the remaining directories in the target directory
  for (let k = i; k < targetPathParts.length; k++) {
   relativePath += targetPathParts[k] + '/';
  }

  // Removing the last '/' if it exists
  if (relativePath.endsWith('/')) {
   relativePath = relativePath.slice(0, -1);
  }

  return relativePath;
 }

 // Function to clean up
 async destroy() {
  this.editor.off('change', this.handleCodeChange); // Removing event listener for code changes
 }
}

// Initializing the plugin if acode is available
if (window.acode) {
 const acodePlugin = new AcodePluginAutoImport(); // Creating instance of AcodePluginAutoImport

 // Setting plugin initialization and unmounting methods
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