export function setObj (key, obj) {
  return localStorage.setItem(key, JSON.stringify(obj))
}
export function getObj (key) {
  return JSON.parse(localStorage.getItem(key))
}