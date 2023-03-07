import { useRoutes } from 'react-router';
import { MainLayout, RegisterLayout } from './components/layouts';
import { HomePage, LoginPage, RegisterPage } from './pages';

const routes = [
    {
        path: '/',
        element: (
            <MainLayout>
                <HomePage />
            </MainLayout>
        ),
    },
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
];

export function useRouteElements() {
    const routesElements = useRoutes(routes);

    return routesElements;
}
