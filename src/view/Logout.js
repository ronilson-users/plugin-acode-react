import plugin from '../plugin.json';

const editor = editorManager.editor;

class AcodePluginRN {
  constructor() {
    this.editor = editor;
    this.directoryPaths = {}; // ok
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
      console.log('Directory Paths:', this.directoryPaths);
    } catch (error) {
      console.error('Error fetching root file paths:', error);
    }
  } // ok

  async init() {
    this.editor.on('change', this.handleCodeChange.bind(this));
    await this.getRootFilesPaths();
  }

  async handleCodeChange(e) {
    const session = this.editor.session;
    const cp = this.editor.getCursorPosition();
    
    const mainRow = session.getValue().split('\n')[cp.row];
    
    const openCol = this.findTagOpening(mainRow, cp.column);

    if (openCol !== -1) {
      const tagName = this.extractTag(mainRow, openCol);
      
      console.log('Tag Name:', tagName);
      
      await this.getRootFilesPaths();
      
      const componentSearch = await this.componentLocation(tagName);

      if (componentSearch && componentSearch.directoryForTagName) {
        await this.setupImportReactComponent(tagName, componentSearch);
      }
    }
  }
  
  // Setup Snippets from React Native
  async setupImportReactComponent(tagName, directory) {
    try {
     
      console.log('Directory:', directory);

      const relativePath = this.calculateRelativePath(directory.directoryForCurrentFile, directory.directoryForTagName);
      console.log('Relative Path:', relativePath);

      const fileExists = await this.checkIfFileExists(directory.directoryForTagName);
      
      console.log('File Exists:', fileExists);

      if (!fileExists) {
        window.toast('Component file not found', 4000);
        return;
      }

      const componentNameWithExtension = directory.directoryForTagName.split('/').pop();
      
      const componentName = componentNameWithExtension.split('.').slice(0, -1).join('.');

      const relativePathWithoutExtension = relativePath.split('.').slice(0, -1).join('.');

      const importStatement = `import ${componentName} from '${relativePathWithoutExtension}';`;

      const code = this.editor.session.getValue();
      
      const importRegex = new RegExp(`import\\s+${componentName}\\s+from\\s+'${relativePathWithoutExtension}'`);

      if (!importRegex.test(code)) {
        const insertionPosition = this.InsertionLocation();
        
        this.editor.session.insert(insertionPosition, `${importStatement}\n`);
        
        this.closeTag();
        window.toast('The import was created at the top ☝️ successfully', 3000);
      }
    } catch (error) {
      console.error('Error in setupImportReactComponent:', error);
      window.toast('Component not found', 4000);
    }
  }
  
  // component location in root directory
  async componentLocation(tagName) {
    try {
      const { activeFile } = editorManager;
     
       // Current File Name
      const currentFileName = activeFile.filename || '';
 
 
      const extensions = ['.tsx', '.ts', '.js'];
      let targetPath;


      for (const ext of extensions) {
        targetPath = this.directoryPaths[tagName + ext];
        if (targetPath) break;
      }

      console.log('targetPath:', targetPath);

      const currentFilePath = this.directoryPaths[currentFileName];
      console.log('currentFilePath:', currentFilePath);

      return {
        directoryForTagName: targetPath ? targetPath.path : null,
        directoryForCurrentFile: currentFilePath ? currentFilePath.path : null,
      };
    } catch (error) {
      console.error('Error finding cache path for tagName:', error);
      return {
        directoryForTagName: null,
        directoryForCurrentFile: null,
      };
    }
  }

// check if the file exists
  async checkIfFileExists(path) {
    try {
      const fileList = acode.require('fileList');
      const list = await fileList();
      return list.some(item => item.path === path);
    } catch (error) {
      console.error('Error checking if file exists:', error);
      return false;
    }
  }

// handle tag opening ,find tag opening
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

  closeTag() {
    const cp = this.editor.getCursorPosition();
    this.editor.session.insert(cp, ' />\n');
  }
  
  
  // find the insertion position
  InsertionLocation() {
    return { row: 0, column: 0 };
  }

  calculateRelativePath(currentDirectory, targetDirectory) {
    const currentPathParts = currentDirectory.split('/');
    const targetPathParts = targetDirectory.split('/');
    let commonPathLength = 0;

    while (commonPathLength < currentPathParts.length &&
           commonPathLength < targetPathParts.length &&
           currentPathParts[commonPathLength] === targetPathParts[commonPathLength]) {
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