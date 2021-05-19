import axios from "axios";

const CLIENT_API_URL = 'http://localhost:8082/api/v1/client';

class CategoryDataService {

    retrieveAllCourses() {
        //console.log('executed service')
        return axios.get(`${CLIENT_API_URL}/category/all`,
            //{ headers: { authorization: 'Basic ' + window.btoa(INSTRUCTOR + ":" + PASSWORD) } }
        );
    }
}

export default CategoryDataService
