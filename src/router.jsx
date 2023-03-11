import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import AdminLayout from './layouts/admin/AdminLayout'
import ClientLayout from './layouts/client/ClientLayout'
import clientRoutes from './routes/client/index'

const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
        children: [
            {
                path: 'admin',
                element: <AdminLayout />,
                children: []
            },
            {
                element: <ClientLayout />,
                children: clientRoutes,
            },
        ]
	},
]);

export default browserRouter;
