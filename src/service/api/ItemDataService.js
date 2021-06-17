import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";


class ItemDataService {

    retrieveAllItemsBySubcategoryId(subgroupId) {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/item/bysubgroup/${subgroupId}`);
    }

    getSmallImageByItemId(itemId){
        return axios.get(`${CLIENT_API_URL}/item/${itemId}/photo/small`).then( data =>{
            console.log(data);
        });
    }

    postItemToServer(form){
        return axios.post(`${ADMIN_API_URL}/item/add`, form);
    }
}

export default new ItemDataService()
