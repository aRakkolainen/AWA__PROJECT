import Navigation from "../Navigation/Navigation";
import {useState, useEffect} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import UserProfile from "./UserProfile";
import "./styles.css";
import EditProfileInfo from "./EditProfileInfo";

const EditProfile = function () {
    let username = localStorage.getItem("username");
    const [userData, setUserData] = useState({});
    //Fetching info about logged in user: 
    useEffect(() => {
        fetch("/api/user/profile/"+username, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(response => response.json())
    .then(json => setUserData(json.userData));
    }, [username])
    return (
        <>
        <Navigation></Navigation>
        <Row xs={1} md={1} lg={1}>
        <Col>
            <UserProfile user={userData}></UserProfile>    
        </Col>
        <Col>
            <EditProfileInfo username={username} email={userData.email}></EditProfileInfo>
        </Col>

        </Row>
        </>
    )
}

export default EditProfile;