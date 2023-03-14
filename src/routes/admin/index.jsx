import paths from './pathnames'

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
        path: paths.ADMIN_LOGIN,
        element: <AdminLogin />
    },
    {
        path: paths.ADMIN_FORGOT_PASSWORD,
        element: <ForgotPassword />
    },
    {
        path: paths.ADMIN_RESET_PASSWORD,
        element: <ResetPassword />
    },
]

export default routes;
