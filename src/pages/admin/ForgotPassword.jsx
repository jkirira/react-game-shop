import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { forgotPasswordApi } from "../../apis/admin/auth";
import { toastNotify } from "../../helpers";

function ForgotPassword() {
    const submitButtonRef = useRef(null);
    const emailRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        submitButtonRef.current.disabled = true;

        const form_data = {};
        form_data['email'] = emailRef?.current?.value

        forgotPasswordApi(form_data)
            .then(response => {
                // console.log(response.data.message)
                toastNotify(response.data.message, { type: response.data.type, autoClose: false, closeOnClick: false });
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
                toastNotify(error.response.data.message, { type: error.response.data.type });
            });

    };


    return (
        <div className="mx-auto my-5 border border-secondary rounded py-5 px-3 p-md-5 d-flex flex-column col-10 offset-1 col-md-6 offset-md-3">
            <section className="my-3">
                <h3 className="my-3">Reset Your Password</h3>
                <p>Enter your email address and we will send you a password reset link to your email. </p>
            </section>
            <section>
                <Form className="pb-5" onSubmit={handleForgotPasswordSubmit}>
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={emailRef} required type="email" placeholder="name@example.com" />
                    </Form.Group>

                    <Button ref={submitButtonRef} className='mt-3' variant="primary" type="submit" disabled={loading}>
                        Submit
                    </Button>
                </Form>
            </section>
        </div>
    );
}

export default ForgotPassword;
