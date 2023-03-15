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
