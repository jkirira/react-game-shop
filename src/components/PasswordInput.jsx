import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function PasswordInput({className, handleOnChange, onChange, passwordRef, ...props}) {
    const [hidePassword, setHidePassword] = useState(true);

    const onChangeFunction = (handleOnChange || onChange) ?? (() => {});

    return (
        <>
            <InputGroup className={className}>
                <Form.Control
                    onChange={(e) => onChangeFunction(e.target.value)}
                    type={ hidePassword ? "password" : "text" }
                    ref={ passwordRef }
                    { ...props }
                />
                <div className="d-flex align-items-center justify-content-center" style={{ minWidth: '50px' }}>
                    <FontAwesomeIcon className="cursor-pointer" icon={ hidePassword ? faEye : faEyeSlash } onClick={() => setHidePassword(hide => !hide)} />
                </div>
            </InputGroup>
        </>
    )

}
