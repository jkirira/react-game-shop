import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PasswordInput from "../../components/PasswordInput";

import { toastNotify } from "../../helpers";
import { passwordResetApi, confirmPasswordResetApi } from "../../apis/client/auth";

import { paths } from "../../routes/client/paths";


const passwordRegex = new RegExp(/^[a-z0-9]+$/i);

export default function ResetPassword() {
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    let password_reset_token = searchParams.get('token');

    useEffect(() => {
        confirmPasswordResetApi({token: password_reset_token})
                .then(response => {
                    // console.log(response.data)
                    toastNotify(response.data.message, { type: response.data.type, toastId: 'password-reset-api-success' });
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.log(error);
                    navigate(paths.LOGIN);
                    toastNotify(error.response.data.message, { type: error.response.data.type, toastId: 'password-reset-api-failure' });
                })
    }, [password_reset_token]);


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        submitButtonRef.current.disabled = true;

        const form_data = {};

        if(!isValidPassword() || !isValidPasswordConfirmation()) {
            toastNotify('Invalid password.', {type: error});
            submitButtonRef.current.disabled = false;
            return false;
        }

        form_data['token'] = password_reset_token;
        form_data['password'] = password;
        // form_data['password_confirmation'] = passwordConfirmation
        
        passwordResetApi(form_data)
            .then(response => {
                // console.log(response.body)
                navigate(paths.LOGIN);
                toastNotify(response.data.message, { type: response.data.type });
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
            <section className="mt-3">
                <h3>Reset Your Password</h3>
                <p>Enter your new password.</p>
            </section>

            <section>
                <Form onSubmit={handleSubmit}>
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

                    <Button ref={submitButtonRef} className='my-5' variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>

            </section>
        </div>
    );
}
