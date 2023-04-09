import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { generatePath, Link, useParams } from "react-router-dom";
import { parseISO, format } from "date-fns";

import { getGameApi } from "../../../apis/admin/games";
import DeleteGameModal from "../../../components/admin/games/DeleteGameModal";
import { toastNotifyError } from "../../../helpers";
import { paths } from "../../../routes/admin/paths";
import { gamesSelectorById } from "../../../store/slices/gamesSlice";

export default function ViewGame() {
    const [game, setGame] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    let { gameId } = useParams();
    
    let gameInState = useSelector(state => gamesSelectorById(state, gameId), shallowEqual);

    useEffect(() => {

        if(!!gameInState) {
            setGame(gameInState);

        } else {
            getGameApi(gameId)
                .then(response => {
                    setGame(response.data.game);
                })
                .catch(error => {
                    toastNotifyError(error.response.data.message);
                })
        }

    }, [])


    const closeDeleteModal = useCallback(() => {
        setShowDeleteModal(false);
    }, []);


    return (
        !!game
        
        &&
        
        <div>

            <section>
                <div className="pt-3 pb-5 px-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h4 className="fw-bold">{game.name}</h4>
                        <div className="col-md-8 ">
                            <p><strong>Name: </strong>{game.name}</p>
                            <p className="pb-1 mb-1"><strong>Description: </strong></p>
                            <p>{game.description}</p>
                            <br />
                            <p><strong>Category: </strong>{game.Category?.name}</p>
                            <p><strong>Release date: </strong>{game.release_date ? format(parseISO(game.release_date), 'yyyy-MM-dd') : ""}</p>
                            <p><strong>Trailer link: </strong>{game.trailer_link}</p>
                            <p><strong>Rating: </strong>{game.rating}</p>
                            <p><strong>Price: </strong>{game.price}</p>
                            <p><strong>Quantity: </strong>{game.quantity}</p>
                            <p><strong>Developed by: </strong>{game.developed_by}</p>
                            <p><strong>Poster: </strong>{game.poster}</p>
                        </div>
                        <Link className="btn btn-primary btn-lg my-3 me-3" to={generatePath(paths.ADMIN_GAMES_EDIT, {gameId: game.id})}>
                            Edit
                        </Link>
                        <button className="btn btn-danger btn-lg my-3 me-3" type="button" onClick={() => setShowDeleteModal(true)}>Delete</button>
                    </div>
                </div>
            </section>

            <DeleteGameModal showModal={showDeleteModal} closeModal={closeDeleteModal} gameId={game.id} />

        </div>
        
    );
}
