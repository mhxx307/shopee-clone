import axios, { AxiosInstance } from 'axios';

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const httpRequest = new Http().instance;

export default httpRequest;
