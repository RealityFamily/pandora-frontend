import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";


class SubTagDataService {

    retrieveSubtagDetailedInfo(subtagId){
        return axios.get(`${ADMIN_API_URL}/subtag/${subtagId}`);
    }

}

export default new SubTagDataService()
