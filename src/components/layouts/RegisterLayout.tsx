import { Footer, RegisterHeader } from '../partials';
import { ILayout } from './MainLayout';

function RegisterLayout({ children, isHeader = true }: ILayout) {
    return (
        <div className="flex h-screen flex-col justify-between">
            {isHeader && <RegisterHeader />}
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
}

export default RegisterLayout;
