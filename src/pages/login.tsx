import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, InputField } from 'src/components/shared';
import authService from 'src/services/auth.service';
import { toast } from 'react-toastify';
import { isAxiosUnprocessableEntityError } from 'src/utils';
import { ErrorResponseApi } from 'src/types/util.type.ts';
import { useAppContext } from 'src/contexts/app.context';
import { useSchemaValidate } from 'src/hooks';
interface FormData {
    email: string;
    password: string;
}

function LoginPage() {
    const { setIsAuthenticated, setProfile } = useAppContext();

    const loginMutation = useMutation({
        mutationFn: (body: FormData) => {
            return authService.login(body);
        },
    });

    const schema = useSchemaValidate('login');
    const { handleSubmit, control, setError, reset } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleLogin = (payload: FormData) => {
        loginMutation.mutate(payload, {
            onSuccess: (data) => {
                setIsAuthenticated(true);
                setProfile(data.data.data.user);
                toast.success(data.data.message);
                reset();
            },
            onError: (error) => {
                if (
                    isAxiosUnprocessableEntityError<
                        ErrorResponseApi<Omit<FormData, 'confirmPassword'>>
                    >(error)
                ) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(
                                key as keyof Omit<FormData, 'confirmPassword'>,
                                {
                                    type: 'server',
                                    message:
                                        formError[
                                            key as keyof Omit<
                                                FormData,
                                                'confirmPassword'
                                            >
                                        ],
                                },
                            );
                        });
                    }
                } else {
                    console.log(error);
                }
            },
        });
    };

    return (
        <div className="bg-primary">
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form
                            className="space-y-6 rounded bg-white p-10 shadow-sm"
                            noValidate
                            onSubmit={handleSubmit(handleLogin)}
                        >
                            <div className="text-2xl">Đăng nhập</div>
                            <InputField
                                name="email"
                                control={control}
                                type="email"
                                placeholder="Email"
                            />
                            <InputField
                                name="password"
                                control={control}
                                type="password"
                                placeholder="Password"
                                autoComplete="on"
                            />
                            <div className="mt-3">
                                <Button
                                    primary
                                    type="submit"
                                    className="flex w-full items-center justify-center py-4"
                                    isLoading={loginMutation.isLoading}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                <span className="text-gray-400">
                                    Bạn chưa có tài khoản?
                                </span>
                                <Link
                                    className="ml-1 text-red-400"
                                    to="/register"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
