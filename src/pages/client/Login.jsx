import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/client/auth";
import LoginForm from "../../components/LoginForm";
import { toastNotify } from "../../helpers";
import { setUser } from "../../store/slices/userSlice";
import { loggedIn } from "../../store/slices/authSlice";

import { paths } from "../../routes/client/paths";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = useCallback((formdata) => {
        setLoading(true);

        loginApi(formdata)
            .then(response => {
                // console.log(response)
                let data = response.data;
                toastNotify(data.message, { type: data.type });
                dispatch(setUser(data['user']));
                dispatch(loggedIn({
                    token: data['token'],
                    id: data['user'] ? data['user']['id'] : null,
                }));
                navigate(paths.HOME);
            })
            .catch(error => {
                console.log(error)
                toastNotify(error.response.data.message, { type: error.response.data.type });
            })
            .then(() => setLoading(false));
            
    }, []);

    return (
        <div className="mx-auto my-5 border border-secondary rounded py-5 px-3 p-md-5 d-flex flex-column col-10 offset-1 col-md-6 offset-md-3">
            <section className="my-3">
                <h3>Login</h3>
            </section>
            <section>
                <LoginForm type='login' handleFormSubmit={handleLoginSubmit} disabled={loading} />
            </section>
        </div>
    );
}

export default Login;
