import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
    return (
        <div className="main">
            <Outlet />
        </div>
    );
}
