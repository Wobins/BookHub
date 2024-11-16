import axios from "axios";
import url from "../../utils/url";


export function getBooks () {
    return axios.get(`${url}/books`);
}

export function getBook (id) {
    return axios.get(`${url}/books/${id}`, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export function postBook (book) {
    return axios.post(`${url}/books/`, book, {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    });
}
