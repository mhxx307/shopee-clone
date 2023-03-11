import classNames from 'classnames';
import BaseButton, { BaseButtonProps } from './BaseButton';

export interface ButtonProps extends BaseButtonProps {
    secondary?: boolean;
}

const Button = ({
    className,
    children,
    secondary,
    ...passProps
}: ButtonProps) => {
    return (
        <BaseButton
            type="button"
            className={classNames(
                'flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80',
                className,
                secondary && 'bg-transparent hover:bg-white/20',
            )}
            {...passProps}
        >
            {children}
        </BaseButton>
    );
};

export default Button;
