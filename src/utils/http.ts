import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000, // 10 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 422) {
                    const message = error.response.data.message;
                    toast.error(message, {
                        toastId: 'error',
                    });
                }

                return Promise.reject(error);
            },
        );
    }
}

const httpRequest = new Http().instance;

export default httpRequest;
