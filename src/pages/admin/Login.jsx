import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PasswordInput from "../../components/PasswordInput";

import { loginApi } from "../../apis/admin/auth";
import { toastNotify } from "../../helpers";
import { setUser } from "../../store/slices/userSlice";
import { loggedIn } from "../../store/slices/authSlice";

import { paths } from "../../routes/admin/paths";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const submitButtonRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        submitButtonRef.current.disabled = true;
        setLoading(true);

        const form_data = {};
        form_data['username'] = usernameRef?.current?.value;
        form_data['password'] = passwordRef?.current?.value;

        loginApi(form_data)
            .then(response => {
                let data = response.data;
                toastNotify(data.message, { type: data.type });
                dispatch(setUser(data['user']));
                dispatch(loggedIn({
                    token: data['token'],
                    id: data['user'] ? data['user']['id'] : null,
                }));

                let navigateTo = location.state?.from?.pathname || paths.ADMIN_HOME;
                navigate(navigateTo);
            })
            .catch(error => {
                console.log(error);
                toastNotify(error.response.data.message, { type: error.response.data.type });
            })
            .then(() => {
                if (submitButtonRef.current){
                    submitButtonRef.current.disabled = false;
                }
                setLoading(false);
            });
            
    };

    return (
        <div className="mx-auto my-5 border border-secondary rounded py-5 px-3 p-md-5 d-flex flex-column col-10 offset-1 col-md-6 offset-md-3">
            <section className="my-3">
                <h3>Admin Login</h3>
            </section>
            <section>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="usernameInput">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={usernameRef} type="text" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="loginPasswordInput">Password</Form.Label>
                        <PasswordInput passwordRef={passwordRef} required />
                    </Form.Group>

                    <Button ref={submitButtonRef} className='mt-3' variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>

            </section>
        </div>
    );
}

export default Login;
