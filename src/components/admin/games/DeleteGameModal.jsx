import { memo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { deleteGameApi } from "../../../apis/admin/games.js";
import { toastNotifyError, toastNotifySuccess } from "../../../helpers.js";
import { gamesSelectorById, removeGame } from "../../../store/slices/gamesSlice.js";

function DeleteGameModal({ showModal, closeModal, gameId }) {
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();
    const game = useSelector(state => gamesSelectorById(state, gameId), shallowEqual);


    const handleDeleteGame = () => {
        setloading(true);

        deleteGameApi(game?.id)
            .then(response => {
                dispatch(removeGame(game?.id));
                closeModal();
                toastNotifySuccess(response.data.message);
            })
            .catch(error => {
                console.log(error);
                toastNotifyError(error.response.data.message);
            })
            .then(response => {
                setloading(false);
            })

    }


    return (
        <Modal 
            size="lg"
            show={showModal}
            onHide={() => closeModal()}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Game
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete game { game?.name } ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <Button disabled={loading} variant="primary" onClick={() => handleDeleteGame()}>Delete</Button>
            </Modal.Footer>
        </Modal>
      );
}

export default memo(DeleteGameModal);
