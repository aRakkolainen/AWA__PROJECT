
import Modal from 'react-bootstrap/Modal';
const Profile = (props) => {
    console.log(props.user)
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{props.user}</Modal.Title>
            </Modal.Header>

        </Modal.Dialog>
    )

}

export default Profile; 