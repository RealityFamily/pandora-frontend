import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";


class SubCategoryDataService {

    retrieveAllSubategorysByCategoryId(id) {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/${id}/subcategories`);
    }

    retrieveSubcategoryDetailedInfo(subcategoryId){
        return axios.get(`${ADMIN_API_URL}/subcategory/${subcategoryId}`);
    }

}

export default new SubCategoryDataService()
