import AdminHome from '../../pages/admin/Home'
import AdminLogin from '../../pages/admin/Login'
import ForgotPassword from '../../pages/admin/ForgotPassword'
import ResetPassword from '../../pages/admin/ResetPassword'

const routes = [
    {
        index: true,
        element: <AdminHome />,
    },
    {
        path: 'login',
        element: <AdminLogin />
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
    },
]

export default routes;
