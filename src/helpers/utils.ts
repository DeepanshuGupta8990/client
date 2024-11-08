
export const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('google');
    // navigate("/");
    window.location.href = '/';
}