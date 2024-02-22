
import "./styles.css";
import { Container, Image } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
const ProfilePicture = (props) => {
    //Fetching the profilePicture from backend
    let alt = "profilepictureOf" + props.username
    let image; 
    if (props.picture) {
        image = <Image fluid rounded id="profilePic" src={props.picture} alt={alt}></Image>
    } else {
        image = <Icon.PersonSquare size={250} color={"gray"}></Icon.PersonSquare>
    }
    return (
        <Container id="profilePicture" className="img-container">
            {image}
        </Container>
    )
}

export default ProfilePicture; 