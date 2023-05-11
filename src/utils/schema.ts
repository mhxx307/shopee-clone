import * as yup from 'yup';

const getSchema = () => {
    function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
        const { price_max, price_min } = this.parent as {
            price_min: string;
            price_max: string;
        };
        if (price_min !== '' && price_max !== '') {
            return Number(price_max) >= Number(price_min);
        }
        return price_min !== '' || price_max !== '';
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
            price_min: yup.string().test({
                name: 'price-not-allowed',
                message: 'Giá không phù hợp',
                test: testPriceMinMax,
            }),
            price_max: yup.string().test({
                name: 'price-not-allowed',
                message: 'Giá không phù hợp',
                test: testPriceMinMax,
            }),
            name: yup.string().required(),
        })
        .required();

    return schema;
};

export default getSchema;

const schema = getSchema();
export type Schema = yup.InferType<typeof schema>;

export const userSchema = yup.object({
    email: yup.string().max(255, 'Độ dài email không được quá 255 ký tự'),
    password: yup
        .string()
        .required('Please enter your password')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            'At least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters.',
        ),
    confirmPassword: schema.fields['confirmPassword'],
    name: yup.string().max(160, 'Độ dài tên không được quá 160 ký tự'),
    phone: yup.string().max(20, 'Độ dài số điện thoại không được quá 20 ký tự'),
    address: yup.string().max(160, 'Độ dài địa chỉ không được quá 255 ký tự'),
    avatar: yup
        .string()
        .max(1000, 'Độ dài đường dẫn ảnh không được quá 1000 ký tự'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
    new_password: yup
        .string()
        .required('Please enter your password')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            'At least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters.',
        ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('new_password')], 'Mật khẩu không khớp'),
});
export type UserSchema = yup.InferType<typeof userSchema>;
