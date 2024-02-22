
import { Container } from "react-bootstrap"
import EditEmail from "./EditEmail";
import AddProfileBio from "./AddProfileBio";
import AddNewPicture from "./AddNewPicture";
import Header from "../Header/Header";
const EditProfileInfo = (props) => {
    return(
        
        <Container>
            <Header type="h1" text="Edit your profile"></Header>
            <EditEmail email={props.email}></EditEmail>
            <br></br>
            <AddProfileBio username={props.username}></AddProfileBio>
            <br></br>
            <AddNewPicture username={props.username}></AddNewPicture>


        </Container>
    )


}

export default EditProfileInfo; 