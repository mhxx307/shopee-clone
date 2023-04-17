import { ToastContainer } from 'react-toastify';

import { useRouteElements } from './routes';
import { useEffect } from 'react';
import { LocalStorageEventTarget } from './utils';
import { useAppContext } from './contexts/app.context';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const routeElements = useRouteElements();
    const { reset } = useAppContext();
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLocalStorage', reset);

        return () => {
            LocalStorageEventTarget.removeEventListener(
                'clearLocalStorage',
                reset,
            );
        };
    }, [reset]);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {routeElements}
        </div>
    );
}

export default App;
