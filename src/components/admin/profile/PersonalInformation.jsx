import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; 
import { editUser, userSelector } from "../../../store/slices/userSlice";
import { toastNotifyError, toastNotifySuccess } from "../../../helpers";
import { updateProfileApi } from "../../../apis/admin/profile";

export default function PersonalInformation() {
    const [editing, setEditing] = useState(false);

    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const genderRef = useRef(null);
    const emailRef = useRef(null);
    const physicalAddressRef = useRef(null);
    const submitButtonRef = useRef(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();

        submitButtonRef.current.disabled = true;

        let form_data = {};

        form_data['first_name'] = firstNameRef.current?.value;
        form_data['last_name'] = lastNameRef.current?.value;
        form_data['phone_number'] = phoneNumberRef.current?.value;
        form_data['gender'] = genderRef.current?.value;
        form_data['email'] = emailRef.current?.value;
        form_data['physical_address'] = physicalAddressRef.current?.value;

        updateProfileApi(user.id, form_data)
            .then(response => {
                dispatch(editUser(form_data));
                setEditing(false);
                toastNotifySuccess(response.data.message);
            })
            .catch(error => {
                toastNotifyError(error.response.data.message);
                submitButtonRef.current.disabled = false;
            });
    }

    return (
        <>
            <section className="mb-4">
                <h3>Personal Information</h3>
            </section>
            <section className="col-md-8">
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setEditing(editing => !editing)} 
                            size="sm"
                            variant={ editing ? 'danger' : 'primary' }
                    >
                        { editing ? 'Cancel' : 'Edit' }
                    </Button>
                </div>

                {
                    editing 
                    
                    ?

                    (
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2" controlId="usernameInput">
                                    <Form.Label className="fw-bold">Username</Form.Label>
                                    <Form.Control className="mt-0" plaintext readOnly defaultValue={user.username} type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="firstNameInput">
                                    <Form.Label className="fw-bold">First Name</Form.Label>
                                    <Form.Control className="mt-0" ref={firstNameRef} defaultValue={user.first_name} type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastNameInput">
                                    <Form.Label className="fw-bold">Last Name</Form.Label>
                                    <Form.Control className="mt-0" ref={lastNameRef} defaultValue={user.last_name} type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailInput">
                                    <Form.Label className="fw-bold">Email</Form.Label>
                                    <Form.Control className="mt-0" ref={emailRef} defaultValue={user.email} type="email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phoneNumberInput">
                                    <Form.Label className="fw-bold">Phone Number</Form.Label>
                                    <Form.Control className="mt-0" ref={phoneNumberRef} defaultValue={user.phone_number} min={0} type="number" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="genderInput">
                                    <Form.Label className="fw-bold">Gender</Form.Label>
                                    <Form.Select ref={genderRef} defaultValue={user.gender}>
                                        <option value="">Select an option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="physicalAddressInput">
                                    <Form.Label className="fw-bold">Physical Address</Form.Label>
                                    <Form.Control className="mt-0" ref={physicalAddressRef} defaultValue={user.physical_address} as="textarea" rows={3} />
                                </Form.Group>
                                
                                <Form.Group className="d-flex justify-content-end mb-3" controlId="submitButtonInput">
                                    <Button ref={submitButtonRef} className='ms-auto mt-3' variant="primary" type="submit" size="md" >
                                        Save
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    )

                    :
                                    
                    (
                        <div>
                            <span>
                                <p className="fw-bold mb-1">Username</p>
                                <p>{ user.username ?? <br /> }</p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">First Name</p>
                                <p>{ user.first_name ?? <br /> }</p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">Last Name</p>
                                <p>{ user.last_name ?? <br /> }</p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">Phone Number</p>
                                <p>{ user.phone_number ?? <br /> }</p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">Gender</p>
                                <p style={{ textTransform: 'capitalize' }}>
                                    { user.gender ?? <br /> }
                                </p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">Email</p>
                                <p>{ user.email ?? <br /> }</p>
                            </span>
                            <span>
                                <p className="fw-bold mb-1">Physical Address</p>
                                <p>{ user.physical_address ?? <br /> }</p>
                            </span>
                        </div>
                    )

                }
            </section>
        </>
    )

}
