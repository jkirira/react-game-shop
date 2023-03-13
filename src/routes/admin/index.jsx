import AdminHome from '../../pages/admin/Home'
import AdminLogin from '../../pages/admin/Login'

const routes = [
    {
        index: true,
        element: <AdminHome />,
    },
    {
        path: 'login',
        element: <AdminLogin />
    },
]

export default routes;
