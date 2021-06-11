export default function isLogged() {
  return !!localStorage.getItem('tkn');
}
