import Header from '../Header/Header';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from "react";
const Profile = (props) => {
    console.log(props.user)
    console.log(props)
    const [userData, setUserData] = useState({});
    //Fetching info about logged in user: 
    useEffect(() => {
        fetch("/api/user/profile/"+props.user, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(response => response.json())
    .then(json => setUserData(json));
    }, [])
    console.log(userData)
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{props.user}</Modal.Title>
                <Modal.Body>
                    <Header type="h4" text="Register date"></Header>
                </Modal.Body>
            </Modal.Header>

        </Modal.Dialog>
    )

}

export default Profile; 