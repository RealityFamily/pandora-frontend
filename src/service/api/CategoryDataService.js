import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8082"

const CLIENT_API_URL = `${SERVER_BASE_URL}/api/v1/client`;

class CategoryDataService {

    retrieveAllCourses() {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/all`);
    }
}

export default new CategoryDataService()
