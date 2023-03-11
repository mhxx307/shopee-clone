import getSchema from 'src/utils/schema';

function useSchemaValidate(type: 'login' | 'register' | 'priceMinMax') {
    const registerSchema = getSchema().pick([
        'email',
        'password',
        'confirmPassword',
    ]);

    const loginSchema = registerSchema.pick(['email', 'password']);

    const priceMinMaxSchema = getSchema().pick(['price_min', 'price_max']);

    switch (type) {
        case 'login':
            return loginSchema;
        case 'register':
            return registerSchema;
        case 'priceMinMax':
            return priceMinMaxSchema;
        default:
            break;
    }
}

export default useSchemaValidate;
