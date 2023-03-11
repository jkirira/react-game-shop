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
        path: 'login',
        element: <Login />
    },
    {
        path: 'sign-up',
        element: <SignUp />
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />
    },
    {
        path: 'confirm-email',
        element: <ConfirmEmail />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
    },
]

export default routes;
