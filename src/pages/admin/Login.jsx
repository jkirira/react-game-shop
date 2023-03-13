import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import { loginApi } from "../../apis/admin/auth";
import { toastNotify } from "../../helpers";
import { setUser } from "../../store/slices/userSlice";
import { loggedIn } from "../../store/slices/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                // console.log(response)
                let data = response.data;
                toastNotify(data.message, { type: data.type });
                dispatch(setUser(data['user']));
                dispatch(loggedIn({
                    token: data['token'],
                    id: data['user'] ? data['user']['id'] : null,
                }));
                navigate('/admin');
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
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
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
                        <Form.Control ref={passwordRef} type="password" required />
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
