import { useRouteElements } from './routes';

function App() {
    const routeElements = useRouteElements();
    return <div>{routeElements}</div>;
}

export default App;
