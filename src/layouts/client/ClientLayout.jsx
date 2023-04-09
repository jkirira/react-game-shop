import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getFromLocalStorage, toastNotify } from '../../helpers';
import { authUserApi } from '../../apis/client/auth';
import { paths, requireAuthPaths, requireNoAuthPaths } from '../../routes/client/paths';
import { loggedIn, loggedOut, isLoggedInSelector } from '../../store/slices/authSlice';
import { setUser, userSelector, isAdminSelector } from '../../store/slices/userSlice';

export default function ClientLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(userSelector, shallowEqual);
    const isAdmin = useSelector(isAdminSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);


    useEffect(() => {

        let pathRequiresNoAuth = requireNoAuthPaths.includes(location.pathname);
        let pathRequiresAuth = requireAuthPaths.includes(location.pathname);
        let openPath = !pathRequiresAuth && !pathRequiresNoAuth;


        async function fetchAuthUser(token) {
            if(!token) {
                return false;
            }

            await authUserApi({ token: token })
                    .then(response => {
                        let user = response.data.client;
                        dispatch(setUser(user));
                        dispatch(loggedIn({
                            id: user.id,
                            token: response.data.token
                        }));
                    })
                    .catch(error => {
                        toastNotify(error.response.data.message, { type: 'error' });
                        dispatch(loggedOut());
                        navigate(paths.LOGIN);
                    });
        }


        if(!user) {
            let localStorage_data = getFromLocalStorage();

            if(Object.keys(localStorage_data).length > 0) {
                fetchAuthUser(localStorage_data.token);
                return;

            } else {
                if(pathRequiresNoAuth) {
                    setIsAuthenticated(true);
                    return;

                } else if(pathRequiresAuth) {
                    toastNotify('Please log in to continue', { type: 'error' });
                    dispatch(loggedOut());
                    navigate(paths.LOGIN);
                    return;

                } else if (openPath) {
                    setIsAuthenticated(true);
                    return;

                }
            }

        } else if(!!user) {

            if(pathRequiresNoAuth) {
                if(isLoggedIn) {
                    /*
                        toastify currently not working with navigate(-1)
                         but it is working when navigating to an actual pathname.

                        set 'from: location' in navlink or link state option 
                         to enable a toastify response when redirecting back when unauthenticated.
                        
                        example: https://github.com/remix-run/react-router/blob/cec6186506f61757c51fc6c2f50cb01b554fcd4c/examples/auth/src/App.tsx#LL150C3-L150C52
                    */
                    let from = location.state?.from?.pathname || -1;
                    navigate(from);
                    toastNotify('You are already logged in.', { type: 'error' });
                    return;

                } else {
                    setIsAuthenticated(true);
                    return;

                }

            } else if(pathRequiresAuth) {
                if (isAdmin || !isLoggedIn) {
                    toastNotify('You are not authorized to perform that action.', { type: 'error' });
                    dispatch(loggedOut());
                    navigate(paths.LOGIN);
                    return;

                } else if (!isAdmin && isLoggedIn) {
                    setIsAuthenticated(true);
                    return;

                }

            } else if (openPath) {
                setIsAuthenticated(true);
                return;

            }
        }

    // });
    }, [user?.id, isAdmin, isLoggedIn, location?.pathname]);


    return ( 

        isAuthenticated
        
        &&  
        
        <div className="row">
            <Outlet />
        </div>

    );
}
