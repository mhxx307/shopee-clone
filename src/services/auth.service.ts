import { AuthResponse } from 'src/types/auth.type';
import httpRequest from 'src/utils/http';

export const register = (body: { email: string; password: string }) => {
    return httpRequest.post<AuthResponse>('/register', body);
};

export const login = (body: { email: string; password: string }) => {
    return httpRequest.post<AuthResponse>('/login', body);
};

export const logout = () => {
    return httpRequest.post<AuthResponse>('/logout');
};
