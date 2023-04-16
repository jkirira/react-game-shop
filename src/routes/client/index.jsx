import { paths } from './paths'

import Home from '../../pages/Home'
import Login from '../../pages/client/Login'
import SignUp from '../../pages/client/SignUp'
import ForgotPassword from '../../pages/client/ForgotPassword'
import ConfirmEmail from '../../pages/client/ConfirmEmail'
import ResetPassword from '../../pages/client/ResetPassword'

const routes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: paths.LOGIN,
        element: <Login />
    },
    {
        path: paths.SIGN_UP,
        element: <SignUp />
    },
    {
        path: paths.FORGOT_PASSWORD,
        element: <ForgotPassword />
    },
    {
        path: paths.CONFIRM_EMAIL,
        element: <ConfirmEmail />
    },
    {
        path: paths.RESET_PASSWORD,
        element: <ResetPassword />
    },
    {
        path: paths.LOGOUT,
    },
]

export default routes;
