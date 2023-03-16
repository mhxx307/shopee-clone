import classNames from 'classnames';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Input, { InputProps } from './Input';

interface QuantityControllerProps extends InputProps {
    max?: number;
    classNameWrapper?: string;
    onIncrease?: (value: number) => void;
    onDecrease?: (value: number) => void;
    onType?: (value: number) => void;
}

function QuantityController({
    max,
    classNameWrapper = 'ml-10',
    onIncrease,
    onDecrease,
    onType,
    value,
    ...props
}: QuantityControllerProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(event.target.value);
        if (max !== undefined && _value > max) {
            _value = max;
        } else if (_value < 1) {
            _value = 1;
        }

        onType && onType(_value);
    };

    const handleIncrease = () => {
        let _value = Number(value) + 1;
        if (max !== undefined && _value > max) {
            _value = max;
        }

        onIncrease && onIncrease(_value);
    };

    const handleDecrease = () => {
        let _value = Number(value) - 1;
        if (_value < 1) {
            _value = 1;
        }

        onDecrease && onDecrease(_value);
    };

    return (
        <div className={classNames('flex items-center', classNameWrapper)}>
            <button
                className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600"
                onClick={handleDecrease}
            >
                <AiOutlineMinus />
            </button>
            <Input
                type="text"
                value={value}
                className="flex-center h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-center text-gray-600"
                onlyNumber
                onChange={handleChange}
                {...props}
            />
            <button
                className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600"
                onClick={handleIncrease}
            >
                <AiOutlinePlus />
            </button>
        </div>
    );
}

export default QuantityController;
