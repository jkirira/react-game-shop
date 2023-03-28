import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGameApi } from "../../../apis/admin/games";
import GameForm from "../../../components/admin/games/GameForm";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";
import { paths } from "../../../routes/admin/paths";
import { addGame } from "../../../store/slices/gamesSlice";

export default function AddGame() {
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (form_data) => {
        setLoading(true);

        addGameApi(form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
                dispatch(addGame(response.data.game));
                setFormKey(key => key += 1);
                navigate(paths.ADMIN_GAMES);
            })
            .catch(error => {
                console.log(error);
                toastNotifyError(error.response.data.message);
            })
            .then(() => {
                setLoading(false);
            });

    }

    return (
        <div className="p-3">
            <section>
                <h2>Add Game</h2>
            </section>

            <section className="my-4">
                <GameForm key={formKey} handleFormSubmit={handleSubmit} disabled={loading} />
            </section>

        </div>
    );
}
