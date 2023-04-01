import { Footer } from '../partials';
import { CartHeader } from '../shared';

function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <CartHeader />
            {children}
            <Footer />
        </div>
    );
}

export default CartLayout;
