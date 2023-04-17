import { Outlet } from 'react-router-dom';
import { SideNav } from '../components';

function UserLayout() {
    return (
        <div>
            <SideNav />
            <Outlet />
        </div>
    );
}

export default UserLayout;
