import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";


class ItemDataService {

    retrieveAllItemsBySubcategoryId(subgroupId) {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/item/bysubgroup/${subgroupId}`);
    }

    getDetailedInfoItem(id) {
        return axios.get(`${CLIENT_API_URL}/item/${id}`);
    }

    getSmallImageByItemId(itemId) {
        return axios.get(`${CLIENT_API_URL}/item/${itemId}/photo/small`, {responseType: 'blob'});
    }

    postItemToServer(form) {
        return axios.post(`${ADMIN_API_URL}/item/add`, form);
    }

    updateItemInfo(id, name, description) {
        let item = {
            name: name,
            description: description
        }
        return axios.put(`${ADMIN_API_URL}/item/update/${id}`, item)
    }
}

export default new ItemDataService()
