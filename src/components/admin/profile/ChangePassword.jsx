import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { toastNotifyError, toastNotifySuccess } from "../../../helpers";
import { authTokenSelector } from "../../../store/slices/authSlice";
import { passwordResetApi } from "../../../apis/admin/auth";
import PasswordInput from "../../PasswordInput";

const passwordRegex = new RegExp(/^[a-z0-9]+$/i);

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const token = useSelector(authTokenSelector);
    const submitButtonRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        submitButtonRef.current.disabled = true;
        
        if(!isValidPassword() || !isValidPasswordConfirmation()) {
            submitButtonRef.current.disabled = false;
            return false;
        }

        passwordResetApi({ token: token, password: password })
            .then(response => {
                toastNotifySuccess(response.data.message);
                setPassword('');
                setPasswordConfirmation('');
            })
            .catch(error => {
                toastNotifyError(error.response.data.message);
                submitButtonRef.current.disabled = false;
            });

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
        <>
            <section className="mb-4">
                <h3>Change Password</h3>
            </section>
            <section>
                <div className="col-md-8">
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
                                    <Form.Text className="my-2" id="loginPasswordInputHelpBlock" muted>
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

                        <Form.Group className="d-flex justify-content-end mb-3" controlId="submitButtonInput">
                            <Button ref={submitButtonRef} className='mt-3' variant="primary" type="submit" disabled={!password || !passwordConfirmation}>
                                Change
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </section>
        </>
    )

}
