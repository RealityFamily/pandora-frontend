import axios from "axios";
import CLIENT_API_URL from "./ClientApiService";


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
}

export default new ItemDataService()
