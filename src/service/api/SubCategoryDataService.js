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

    async addSubcategoryToTheServer(title, description, categoryId) {
        let subcategory = {title: title, description: description};
        return axios.post(`${ADMIN_API_URL}/subcategory/add/to/${categoryId}`, subcategory)
    }

    async deleteSubcategoryFromServer(id) {
        return  await axios.delete(`${ADMIN_API_URL}/subcategory/delete/${id}`)
    }
}

export default new SubCategoryDataService()
