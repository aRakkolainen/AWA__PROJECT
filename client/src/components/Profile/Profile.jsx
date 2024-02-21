import Header from '../Header/Header';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from "react";
const Profile = (props) => {
    let username; 
    let registerDate; 
    let bio; 
    //Fetching info about logged in user: 
    if (props.user) {
        username = props.user.username; 
        registerDate = props.user.registerDate;
        bio = props.user.bio; 
    }
    

    
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Header type="h4" text="Register date:"></Header>
                <Header type="p" text={registerDate}></Header>
                <Header type="h3" text="Bio:"></Header>
                <Header type="p" text={bio}></Header>
            </Modal.Body>
            

        </Modal.Dialog>
    )

}

export default Profile; 