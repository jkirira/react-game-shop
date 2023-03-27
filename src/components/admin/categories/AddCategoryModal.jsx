import { memo, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addCategoryApi } from "../../../apis/admin/categories";
import { toastNotifySuccess, toastNotifyError } from "../../../helpers";
import { addCategory } from "../../../store/slices/categoriesSlice";

function AddCategoryModal({ showModal, closeModal }) {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const nameRef = useRef(null);


    const handleAddCategory = () => {
        setLoading(true);

        let form_data = {};
        form_data['name'] = nameRef.current?.value;

        addCategoryApi(form_data)
            .then(response => {
                toastNotifySuccess(response.data.message);
                dispatch(addCategory(response.data.category));
                if(nameRef.current) {
                    nameRef.current.value = '';
                }
                closeModal();
            })
            .catch(error => {
                console.log(error);
                toastNotifyError(error.response.data.message);
                setLoading(false);

            })
    }

    const handleCloseModal = () => {
        if(nameRef.current) {
            nameRef.current.value = '';
        }
        
        closeModal();
        
    }


    return (
        <Modal 
            size="lg"
            show={showModal}
            onHide={handleCloseModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                <Button disabled={loading} variant="primary" onClick={() => handleAddCategory()}>Add</Button>
            </Modal.Footer>
        </Modal>
      );
}

export default memo(AddCategoryModal);
