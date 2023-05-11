import { Navigate, Outlet, useRoutes } from 'react-router';
import { CartLayout, MainLayout, RegisterLayout } from './components/layouts';
import { path } from './constants';
import { useAppContext } from './contexts/app.context';
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ProductDetailPage,
    CartPage,
} from './pages';
import { ChangePasswordPage, ProfilePage, PurchasePage } from './pages/user';
import UserLayout from './pages/user/layouts/UserLayout';
import NotFound from './pages/notFound';

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
                path: path.user, // khi đi qua path user, trong user layout sẽ có outlet
                // các component trong children sẽ được render vào outlet
                element: (
                    <MainLayout>
                        <UserLayout />
                    </MainLayout>
                ),
                children: [
                    {
                        path: path.profile,
                        element: <ProfilePage />,
                    },
                    {
                        path: path.changePassword,
                        element: <ChangePasswordPage />,
                    },
                    {
                        path: path.historyPurchase,
                        element: <PurchasePage />,
                    },
                ],
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
    {
        path: '*',
        element: (
            <MainLayout>
                <NotFound />
            </MainLayout>
        ),
    },
];

export function useRouteElements() {
    const routesElements = useRoutes(routes);

    return routesElements;
}
