import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import { Button, InputField } from 'src/components/shared';
import authService from 'src/services/auth.service';
import omit from 'lodash/omit';
import { isAxiosUnprocessableEntityError } from 'src/utils';
import { ErrorResponseApi } from 'src/types/util.type.ts';
import { toast } from 'react-toastify';
import { useAppContext } from 'src/contexts/app.context';
import { path } from 'src/constants';
import { useSchemaValidate } from 'src/hooks';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

function RegisterPage() {
    const { setIsAuthenticated, setProfile } = useAppContext();

    const registerMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirmPassword'>) => {
            return authService.register(body);
        },
    });

    const schema = useSchemaValidate('register');
    const { handleSubmit, control, setError, reset } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleRegister = (payload: FormData) => {
        const body = omit(payload, ['confirmPassword']);
        registerMutation.mutate(body, {
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
                            onSubmit={handleSubmit(handleRegister)}
                        >
                            <div className="text-2xl">Đăng ký</div>
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
                            <InputField
                                name="confirmPassword"
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
                                    isLoading={registerMutation.isLoading}
                                >
                                    Đăng ký
                                </Button>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                <span className="text-gray-400">
                                    Bạn đã có tài khoản ?
                                </span>
                                <Link
                                    className="ml-1 text-red-400"
                                    to={path.login}
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
