import LoginForm from "../components/LoginForm";

function SignUp() {
    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3>Sign Up</h3>
            </section>
            <section className="login-page_form_wrapper">
                <LoginForm type='sign_up' />
            </section>
        </div>
    );
}

export default SignUp;
