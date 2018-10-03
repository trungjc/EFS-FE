export function saveItem(key:string, value:any) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getItem(key:string) {
    return JSON.parse(localStorage.getItem(key))
}
export function removeSession() {
    localStorage.clear()
}
export function setSession(key:string, value:any) {
    sessionStorage.setItem(key, JSON.stringify(value))
}
export function getSession(key:string) {
    return JSON.parse(sessionStorage.getItem(key))
}
export function clearSession(key: string) {
    sessionStorage.removeItem(key)
}

//add branch to storage
export function filterArea(value){
    saveItem('filter-area',value)
}
export function getFilterArea(){
    return getItem('filter-area')
}
export function filterBranches(value){
    saveItem('filter-branch',value)
}
export function getFilterBranches(){
    return getItem('filter-branch')
}
export function filterStores(value){
    saveItem('filter-store',value)
}
export function getFilterStores(){
    return getItem('filter-store')
}