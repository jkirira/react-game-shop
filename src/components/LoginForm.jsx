import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function LoginForm({type, handleFormSubmit, disabled}) {

    const navigate = useNavigate();
    const submitButtonRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);

    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        submitButtonRef.current.disabled = true;

        const form_data = {};

        if(type=='login') {
            form_data['username'] = usernameRef?.current?.value
            form_data['password'] = password
        }

        if(type=='password_reset' || type=='sign_up') {
            form_data['email'] = emailRef?.current?.value
        }

        handleFormSubmit(form_data);

    }


    const isValidPassword = () => {
        
        if(password.length < 8) {
            return false;
        }

        return passwordRegex.test(password);

    }


    return (
        <>
            <Form onSubmit={handleSubmit}>

                {
                    (type=='login')

                    &&

                    <>
                        <Form.Group className="mb-3" controlId="usernameInput">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={usernameRef} required type="username" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="loginPasswordInput">Password</Form.Label>
                            <Form.Control
                                id="loginPasswordInput" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isValid={isValidPassword()} 
                                isInvalid={!isValidPassword()} 
                                type="password" 
                                aria-describedby="loginPasswordInputHelpBlock"
                                required 
                            />
                            <Form.Text id="loginPasswordInputHelpBlock" muted>
                                Your password must be at least 8 characters long, contain letters or numbers, and must not contain spaces, special characters, or emoji.
                            </Form.Text>
                            
                            { password && <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback> }

                        </Form.Group>
                    </>
                }


                {
                    (type=='password_reset' || type=='sign_up')
                    
                    &&
                    
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={emailRef} required type="email" placeholder="name@example.com" />
                    </Form.Group>
                }

                
                <Button ref={submitButtonRef} className='mt-3' variant="primary" type="submit" disabled={disabled}>
                    Submit
                </Button>

            </Form>

            <section className='my-5'>
                { (type!=='login') && <p>Already have an account? <u className='cursor-pointer' onClick={() => navigate('/login')}>Login</u></p>}
                { (type!=='sign_up') && <p>Don't have an account? <u className='cursor-pointer' onClick={() => navigate('/sign-up')}>Sign Up</u></p>}
                { (type!=='password_reset') && <p>Forgot your password? <u className='cursor-pointer' onClick={() => navigate('/forgot-password')}>Reset Password</u></p>}
            </section>
        </>
    );
}

LoginForm.defaultProps = {
    type: 'login',
    handleFormSubmit: () => {},
    disabled: false,
}

LoginForm.propTypes = {
    type: PropTypes.string,
    handleFormSubmit: PropTypes.func,
    disabled: PropTypes.bool,
}

export default LoginForm;
