import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";

class CategoryDataService {

    retrieveAllCategorys() {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/all`);
    }

    async retrieveAllCategorysForSelect() {
         return axios.get(`${ADMIN_API_URL}/categorys/all/selectable`)
    }

    retrieveCategoryDetailedInfo(categoryId){
        return axios.get(`${ADMIN_API_URL}/category/${categoryId}`)
    }

    async addCategoryToTheServer(title, description){
        let category = {title: title, description: description};
        return  await axios.post(`${ADMIN_API_URL}/category/add`,category)
    }

    async deleteCategoryFromServer(id){
        return  await axios.delete(`${ADMIN_API_URL}/category/delete/${id}`)
    }
}


export default new CategoryDataService()
