import { useCallback, useState } from "react";
import LoginForm from "../components/LoginForm";
import { signUpApi } from '../apis/auth';

function SignUp() {
    const [loading, setLoading] = useState(false);

    const handleSignUpSubmit = useCallback((formdata) => {
        setLoading(true);

        signUpApi(formdata)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => setLoading(false));
            
    }, []);

    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3>Sign Up</h3>
            </section>
            <section className="login-page_form_wrapper">
                <LoginForm type='sign_up' handleFormSubmit={handleSignUpSubmit} />
            </section>
        </div>
    );
}

export default SignUp;
