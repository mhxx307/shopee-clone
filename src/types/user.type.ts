type Role = 'admin' | 'user';

export interface User {
    _id: string;
    roles: Role[];
    email: string;
    name?: string;
    phone?: string;
    date_of_birth?: string;
    avatar?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
