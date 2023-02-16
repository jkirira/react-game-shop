import { createBrowserRouter } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'

const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
	},
]);

export default browserRouter;
