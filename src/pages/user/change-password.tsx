import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, InputField } from 'src/components/shared';
import userService from 'src/services/user.service';
import { ErrorResponseApi } from 'src/types/util.type.ts';
import { isAxiosUnprocessableEntityError } from 'src/utils';
import { UserSchema, userSchema } from 'src/utils/schema';

type FormData = Pick<
    UserSchema,
    'password' | 'new_password' | 'confirm_password'
>;
const passwordSchema = userSchema.pick([
    'password',
    'new_password',
    'confirm_password',
]);

export default function ChangePassword() {
    const { control, handleSubmit, setError, reset } = useForm<FormData>({
        defaultValues: {
            password: '',
            confirm_password: '',
            new_password: '',
        },
        resolver: yupResolver(passwordSchema),
    });
    const updateProfileMutation = useMutation(userService.updateProfile);

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data);
            const res = await updateProfileMutation.mutateAsync({
                password: data.password,
                newPassword: data.new_password,
            });
            toast.success(res.data.message);
            reset();
        } catch (error) {
            if (
                isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(
                    error,
                )
            ) {
                const formError = error.response?.data.data;
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key as keyof FormData, {
                            message: formError[key as keyof FormData] as string,
                            type: 'Server',
                        });
                    });
                }
            }
        }
    });

    return (
        <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
            <div className="border-b border-b-gray-200 py-6">
                <h1 className="text-lg font-medium capitalize text-gray-900">
                    Đổi mật khẩu
                </h1>
                <div className="mt-1 text-sm text-gray-700">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
            </div>
            <form className="mt-8 mr-auto max-w-2xl" onSubmit={onSubmit}>
                <div className="mt-6 flex-grow md:mt-0 md:pr-12">
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Mật khẩu cũ
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField
                                containerInputClassName="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                className="relative "
                                control={control}
                                name="password"
                                type="password"
                                placeholder="Mật khẩu cũ"
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Mật khẩu mới
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField
                                containerInputClassName="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                className="relative"
                                control={control}
                                name="new_password"
                                type="password"
                                placeholder="Mật khẩu mới"
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Nhập lại mật khẩu
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField
                                containerInputClassName="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                className="relative "
                                control={control}
                                name="confirm_password"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
                        <div className="sm:w-[80%] sm:pl-5">
                            <Button
                                primary
                                type="submit"
                                isLoading={updateProfileMutation.isLoading}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
