import { paths } from './paths'

import AdminHome from '../../pages/admin/Home'
import AdminLogin from '../../pages/admin/Login'
import ForgotPassword from '../../pages/admin/ForgotPassword'
import ResetPassword from '../../pages/admin/ResetPassword'
import Categories from '../../pages/admin/categories/Categories'
import ViewCategory from '../../pages/admin/categories/ViewCategory'
import CategoriesLayout from '../../layouts/admin/CategoriesLayout'
import GamesLayout from '../../layouts/admin/GamesLayout'
import Games from '../../pages/admin/games/Games'
import ViewGame from '../../pages/admin/games/ViewGame'
import AddGame from '../../pages/admin/games/AddGame'
import EditGame from '../../pages/admin/games/EditGame'
import AdminProfile from '../../pages/admin/profile/Profile'

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
        path: paths.ADMIN_LOGOUT,
    },
    {
        path: paths.ADMIN_CATEGORIES,
        element: <CategoriesLayout />,
        children: [
            {
                index: true,
                element: <Categories />
            },
            {
                path: paths.ADMIN_CATEGORIES_VIEW,
                element: <ViewCategory />
            },
        ]
    },
    {
        path: paths.ADMIN_GAMES,
        element: <GamesLayout />,
        children: [
            {
                index: true,
                element: <Games />
            },
            {
                path: paths.ADMIN_GAMES_VIEW,
                element: <ViewGame />
            },
            {
                path: paths.ADMIN_GAMES_CREATE,
                element: <AddGame />
            },
            {
                path: paths.ADMIN_GAMES_EDIT,
                element: <EditGame />
            },
        ]
    },
    {
        path: paths.ADMIN_PROFILE,
        element: <AdminProfile />,
    }
]

export default routes;
