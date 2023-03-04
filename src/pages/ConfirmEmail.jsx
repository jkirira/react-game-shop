import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { emailConfirmationApi } from "../apis/auth";

export default function ConfirmEmail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    let email_confirmation_token = searchParams.get('token');

    useEffect(() => {
        emailConfirmationApi({token: email_confirmation_token})
                .then(response => {
                    console.log(response.body)
                    navigate('/');
                })
                .catch(error => {
                    console.log(error.response.body)
                    navigate('/login');
                })
    }, [])
    

    return true;
}
