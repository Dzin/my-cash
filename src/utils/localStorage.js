export function adicionarItem(key, value) {
    localStorage.setItem(key, value);
}

export function pegarItem(key) {
    return localStorage.getItem(key);
}

export function removerItem(key) {
    localStorage.removeItem(key);
}

export function limparLocalStorage() {
    localStorage.clear();
}