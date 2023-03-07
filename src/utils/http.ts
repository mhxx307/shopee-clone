import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';
import { clearAccessToken, getAccessToken, saveAccessToken } from '.';

/*
 * dùng attr access_token để lưu token thay vì dùng thẳng getAccessToken()
 * vì dùng attr trong class thì nó sẽ lưu trên ram, còn localStorage thì lưu trên disk
 * đọc từ ram sẽ luôn nhanh hơn đọc từ disk
 */

class Http {
    instance: AxiosInstance;
    private accessToken: string;
    constructor() {
        this.accessToken = getAccessToken();
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000, // 10 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.authorization = this.accessToken;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === '/login' || url === '/register') {
                    this.accessToken = (response.data as AuthResponse).data
                        .access_token as string;
                    saveAccessToken(this.accessToken);
                } else if (url === '/logout') {
                    this.accessToken = '';
                    clearAccessToken();
                }
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
