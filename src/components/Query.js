let query = (uri, config = {}) => {
    let token = localStorage.getItem('token');
    if (
        config.headers === undefined ||
        !config.headers instanceof Headers
    ) {
        config.headers = new Headers();
    }

    config.headers.append('token', token);

    return fetch(uri, config)
}

/**
 * Returns object {token,role} on success, false otherwise
 *
 * @param login
 * @param password
 * @returns {Promise<{message: string}|{role, token: (boolean|*)}>}
 */
export async function auth(login, password) {
    let url = "http://localhost:90/auth";

    let searchParams = new URLSearchParams();
    searchParams.append("login", login);
    searchParams.append("pass", password);
    let response = await fetch(url + "?" + searchParams.toString())
    if (response.ok) {
        let data = await response.json()
        if (data.role === "ROLE_ADMIN") {
            localStorage.setItem('token',data.token)
            localStorage.setItem('role',data.role)
            return {
                success:true
            }
        } else {
            return {
                success:false,
                message: 'У вас нет доступа к запрашиваемой странице'
            }
        }
    } else {
        return {
            success:false,
            message: "Неправильный пользователь или пароль"
        }
    }
}

export default query;

