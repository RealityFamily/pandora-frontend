import axios from 'axios'

const API_URL = 'http://localhost:8082'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export  const  USER_TOKEN_SESSION_ATTRIBUTE_TOKEN = "authenticatedToken";

class AuthenticationService {


    executeJwtAuthenticationService(username, password) {
        console.log(username);
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }


    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        sessionStorage.setItem(USER_TOKEN_SESSION_ATTRIBUTE_TOKEN,'Bearer ' + token);
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_TOKEN_SESSION_ATTRIBUTE_TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = token
                }
                return config
            }
        )
    }

    checkRole(role) {
        if( typeof role === "string"){
            if(role.includes("ROLE_ADMIN")){
                return;
            }
        }
        throw "There is no valid ROLE to use pandora admin service";

    }
}

export default new AuthenticationService()
