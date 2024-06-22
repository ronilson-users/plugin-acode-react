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

  // Insert the custom snippet completer into the editor
  insertSnippets() {
    this.editor.completers = [this];
  }

  // Get the last word at the cursor position in the editor
  getLastWord(editor) {
    const cursor = editor.getCursorPosition();
    const line = editor.session.getLine(cursor.row);
    return line.substr(0, cursor.column).split(/\s+/).pop();
  }

  // Fetch root file paths and store them in directoryPaths
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

      console.log('Directory Paths:', this.directoryPaths); // Log for debugging
    } catch (error) {
      console.error('Error archiving paths:', error);
    }
  }
  
  
 // Get completion suggestions for the editor based on the prefix
  getCompletions(editor, session, pos, prefix, callback) {
    const { activeFile } = editorManager;
    const fileExtension = activeFile.filename.split('.').pop();

    // Only provide suggestions if the file extension is suitable for React Native
    const validExtensions = ['tsx', 'ts', 'js', 'jsx'];
    if (!validExtensions.includes(fileExtension)) {
      return callback(null, []);
    }

    const cursor = editor.getCursorPosition();
    const line = session.getLine(cursor.row);
    const lastWord = this.getLastWord(editor);
    const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));

    if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {
      const fileName = activeFile.filename.split('/').pop().split('.').slice(0, -1).join('.'); // Get file name without extension

      const suggestions = matchedSnippets.map(snippet => ({
        caption: snippet.prefix,
        snippet: snippet.snippet.replace(/FILE_NAME/g, fileName), 
        meta: snippet.type,
        value: snippet.snippet.replace(/FILE_NAME/g, fileName), 
        type: 'snippet',
        score : 600,
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
  
  

  // Initialize the plugin, set up editor listeners and fetch file paths
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
    
    await this.getRootFilesPaths(); // Call method to archive paths
  }

  // Handle code change events in the editor
  async handleCodeChange(e) {
    const session = this.editor.session;
    const cp = this.editor.getCursorPosition();
    const mainRow = session.getValue().split('\n')[cp.row];
    const openCol = this.findTagOpening(mainRow, cp.column);

    if (openCol !== -1) {
      const tagName = this.extractTag(mainRow, openCol);
      console.log('Tag Name:', tagName); // Log for debugging
      await this.getRootFilesPaths(); // Ensure paths are updated before continuing
      const componentCache = await this.findTagNamePaths(tagName);

      if (componentCache && componentCache.directoryForTagName) {
        await this.importIntellisense(tagName, componentCache);
      }
    }
  }

  // Find the opening tag in a line of code
  findTagOpening(row, column) {
    for (let n = column; n >= 0; n--) {
      if (row[n] === '<') {
        return n;
      }
    }
    return -1;
  }

  // Extract the tag name from a line of code starting at the open tag position
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

  // Find paths associated with the tag name
  async findTagNamePaths(tagName) {
    try {
      const { activeFile } = editorManager;
      const currentFileName = activeFile.filename || '';
      
      console.log('currentFileName', currentFileName);
      
      const active = activeFile.uri || '';
       
      console.log('active', active); // Log for debugging

      const extensions = ['.tsx', '.ts', '.js'];
      let targetPath;

      for (const ext of extensions) {
        targetPath = this.directoryPaths[tagName + ext];
        if (targetPath) break;
      }

      console.log('targetPath', targetPath); // Log for debugging

      const currentFilePath = this.directoryPaths[currentFileName];
      console.log('currentFilePath', currentFilePath); // Log for debugging

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
      console.error('Error finding cache path for tagName:', error);
      return {
        directoryForTagName: null,
        directoryForCurrentFile: null,
      };
    }
  }

  // Import intellisense for the identified component
  async importIntellisense(tagName, directory) {
    try {
      console.log('Directory:', directory); // Log for debugging

      const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);
      console.log('Relative Path:', relativePath); // Log for debugging

      const fileExists = await this.checkIfFileExists(directory.directoryForTagName);
      console.log('File Exists:', fileExists); // Log for debugging

      if (!fileExists) {
        window.toast('Component file not found', 4000);
        return;
      }

      // Extract the component name from the directory path without extension
      const componentNameWithExtension = directory.directoryForTagName.split('/').pop();
      const componentName = componentNameWithExtension.split('.').slice(0, -1).join('.');

      // Remove the extension from the relative path
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
      console.error('Error in importIntellisense:', error);
      window.toast('Component not found', 4000);
    }
  }

  // Check if a file exists in the directory paths
  async checkIfFileExists(path) {
    try {
      const fileList = acode.require('fileList');
      const list = await fileList();
      const fileExists = list.some(item => item.path === path);
      return fileExists;
    } catch (error) {
      console.error('Error checking if file exists:', error);
      return false;
    }
  }

  // Close the current tag in the editor
  closeTag() {
    const cp = this.editor.getCursorPosition();
    this.editor.session.insert(cp, ' />\n'); 
  }
  
  
  

  // Find the insertion position for the import statement
  findInsertionPosition() {
    return { row: 0, column: 0 };
  }

  // Calculate the relative path from the current directory to the target directory
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

  // Remove the change event listener from the editor
  async destroy() {
    this.editor.off('change', this.handleCodeChange);
  }
}

if (window.acode) {
  const acodePlugin = new AcodePluginRN();

  // Initialize the plugin with Acode's plugin system
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });

  // Unmount the plugin, cleaning up any resources
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}