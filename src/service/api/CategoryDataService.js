import axios from "axios";
import CLIENT_API_URL from "./ClientApiService";

class CategoryDataService {

    retrieveAllCourses() {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/all`);
    }
}

export default new CategoryDataService()
