import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router';
import { MainLayout, RegisterLayout } from './components/layouts';
import { AuthContext } from './contexts/auth.context';
import { HomePage, LoginPage, ProfilePage, RegisterPage } from './pages';

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

const routes = [
    {
        path: '/',
        index: true,
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
    {
        path: '',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/profile',
                element: (
                    <MainLayout>
                        <ProfilePage />
                    </MainLayout>
                ),
            },
        ],
    },
    {
        path: '',
        element: <RejectedRoute />,
        children: [
            {
                path: '/login',
                element: (
                    <RegisterLayout>
                        <LoginPage />
                    </RegisterLayout>
                ),
            },
            {
                path: '/register',
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
