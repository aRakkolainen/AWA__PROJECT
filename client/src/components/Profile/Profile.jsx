import Header from '../Header/Header';
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Textbox from '../Header/Textbox';
import ProfilePicture from './ProfilePicture';
import Navigation from '../Navigation/Navigation';
import "./styles.css";
const Profile = (props) => {
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    const [visible, setVisible] = useState(false);
    useEffect(()=> {
        if(username) {
            console.log("This is page of user: " + username)
            fetch("/api/user/profile/"+username, { method:"GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("auth_token"),
                }
            })
            .then(response => response.json())
            .then(json => setUserData(json.userData));
            if(userData.picture !== "") {
                setVisible(true);
            }
    }
    }, [])
    let thisProfilePic; 
    let thisUsername; 
    let thisRegisterDate; 
    let thisBio; 
    if (userData) {
        thisProfilePic = userData.picture; 
        thisUsername = userData.username; 
        thisRegisterDate = userData.registerDate; 
        thisBio = userData.bio; 
    }
    return(
        <>
        <Navigation></Navigation>
        <Container fluid id="profile">
        <Header type="h1" text="User profile"></Header>
            <Row xs={1} md={1} lg={2}>
            {visible && <Col>
                    <ProfilePicture picture={thisProfilePic} username={thisUsername}></ProfilePicture>

                
                </Col> }
                <Col>
                <Container fluid id="userInfo">
                    <Textbox headerType="h4" textType="custom" header="Username:  " text={thisUsername}></Textbox>
                    <Textbox headerType="h4" textType="custom" header="Register date:  " text={thisRegisterDate}></Textbox>
                    <Textbox headerType="h4" textType="custom" header="Bio text:  " text={thisBio}></Textbox>
                </Container>
                </Col>
            </Row>
            </Container>
        
        
        
        </>
    )

}

export default Profile; 