import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { paths } from '../../routes/client/paths';
import { userSelector } from '../../store/slices/userSlice';
import { isLoggedInSelector } from '../../store/slices/authSlice';
import "../../assets/scss/navbar.scss"

export default function Navbar() {
    const [showDropdownNav, setShowDropdownNav] = useState(false)

    const location = useLocation();
    const user = useSelector(userSelector, shallowEqual);
    const isLoggedIn = useSelector(isLoggedInSelector);

    return (
        <div className="row d-flex align-items-center bg-dark mw-100 m-0 position-relative" style={{ minHeight: "10vh" }}>

            <div className="col-9 col-md-3 offset-md-1">
                <h2>
                    <Link className="text-decoration-none text-white" to={paths.HOME}>Game Shop</Link>
                </h2>
            </div>

            <div className="col-3 col-md-8">
            
                <div className="d-flex d-md-none align-items-center justify-content-center">
                    <FontAwesomeIcon className="cursor-pointer text-white" icon={faBars} onClick={() => setShowDropdownNav(show => !show)} />
                </div>

                <div className="nav-bar" data-toggle-menu={showDropdownNav ? "show" : "hide"}>

                    <div className="nav-list-wrapper leading-separator">
                        <ul className="nav-list">
                            <NavLink className="nav-list-item" to={paths.HOME}>
                                <li>Home</li>
                            </NavLink>
                            <NavLink className="nav-list-item" to={paths.HOME}>
                                <li>Home</li>
                            </NavLink>
                        </ul>
                    </div>

                    <div className="nav-list-wrapper leading-separator">
                
                    {
                        isLoggedIn

                        ?

                        <Dropdown className="d-inline m-0 w-100">
                            <Dropdown.Toggle id="dropdown-user"
                                            className="d-flex align-items-center justify-content-center p-4 w-100"
                                            variant="tertiary"
                            >
                                <FontAwesomeIcon className="fs-2 text-white me-2" icon={faCircleUser} />
                                <h1 className="h6 mb-0 text-white lh-1">{ user?.username }</h1>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="rounded-0">
                                <Dropdown.Item className="d-flex align-items-center justify-content-center py-2" href="#">Profile</Dropdown.Item>
                                <Dropdown.Item className="d-flex align-items-center justify-content-center py-2 text-danger" href="#">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        :

                        <ul className="nav-list">
                            { (location.pathname !== paths.LOGIN) && <Link className="nav-list-item" to={paths.LOGIN}>
                                                                        <li>Login</li>
                                                                    </Link>
                            }
                            { (location.pathname !== paths.SIGN_UP) &&  <Link className="nav-list-item" to={paths.SIGN_UP}>
                                                                            <li>Sign Up</li>
                                                                        </Link>
                            }
                        </ul>
                    }

                    </div>
                </div>

            </div>

        </div>
    );
}
