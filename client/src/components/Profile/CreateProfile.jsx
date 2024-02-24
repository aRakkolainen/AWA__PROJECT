import Header from '../Texts/Header';
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import { Container } from "react-bootstrap";
import "./styles.css";

const CreateProfile = () => {
    let username = localStorage.getItem("username");
    return(
        <Container className="create-profile">
            <Header type="h2" text="Create your profile"></Header>
            <br></br>
            <AddProfileBio username={username}></AddProfileBio>
            <AddNewPicture username={username}></AddNewPicture>
        </Container>
    )
}

export default CreateProfile; 