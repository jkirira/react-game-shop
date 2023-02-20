import LoginForm from "../components/LoginForm";

function ForgotPassword() {
    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3 className="my-3">Reset Your Password</h3>
                <p>Enter your email address and we will send you a password reset link to your email. </p>
            </section>
            <section>
                <LoginForm type='password_reset' />
            </section>
        </div>
    );
}

export default ForgotPassword;
