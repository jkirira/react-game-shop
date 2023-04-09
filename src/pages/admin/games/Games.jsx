import { useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { paths } from "../../../routes/admin/paths.js";
import { gamesSelector } from "../../../store/slices/gamesSlice.js";
import DeleteGameModal from "../../../components/admin/games/DeleteGameModal.jsx";

export default function Games() {
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();
    const games = useSelector(gamesSelector);
        

    const redirectToEdit = (game_id, e) => {
        e.stopPropagation();
        navigate(generatePath(paths.ADMIN_GAMES_EDIT, {gameId: game_id}));
    }

    const openDeleteModal = useCallback((game_id, e) => {
        setSelectedGameId(game_id);
        setShowDeleteModal(true);
        e.stopPropagation();
    }, []);

    const closeDeleteModal = useCallback(() => {
        setShowDeleteModal(false);
        setSelectedGameId(null);
    }, []);

    return (
        <div>
            
            <section className="d-flex justify-content-end">
                <Link to={paths.ADMIN_GAMES_CREATE}>
                    Add Game
                </Link>
            </section>

            <section>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Developed by</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        games.map(game => (
                                <tr onClick={() => navigate(generatePath(paths.ADMIN_GAMES_VIEW, {gameId: game.id}))}
                                    key={ game.id }
                                    className="cursor-pointer"
                                >
                                    <td>{ game.id }</td>
                                    <td>{ game.name }</td>
                                    <td>{ game.description }</td>
                                    <td>{ game.Category?.name }</td>
                                    <td>{ game.quantity }</td>
                                    <td>{ game.price }</td>
                                    <td>{ game.rating }</td>
                                    <td>{ game.developed_by }</td>
                                    <td>
                                        <FontAwesomeIcon className="text-primary me-3 cursor-pointer" icon={faPenToSquare} onClick={(e) => redirectToEdit(game.id, e)} />
                                        <FontAwesomeIcon className="text-primary me-3 cursor-pointer" icon={faTrashCan} onClick={(e) => openDeleteModal(game.id, e)} />
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
            </section>

            <DeleteGameModal showModal={showDeleteModal} closeModal={closeDeleteModal} gameId={selectedGameId} />

        </div>
      );
}
