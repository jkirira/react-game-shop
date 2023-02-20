import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div className="mx-auto my-5 border border-secondary rounded p-5 d-flex flex-column w-50">
            <section className="my-3">
                <h3>Login</h3>
            </section>
            <section>
                <LoginForm type='login' />
            </section>
        </div>
    );
}

export default Login;
