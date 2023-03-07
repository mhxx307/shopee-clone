import { Link, useMatch } from 'react-router-dom';
import { Logo } from '../icons';

function RegisterHeader() {
    const registerMatch = useMatch('/register');
    const isRegister = Boolean(registerMatch);
    return (
        <header className="container">
            <nav className="flex-center space-x-6">
                <Link to="/" className="flex h-32 w-32">
                    <Logo className="fill-primary" />
                </Link>
                <p className="text-xl lg:text-2xl">
                    {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                </p>
            </nav>
        </header>
    );
}

export default RegisterHeader;
