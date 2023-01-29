import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api"

class EmployeeService {

    saveEmployee = (employee) => {
        return axios.post(`${EMPLOYEE_API_BASE_URL}/addEmployee`, employee);
    }

    getEmployees = () => {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/employees`);
    }

    deleteEmployee = (id) => {
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/employees/${id}`);
    }
}

export default new EmployeeService();