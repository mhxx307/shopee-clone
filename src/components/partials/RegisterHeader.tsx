import { Link } from 'react-router-dom';
import { Logo } from '../icons';

function RegisterHeader() {
    return (
        <header className="container">
            <nav className="flex-center space-x-6">
                <Link to="/" className="flex h-32 w-32">
                    <Logo className="fill-primary" />
                </Link>
                <p className="text-xl lg:text-2xl">Xin chào</p>
            </nav>
        </header>
    );
}

export default RegisterHeader;
