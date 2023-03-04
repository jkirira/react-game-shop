import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmEmail from './pages/ConfirmEmail'

const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Home />
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
            }
        ]
	},
]);

export default browserRouter;
