import { AuthResponse } from 'src/types/auth.type';
import httpRequest from 'src/utils/http';

export const register = async (body: { email: string; password: string }) => {
    return httpRequest.post<AuthResponse>('/register', body);
};
