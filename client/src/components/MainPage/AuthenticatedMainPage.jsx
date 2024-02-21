//Navbar based on example in react bootstrap documentation: https://react-bootstrap.netlify.app/docs/components/navbar
import Header from "../Header/Header";
import ShowUsers from "./ShowUsers";
import Navigation from "../Navigation/Navigation";
import {useState, useEffect} from "react";
import CreateProfile from "../Profile/CreateProfile";
import ProfileInfo from "../Profile/ProfileInfo";
import {Container, Row, Col} from "react-bootstrap";
const AuthenticatedMainPage = () => {
    const [userData, setUserData] = useState({});
    let visible=false; 
    let loggedUser; 
    useEffect(() => {
        console.log("Fetching main page..")
        fetch("/api/main", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            }
        })
        .then(console.log("main page"))
    }, [])
    //Fetching info about user who is currently logged in
    let username = localStorage.getItem("username");
    useEffect(() => {
        fetch("/api/user/profile/"+username, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(response => response.json())
    .then(user => setUserData(user));
    }, [username])
    let profileInfo; 
    //If user is not found, then we are showing nothing: 
    if (userData.message === "User found!") {
        loggedUser = userData.userData;
         // Checking if user has logged in for the first time so they don't have the bio or profile img yet!
        // Then showing additional component for creating profile bio!
        if(!loggedUser.bio) {
            console.log("New user, create your profile first");
            profileInfo = <CreateProfile></CreateProfile>
            visible = true; 
        } else {
            profileInfo = <ProfileInfo user={loggedUser.username}></ProfileInfo>
            visible = true; 
        }
    } else {
        loggedUser = null; 
    }
    return(
        <>
        <Container fluid>
            <Navigation></Navigation>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Header type="h1" text="Welcome to New Friends Site!"></Header>
                    {profileInfo}
                    <br>
                    </br>
                    <br>
                    </br>
                    {visible && <Header type="h3" text="Would you like to be friends with this user?"></Header>}
                    {visible && <ShowUsers loggedUser={loggedUser}></ShowUsers>}
                </Col>

                <Col>
                
                </Col>
            </Row>


        </Container>
    </>
    )
}
export default AuthenticatedMainPage;