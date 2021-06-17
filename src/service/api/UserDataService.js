import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";

class UserDataService {

    retrieveUserByMailOrNickname(nicknameOrMail) {
        //console.log('executed service')
        return axios.get(`${ADMIN_API_URL}/users/search/${nicknameOrMail}`);
    }


}

export default new UserDataService()
