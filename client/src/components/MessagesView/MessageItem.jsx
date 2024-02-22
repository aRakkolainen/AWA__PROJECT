
//Component for showing message!
import Card from 'react-bootstrap/Card';
import {Container} from 'react-bootstrap';
import ClickableHeader from '../Header/ClickableHeader';
import Header from '../Header/Header';
import { Image } from 'react-bootstrap';
const MessageItem = (props) => {
    let sender; 
    let senderId; 
    let sendingTime; 
    let profilePic; 
    let profilePicPosition; 
    if (props.message.sender === localStorage.getItem("username")) {
        sender = "You"
        senderId = "You"
        sendingTime = "sendingTimeYou";
        profilePicPosition = "right"; 
    } else {
        sender = props.message.sender; 
        senderId = "Other";
        sendingTime = "sendingTimeOther";
        profilePic = props.recipient.picture;
        profilePicPosition = "left"; 
        
    }

    return (
        <div id={senderId}>
            <Header id={senderId} type="h4" text={sender}></Header>
            <Header type="p" text={props.message.content}></Header>
            <Header id={sendingTime} type="p" text={props.message.sendingTime}></Header>
        </div>
    )
}

export default MessageItem;