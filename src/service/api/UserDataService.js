import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";

class UserDataService {

    retrieveUserByMailOrNickname(nicknameOrMail) {
        //console.log('executed service')
        return axios.get(`${ADMIN_API_URL}/users/search/${nicknameOrMail}`);
    }

    retrieveAllUsers(){
        return axios.get(`${ADMIN_API_URL}/users`);
    }


    updateUserVerificationStatus(enabled, id) {
        return axios.post(`${ADMIN_API_URL}/users/${id}/setEnabled?enabled=${enabled}`)
    }
}

export default new UserDataService()
