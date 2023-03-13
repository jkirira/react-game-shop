import { useCallback, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { signUpApi } from '../../apis/client/auth';
import { toastNotify } from '../../helpers';

function SignUp() {
    const [loading, setLoading] = useState(false);

    const handleSignUpSubmit = useCallback((formdata) => {
        setLoading(true);

        signUpApi(formdata)
            .then(response => {
                // console.log(response.data.message)
                toastNotify(response.data.message, { type: response.data.type, autoClose: false, closeOnClick: false });
            })
            .catch(error => {
                // console.log(error)
                toastNotify(error.response.data.message, { type: error.response.data.type });
            })
            .then(() => setLoading(false));
            
    }, []);

    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3>Sign Up</h3>
            </section>
            <section className="login-page_form_wrapper">
                <LoginForm type='sign_up' handleFormSubmit={handleSignUpSubmit} disabled={loading} />
            </section>
        </div>
    );
}

export default SignUp;
