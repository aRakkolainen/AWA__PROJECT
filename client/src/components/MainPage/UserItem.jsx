import Card from 'react-bootstrap/Card';
import ClickableHeader from '../Texts/ClickableHeader';
import * as Icon from 'react-bootstrap-icons';
import Header from '../Texts/Header';
import "./styles.css";
const UserItem = (props) => {
    const openProfile = (username) => {
        if (username) {
            console.log("Open profile page..")
            window.location.replace("/profile/"+username);
        }
    }

    return(
        <>
        <Card style={{width: '20rem'}}>
            <Card.Img src={props.user.picture}>
            </Card.Img>
            <Card.Body>
                <Card.Title>
                    <ClickableHeader type="h3" text={props.user.username} handleClick={() => openProfile(props.user.username)}></ClickableHeader>
                </Card.Title>
                <Card.Text>
                    <Header type="biotext" text={props.user.bio}></Header>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Icon.HandThumbsDownFill size={100} color={"red"}onClick={props.dislike}></Icon.HandThumbsDownFill>
                <Icon.HandThumbsUpFill size={100} color={"green"}onClick={() => {props.like(props.username)}}></Icon.HandThumbsUpFill>
            </Card.Footer>
        </Card>
        </>

    )
}
export default UserItem; 