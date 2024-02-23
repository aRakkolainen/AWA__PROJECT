import Header from "../Texts/Header";
import Textbox from "../Texts/Textbox";
import ProfilePicture from "./ProfilePicture";
import "./styles.css";

import { Container, Row, Col } from "react-bootstrap";
//Page for showing user profile
const UserProfile = (props) => {
    return(
        <>
        <Header type="h1" text="Your information"></Header>
        <Container fluid>
            <Row xs={1} md={1} lg={2}>
                <Col md={8}>
                    <ProfilePicture picture={props.user.picture} username={props.user.username}></ProfilePicture>
                </Col>

                <Col>
                <Container fluid id="userInfo">
                    <Textbox headerType="h4" textType="custom" header="Email:  " text={props.user.email}></Textbox>
                    <Textbox headerType="h4" textType="custom" header="Username:  " text={props.user.username}></Textbox>
                    <Textbox headerType="h4" textType="custom" header="Register date:  " text={props.user.registerDate}></Textbox>
                    <Textbox headerType="h4" textType="custom" header="Bio text:  " text={props.user.bio}></Textbox>
                </Container>
                </Col>
            </Row>
        </Container>    
        </>

    )
}

export default UserProfile; 