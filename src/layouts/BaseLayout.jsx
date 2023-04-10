import { Outlet } from 'react-router-dom'
import Navbar from '../components/client/Navbar';

export default function BaseLayout() {
    return (
        <>

            <Navbar />

            <div className="main">
                <Outlet />
            </div>

        </>
    );
}
