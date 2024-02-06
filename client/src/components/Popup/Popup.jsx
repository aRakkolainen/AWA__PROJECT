import Toast from 'react-bootstrap/Toast';
import {toast} from "react-toastify";
// Component for showing toast messages!
//Based on Bootstrap 5 documentation: https://react-bootstrap.netlify.app/docs/components/toasts/#toast
// Based on this: https://www.geeksforgeeks.org/reactjs-toast-notification/
import {useState} from 'react';

//toast.configure();
const Popup = (props) => {
    //popup is given text as props
    const [showPopup, setPopup] = useState(true);
    const togglePopup = () => setPopup(!showPopup);
    const showInfo = () => {
        toast(props.message);
    }

    return (
        <Toast show={showInfo} onClose={togglePopup} autohide>
            <Toast.Body>
                {props.message}
            </Toast.Body>

        </Toast>
    )


}

export default Popup;