
 


import plugin from '../plugin.json';
import LRUCache from './cache.js';
import { snippets } from './snippets.js';



// const fs = acode.require("fs");
// const toast = acode.require("toast");
// const confirm = acode.require("confirm");


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

   console.log('item', item.path);

  });
 }

 getCompletions(editor, session, pos, prefix, callback) {
  const cursor = editor.getCursorPosition();

  const line = session.getLine(cursor.row);

  const lastWord = this.getLastWord(editor);

  const matchedSnippets = snippets.filter(snippet => snippet.prefix.startsWith(lastWord));

  if (matchedSnippets.length > 0 && matchedSnippets[0].prefix !== lastWord) {

   const suggestions = matchedSnippets.map(snippet => {

    const structureSnippets = {
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
      ...structureSnippets,
      icon: 'icon react-snippet-icon',
     };

    } else {
     return structureSnippets;
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



  this.editor.on('change', this.handleCodeChange.bind(this)); // Adicione um ouvinte de alteração no código
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
  const { activeFile } = editorManager;
  const currentFileName = activeFile.filename || '';

  // Busca no cache para o tagName
  const cachedItem = await this.directoryCache.get(tagName);

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
   directoryForTagName: cachedItem ? cachedItem.path : null,

   directoryForCurrentFile: currentItem ? currentItem.path : null,
  };
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

    window.toast("The import was created at the top ☝️ ", 2000)

   }

  } catch (error) {
   console.error('Erro no importIntellisense:', error);
   window.toast("Component not found", 4000)

  }
 }

 closeTag(editor) {

  // Obter a posição do cursor atual
  const cp = this.editor.getCursorPosition();


  // Inserir o fechamento da tag na mesma linha do cursor
  this.editor.session.insert(cp, `/>\n`);
 }

 findInsertionPosition() {
  // Encontra a posição de inserção, por exemplo, no topo do arquivo
  return {
   row: 0,
   column: 0,
  };
 }


 // Function to calculate relative path between directories
   calculateRelativePath(currentDirectory, targetDirectory) {
    // Divida as strings em arrays usando o separador '/'
    const currentPathParts = currentDirectory.split('/');
    const targetPathParts = targetDirectory.split('/');
  
    console.log('currentPathParts:', currentPathParts);
    console.log('targetPathParts:', targetPathParts);
  
    // Encontra o comprimento do caminho comum
    let commonPathLength = 0;
    while (currentPathParts[commonPathLength] === targetPathParts[commonPathLength]) {
      commonPathLength++;
    }
    console.log('commonPathLength:', commonPathLength);
  
    let relativePath = '';
    console.log('relativePath:', relativePath);
  
    // Se os diretórios tiverem o mesmo caminho até o último diretório comum
    if (commonPathLength === currentPathParts.length && commonPathLength === targetPathParts.length - 1) {
      relativePath = './' + targetPathParts[commonPathLength];
      
      
      console.log('relativePath ./ +:', relativePath);
      
    } else {
     
      if (commonPathLength === currentPathParts.length && !currentPathParts.every((part, index) => part === targetPathParts[index])) {
        relativePath = './' + targetPathParts[commonPathLength];
        
        console.log('relativePath ./ +:', relativePath);
        
      } else {
        // Adiciona '../' para cada diretório restante no diretório atual
        for (let i = commonPathLength; i < currentPathParts.length - 1; i++) {
         
          relativePath += '../';
          
          console.log('relativePath ../ :', relativePath);
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
    }
  
    console.log('relativePath fim:', relativePath);
  
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

