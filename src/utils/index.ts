import axios, { AxiosError } from 'axios';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<T>(
    error: unknown,
): error is AxiosError<T> {
    return isAxiosError(error) && error.response?.status === 422;
}

export function saveAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token);
}

export function clearAccessToken() {
    localStorage.removeItem('access_token');
}

export function getAccessToken() {
    return localStorage.getItem('access_token') || '';
}
