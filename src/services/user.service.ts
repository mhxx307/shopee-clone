import { SuccessResponseApi } from 'src/types/util.type.ts';
import httpRequest from 'src/utils/http';
import { User } from 'src/types/user.type';

interface BodyUpdateProfile
    extends Omit<
        User,
        '_id' | 'roles' | 'createdAt' | 'updatedAt' | '__v' | 'email'
    > {
    password?: string;
    newPassword?: string;
}

const userService = {
    getProfile() {
        return httpRequest.get<SuccessResponseApi<User>>(`me`);
    },
    updateProfile(body: BodyUpdateProfile) {
        return httpRequest.put<SuccessResponseApi<User>>('user', body);
    },
    uploadAvatar(body: FormData) {
        return httpRequest.post<SuccessResponseApi<string>>(
            'user/upload-avatar',
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    },
};

export default userService;
