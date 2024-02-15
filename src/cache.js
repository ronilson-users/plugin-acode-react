// src/cache.js
const maxSize = 30;

class LRUCache {
constructor(maxSize) {
this.maxSize = maxSize;
this.cache = new Map();
this.accessOrder = [];
}

/**
* Recupera o valor associado à chave fornecida.
* @param {string} key - A chave a ser usada para recuperar o valor.
* @return {any} O valor associado à chave, ou null se a chave não estiver no cache.
*/
get(key) {
if (this.cache.has(key)) {
this.updateAccessOrder(key);
return this.cache.get(key);
}
return null;
}

/**
* Adiciona um novo par chave-valor no cache.
* @param {string} key - A chave a ser usada para armazenar o valor.
* @param {any} value - O valor a ser armazenado no cache.
*/
set(key, value) {
if (this.cache.size >= this.maxSize) {
const lruKey = this.accessOrder.pop();
this.cache.delete(lruKey);
}
this.cache.set(key, value);
this.updateAccessOrder(key);
}

/**
* Atualiza a ordem de acesso para a chave fornecida.
* @param {string} key - A chave a ser usada para atualizar a ordem de acesso.
*/
updateAccessOrder(key) {
if (this.accessOrder.includes(key)) {
this.accessOrder = this.accessOrder.filter(item => item !== key);
}
this.accessOrder.unshift(key);
}

/**
* Reseta o cache, removendo todos os pares chave-valor e limpando a ordem de acesso.
*/
resetCache() {
this.cache.clear();
this.accessOrder = [];
}

/**
* Retorna o tamanho atual do cache.
* @return {number} O tamanho atual do cache.
*/
size() {
return this.cache.size;
}

/**
* Retorna um array contendo todas as chaves no cache.
* @return {Array<string>} Um array de chaves no cache.
*/
keys() {
return Array.from(this.cache.keys());
}



}

export default LRUCache;