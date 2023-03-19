/**
 * 将token信息存储到localStorage中
 * 
 */

function getStorage(key) {
  return localStorage.getItem(key);
};

function setStorage(key, value) {
  localStorage.setItem(key, value);
};

function removeStorage(key) {
  localStorage.removeItem(key);
};

function clear() {
  localStorage.clear();
};


export default {
  getStorage,
  setStorage,
  removeStorage,
  clear
}