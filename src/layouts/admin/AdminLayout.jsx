import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getFromLocalStorage, toastNotifyError } from '../../helpers';
import { authUserApi } from '../../apis/admin/auth';
import { paths, requireNoAuthPaths } from '../../routes/admin/paths';
import { loggedIn, loggedOut, isLoggedInSelector } from '../../store/slices/authSlice';
import { setUser, userSelector, isAdminSelector } from '../../store/slices/userSlice';


export default function AdminLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(userSelector, shallowEqual);
    const isAdmin = useSelector(isAdminSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);


    useEffect(() => {

        let pathRequiresNoAuth = requireNoAuthPaths.includes(location.pathname);

        async function fetchAuthUser(token) {
            if(!token) {
                return false;
            }

            await authUserApi({ token: token })
                    .then(response => {
                        let user = response.data.user;
                        dispatch(setUser(user));
                        dispatch(loggedIn({
                            id: user.id,
                            token: response.data.token
                        }));
                    })
                    .catch(error => {
                        toastNotifyError(error.response.data.message);
                        dispatch(loggedOut());
                        navigate(paths.ADMIN_LOGIN, { state: { from: location } });
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

                } else {
                    toastNotifyError('Please log in to continue');
                    dispatch(loggedOut());
                    navigate(paths.ADMIN_LOGIN, { state: { from: location } });
                    return;
                }
            }
            return;

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
                    toastNotifyError('You are already logged in.');
                    navigate(from);
                } else {
                    setIsAuthenticated(true);
                }
                return;

            } else {
                if (!isAdmin || !isLoggedIn) {
                    toastNotifyError('You are not authorized to perform that action.');
                    dispatch(loggedOut());
                    navigate(paths.ADMIN_LOGIN, { state: { from: location } });
                    return;

                } else if (isAdmin && isLoggedIn) {
                    setIsAuthenticated(true);
                    return;
                }

            }
        }

    // });
    }, [user?.id, isAdmin, isLoggedIn, location?.pathname]);


    return ( 
        
        isAuthenticated 
        
        &&  
        
        <div>
            <Outlet />
        </div>

    );
}
