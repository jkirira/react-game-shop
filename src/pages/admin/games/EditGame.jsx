import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editGameApi } from "../../../apis/admin/games";
import GameForm from "../../../components/admin/games/GameForm";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";
import { editGame, gamesSelectorById } from "../../../store/slices/gamesSlice";

export default function EditGame() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    let { gameId } = useParams();

    const game = useSelector(state => gamesSelectorById(state, gameId), shallowEqual);

    const handleSubmit = (form_data) => {
        setLoading(true);

        editGameApi(gameId, form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
                dispatch(editGame({id: game?.id, data: form_data}));
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
        <div>
            <section>
                <h2>Edit Game</h2>
            </section>

            <section>
                <GameForm game={game} handleFormSubmit={handleSubmit} disabled={loading} />
            </section>

        </div>
    );
}
