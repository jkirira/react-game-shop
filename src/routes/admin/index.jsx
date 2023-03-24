import { paths } from './paths'

import AdminHome from '../../pages/admin/Home'
import AdminLogin from '../../pages/admin/Login'
import ForgotPassword from '../../pages/admin/ForgotPassword'
import ResetPassword from '../../pages/admin/ResetPassword'
import Categories from '../../pages/admin/categories/Categories'
import AddCategory from '../../pages/admin/categories/AddCategory'
import EditCategory from '../../pages/admin/categories/EditCategory'

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
    {
        path: paths.ADMIN_CATEGORIES,
        children: [
            {
                index: true,
                element: <Categories />
            },
            {
                path: paths.ADMIN_CATEGORIES_CREATE,
                element: <AddCategory />
            },
            {
                path: paths.ADMIN_CATEGORIES_EDIT,
                element: <EditCategory />
            },
        ]
    },
]

export default routes;
