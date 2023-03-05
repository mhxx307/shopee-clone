import { Footer, RegisterHeader } from '../partials';

function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col justify-between">
            <RegisterHeader />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
}

export default RegisterLayout;
