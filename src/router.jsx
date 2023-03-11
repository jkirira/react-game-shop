import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import ClientLayout from './layouts/client/ClientLayout'
import adminRoutes from './routes/admin/index'
import clientRoutes from './routes/client/index'

const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
        children: [
            {
                path: 'admin',
                element: <AdminLayout />,
                children: adminRoutes,
            },
            {
                element: <ClientLayout />,
                children: clientRoutes,
            },
        ]
	},
]);

export default browserRouter;
