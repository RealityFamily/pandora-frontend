import axios from "axios";
import CLIENT_API_URL from "./Infrostracture/ClientApiService";
import ADMIN_API_URL from "./Infrostracture/AdminApiService";


class SubTagDataService {

    retrieveSubtagDetailedInfo(subtagId){
        return axios.get(`${ADMIN_API_URL}/subtag/${subtagId}`);
    }

    addSubcategoryToTheServer(title, subcategoryId) {
        let subtag = {title: title};
        return axios.post(`${ADMIN_API_URL}/subtag/add/to/${subcategoryId}`, subtag)
    }

    deleteSubtagFromServer(id) {
        return axios.delete(`${ADMIN_API_URL}/subtag/delete/${id}`)
    }
}

export default new SubTagDataService()
