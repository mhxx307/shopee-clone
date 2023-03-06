import { User } from './user.type';
import { ResponseApi } from './util.type.ts';

export interface data {
    access_token: string;
    expires: string;
    user: User;
}

export type AuthResponse = ResponseApi<data>;
