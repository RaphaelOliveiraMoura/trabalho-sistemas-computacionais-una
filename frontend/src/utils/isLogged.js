
export default function isLogged() {
    if (!!localStorage.getItem('tkn')) {
        return true
    }
    return false
}