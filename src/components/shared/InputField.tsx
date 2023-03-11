import { useController, Control } from 'react-hook-form';
import Input, { InputProps } from './Input';

interface InputFieldProps extends InputProps {
    name: string;
    onlyNumber?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
}

const InputField = ({
    name,
    control,
    onlyNumber = false,
    // not using these props, but we don't want to pass them down to the Input component
    onChange: _externalOnChange,
    onBlur: _externalOnBlur,
    value: _externalValue,
    ref: _externalRef,
    // ********
    ...props
}: InputFieldProps) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d+$/.test(value) || value === '') {
            // Thực thi onChange callback từ bên ngoài truyền vào props
            onChange && onChange(event);
        }
    };

    return (
        <>
            <Input
                name={name}
                value={value}
                onChange={onlyNumber ? handleChange : onChange}
                onBlur={onBlur}
                {...props}
                ref={ref}
                defaultLayout={false}
                labelClassName={`${error ? 'error-label' : 'default-label'}`}
                containerInputClassName={`${
                    error ? 'default-input bg-red-50' : 'default-input'
                }`}
            />
            {!!error && (
                <p className="text-sm text-red-600 dark:text-red-500">
                    {error.message}
                </p>
            )}
        </>
    );
};

export default InputField;
