import { toast } from "react-toastify";

export function toastNotify (message, options = {}) {
    let toast_message = message;
    let toast_type = options.type;

    if(!toast_message) {
        console.error('toast error', 'Empty Message');
        return null;
    }

    if(!toast_type) {
        toast_type = 'info';
    }

    return toast(toast_message, { type: toast_type, ...options });
}
