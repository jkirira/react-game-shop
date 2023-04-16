import { memo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { deleteCategoriesApi } from "../../../apis/admin/categories.js";
import { categoriesSelectorById, removeCategory } from "../../../store/slices/categoriesSlice.js";
import { toastNotifyError, toastNotifySuccess } from "../../../helpers.js";

function DeleteCategoryModal({ showModal, closeModal, categoryId }) {
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();
    const category = useSelector(state => categoriesSelectorById(state, categoryId), shallowEqual);


    const handleDeleteCategory = () => {
        setloading(true);

        deleteCategoriesApi(category?.id)
            .then(response => {
                dispatch(removeCategory(category?.id));
                closeModal();
                toastNotifySuccess(response.data.message);
            })
            .catch(error => {
                console.log(error);
                toastNotifyError('Something went wrong. Could not fetch categories.');
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
                    Delete Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete category { category?.name } ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <Button disabled={loading} variant="danger" onClick={() => handleDeleteCategory()}>Delete</Button>
            </Modal.Footer>
        </Modal>
      );
}

export default memo(DeleteCategoryModal);
