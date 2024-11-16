import axios from "axios";
import url from "../../utils/url";


export function getLoans () {
    return axios.get(`${url}/loans`);
}

export function getLoan (id) {
    return axios.get(`${url}/loans/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function postLoan (loan) {
    return axios.post(`${url}/loans/`, loan, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}
