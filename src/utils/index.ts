import axios, { AxiosError } from 'axios';
import { User } from 'src/types/user.type';

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

export function clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
}

export function getAccessToken() {
    return localStorage.getItem('access_token') || '';
}

export function getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
}

export function saveProfile(profile: User) {
    localStorage.setItem('profile', JSON.stringify(profile));
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('de-DE').format(value);
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase();
}

export function rateSale(original: number, sale: number) {
    return Math.round(((original - sale) / original) * 100) + '%';
}

export const removeSpecialCharacter = (str: string) =>
    str.replace(
        // eslint-disable-next-line no-useless-escape
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        '',
    );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`;
};

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i,');
    return arr[arr.length - 1];
};
