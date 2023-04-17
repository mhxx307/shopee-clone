import { Navigate, Outlet, useRoutes } from 'react-router';
import { CartLayout, MainLayout, RegisterLayout } from './components/layouts';
import { path } from './constants';
import { useAppContext } from './contexts/app.context';
import {
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    ProductDetailPage,
    CartPage,
} from './pages';

function ProtectedRoute() {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
    const { isAuthenticated } = useAppContext();
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}

const routes = [
    {
        path: path.home,
        index: true,
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: path.productDetail,
        index: true,
        element: (
            <MainLayout>
                <ProductDetailPage />
            </MainLayout>
        ),
    },
    {
        path: '',
        element: <ProtectedRoute />,
        children: [
            {
                path: path.profile,
                element: (
                    <MainLayout>
                        <ProfilePage />
                    </MainLayout>
                ),
            },
            {
                path: path.cart,
                element: (
                    <CartLayout>
                        <CartPage />
                    </CartLayout>
                ),
            },
        ],
    },
    {
        path: '',
        element: <RejectedRoute />,
        children: [
            {
                path: path.login,
                element: (
                    <RegisterLayout>
                        <LoginPage />
                    </RegisterLayout>
                ),
            },
            {
                path: path.register,
                element: (
                    <RegisterLayout>
                        <RegisterPage />
                    </RegisterLayout>
                ),
            },
        ],
    },
];

export function useRouteElements() {
    const routesElements = useRoutes(routes);

    return routesElements;
}
