import { useRef } from "react";
import { Form, Button } from "react-bootstrap";

export default function CategoryForm({handleFormSubmit, category=null, disabled=false}) {

    const nameRef = useRef(null);
    const submitButtonRef = useRef(null);

    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(submitButtonRef.current) {
            submitButtonRef.current.disabled = true;
        }

        let form_data = {};

        form_data['name'] = nameRef.current?.value;

        handleFormSubmit(form_data);

    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" defaultValue={category?.name} required />
                </Form.Group>

                <Form.Group className="float-end mb-3" controlId="submit">
                    <Button ref={submitButtonRef} variant="primary" type="submit" disabled={disabled}>
                        Submit
                    </Button>
                </Form.Group>

            </Form>

        </>
      );
}
