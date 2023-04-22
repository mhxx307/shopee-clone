import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { path } from 'src/constants';
import { AuthResponse } from 'src/types/auth.type';
import {
    clearLocalStorage,
    getAccessToken,
    saveAccessToken,
    saveProfile,
} from '.';

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
                if (url === path.login || url === path.register) {
                    const data = (response.data as AuthResponse).data;
                    this.accessToken = data.access_token as string;
                    saveAccessToken(this.accessToken);
                    saveProfile(data.user);
                } else if (url === path.logout) {
                    this.accessToken = '';
                    clearLocalStorage();
                }
                return response;
            },
            (error) => {
                if (error.response.status === 422) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data;
                    const message = data?.message || error.message;
                    toast.error(message, {
                        toastId: 'error',
                    });
                }

                if (error.response.status === HttpStatusCode.Unauthorized) {
                    clearLocalStorage();
                }

                return Promise.reject(error);
            },
        );
    }
}

const httpRequest = new Http().instance;

export default httpRequest;
