import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import PasswordInput from "../../components/PasswordInput";

import { toastNotify } from "../../helpers";
import { completeRegistrationApi, emailConfirmationApi } from "../../apis/client/auth";
import { loggedIn } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";

import { paths } from "../../routes/client/paths";

const passwordRegex = new RegExp(/^[a-z0-9]+$/i);

export default function ConfirmEmail() {
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const dispatch = useDispatch();
    
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    let email_confirmation_token = searchParams.get('token');

    useEffect(() => {
        emailConfirmationApi({token: email_confirmation_token})
                .then(response => {
                    // console.log(response.data)
                    if(emailRef.current) {
                        emailRef.current.value = response.data.data.email
                    }
                    toastNotify(response.data.message, { type: response.data.type, toastId: 'email-confirmation-api-success' });
                })
                .catch(error => {
                    console.log(error.response.data)
                    navigate(paths.LOGIN);
                    toastNotify(error.response.data.message, { type: error.response.data.type, toastId: 'email-confirmation-api-failure'  });
                })
    }, [email_confirmation_token]);


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        submitButtonRef.current.disabled = true;

        const form_data = {};

        if(!isValidPassword() || !isValidPasswordConfirmation()) {
            submitButtonRef.current.disabled = false;
            return false;
        }

        form_data['username'] = usernameRef?.current?.value
        form_data['password'] = password
        form_data['email'] = emailRef?.current?.value

        
        completeRegistrationApi(form_data)
            .then(response => {
                // console.log(response.body)
                let data = response.data;
                dispatch(setUser(data['user']));
                dispatch(loggedIn({
                    token: data['token'],
                    id: data['user'] ? data['user']['id'] : null,
                }));
                navigate(paths.HOME);
                toastNotify(data.message, { type: data.type });
            })
            .catch(error => {
                console.log(error)
                toastNotify(error.response.data.message, { type: error.response.data.type });
                submitButtonRef.current.disabled = false;
            })

    }


    const isValidPassword = () => {

        if(password.length < 8) {
            return false;
        }

        return passwordRegex.test(password);

    }


    const isValidPasswordConfirmation = () => {
        return password === passwordConfirmation;
    }

    

    return (
        <div className="mx-auto my-5 border border-secondary rounded py-5 px-3 p-md-5 d-flex flex-column col-10 offset-1 col-md-6 offset-md-3">
            <section className="my-3">
                <h3>Complete Your Registration</h3>
            </section>

            <section>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="usernameInput">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={usernameRef} required type="username" placeholder="" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={emailRef} disabled required type="email" placeholder="name@example.com" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="loginPasswordInput">Password</Form.Label>
                        <PasswordInput
                            id="loginPasswordInput" 
                            value={password}
                            handleOnChange={(input) => setPassword(input)}
                            isValid={password && isValidPassword()} 
                            isInvalid={password && !isValidPassword()} 
                            aria-describedby="loginPasswordInputHelpBlock"
                            required 
                        />
                        { 
                            password 
                            
                            && 

                            <>
                                <Form.Text id="loginPasswordInputHelpBlock" muted>
                                    Your password must be at least 8 characters long, contain letters or numbers, and must not contain spaces, special characters, or emoji.
                                </Form.Text>
                                
                                <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                            </>
                        }

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="loginPasswordConfirmation">Confirm Password</Form.Label>
                        <PasswordInput
                            id="loginPasswordConfirmation" 
                            value={passwordConfirmation}
                            handleOnChange={(input) => setPasswordConfirmation(input)}
                            isValid={password && passwordConfirmation && (password === passwordConfirmation)}
                            isInvalid={password && passwordConfirmation && (password !== passwordConfirmation)}
                            disabled={!password}
                            aria-describedby="loginPasswordConfirmationHelpBlock" 
                            required 
                        />
                        { 
                            password 
                            
                            && 

                            <>
                                <Form.Text id="loginPasswordConfirmationHelpBlock" muted>
                                    Please confirm your password.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match.
                                </Form.Control.Feedback>
                            </>
                        }

                    </Form.Group>

                    <Button ref={submitButtonRef} className='mt-3' variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>

            </section>
        </div>
    );
}
