import { Link } from 'react-router-dom';
import { Logo } from '../icons';

function RegisterHeader() {
    return (
        <header className="mx-auto max-w-7xl px-4">
            <nav className="flex items-center">
                <Link to="/" className="flex h-32 w-32 items-center">
                    <Logo className="fill-primary" />
                </Link>
                <p className="text-xl lg:text-2xl">Đăng ký</p>
            </nav>
        </header>
    );
}

export default RegisterHeader;
