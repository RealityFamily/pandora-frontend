import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";

class CategoryDataService {

    retrieveAllCategorys() {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/all`);
    }

    async retrieveAllCategorysForSelect() {
         return axios.get(`${ADMIN_API_URL}/categorys/all`)
    }
}

export default new CategoryDataService()
