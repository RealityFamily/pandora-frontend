import axios from "axios";
import CLIENT_API_URL from "./ClientApiService";


class SubCategoryDataService {

    retrieveAllSubategorysByCategoryId(id) {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/${id}/subcategories`);
    }
}

export default new SubCategoryDataService()
