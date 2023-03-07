import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { Button, InputField } from 'src/components/shared';
import { register } from 'src/services/auth.service';
import { omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from 'src/utils';
import { ErrorResponseApi } from 'src/types/util.type.ts';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth.context';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup
    .object({
        email: yup
            .string()
            .required('Please enter your email')
            .matches(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                'Incorrect format of email',
            ),
        password: yup
            .string()
            .required('Please enter your password')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                'At least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters.',
            ),
        confirmPassword: yup
            .string()
            .required('Please retype your password.')
            .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    })
    .required();

function RegisterPage() {
    const { setIsAuthenticated } = useContext(AuthContext);

    const registerMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirmPassword'>) => {
            return register(body);
        },
    });

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
                                <Link className="ml-1 text-red-400" to="/login">
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
