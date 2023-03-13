import { useCallback, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { forgotPasswordApi } from "../../apis/client/auth";
import { toastNotify } from "../../helpers";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const handleForgotPasswordSubmit = useCallback((formdata) => {
        setLoading(true);

        forgotPasswordApi(formdata)
            .then(response => {
                // console.log(response.data.message)
                toastNotify(response.data.message, { type: response.data.type, autoClose: false, closeOnClick: false });
            })
            .catch(error => {
                console.log(error)
                toastNotify(error.response.data.message, { type: error.response.data.type });
            })
            .then(() => setLoading(false));
            
    }, []);
    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3 className="my-3">Reset Your Password</h3>
                <p>Enter your email address and we will send you a password reset link to your email. </p>
            </section>
            <section>
                <LoginForm type='password_reset' handleFormSubmit={handleForgotPasswordSubmit} disabled={loading} />
            </section>
        </div>
    );
}

export default ForgotPassword;
