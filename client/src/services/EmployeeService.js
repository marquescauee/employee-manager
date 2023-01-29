import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api"

class EmployeeService {

    saveEmployee = (employee) => {
        return axios.post(`${EMPLOYEE_API_BASE_URL}/employees`, employee);
    }

}

export default new EmployeeService();