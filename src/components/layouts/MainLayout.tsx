import { Footer, Header } from '../partials';

export interface ILayout {
    children: React.ReactNode;
    isHeader?: boolean;
}

function MainLayout({ children, isHeader = true }: ILayout) {
    return (
        <div className="flex h-screen flex-col justify-between">
            {isHeader && <Header />}
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
