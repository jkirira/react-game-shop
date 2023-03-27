import { memo, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { editCategoryApi } from "../../../apis/admin/categories";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";
import { categoriesSelectorById } from "../../../store/slices/categoriesSlice";

function EditCategoryModal({ showModal, closeModal, categoryId }) {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(null);
    const nameRef = useRef(null);
    const category = useSelector(state => categoriesSelectorById(state, categoryId), shallowEqual);


    const handleEditCategory = () => {
        setLoading(true);

        let form_data = {};
        form_data['name'] = nameRef.current?.value;

        editCategoryApi(categoryId, form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
                closeModal();
                navigate(0);
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
        <Modal 
            size="lg"
            show={showModal}
            onHide={() => closeModal()}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" defaultValue={category?.name} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <Button disabled={loading} variant="primary" onClick={() => handleEditCategory()}>Edit</Button>
            </Modal.Footer>
        </Modal>
      );
}

export default memo(EditCategoryModal);
