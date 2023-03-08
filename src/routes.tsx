import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router';
import { MainLayout, RegisterLayout } from './components/layouts';
import { path } from './constants';
import { AuthContext } from './contexts/auth.context';
import { HomePage, LoginPage, ProfilePage, RegisterPage } from './pages';

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);
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
