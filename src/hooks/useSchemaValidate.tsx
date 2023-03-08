import * as yup from 'yup';

function useSchemaValidate(type: 'login' | 'register') {
    const registerSchema = yup
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

    const loginSchema = registerSchema.pick(['email', 'password']);

    switch (type) {
        case 'login':
            return loginSchema;
        case 'register':
            return registerSchema;
        default:
            break;
    }
}

export default useSchemaValidate;
