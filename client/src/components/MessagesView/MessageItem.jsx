
//Component for showing message!
//styling image in chat is based on this tutorial: https://www.w3schools.com/howto/howto_css_chat.asp
import Header from '../Texts/Header';
import { Image } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import * as Icon from "react-bootstrap-icons";
const MessageItem = (props) => {
    let sender; 
    let senderId; 
    let sendingTime; 
    let profilePic; 
    let imageItem; 
    const [visible, setVisible] = useState(false); 
    if (props.message.sender === localStorage.getItem("username")) {
        sender = "You"
        senderId = "You"
        sendingTime = "sendingTimeYou";
        if (props.senderImg !== "No picture") {
            profilePic = props.senderImg;
            imageItem = <Image fluid src={profilePic} alt="profilePicSender" id={senderId}></Image>
        } else {
            imageItem =  <Icon.PersonCircle size={50} color={"gray"} id={senderId}></Icon.PersonCircle>
        }
        
    } else {
        sender = props.message.sender; 
        senderId = "Other";
        sendingTime = "sendingTimeOther";
        profilePic = props.recipient.picture;
        if (profilePic) {
            imageItem = <Image fluid src={profilePic} alt="profilePicRecipient" id={senderId}></Image>
        } else {
            imageItem =  <Icon.PersonCircle size={50} color={"gray"} id={senderId}></Icon.PersonCircle>
        }
    }

    return (
        <div id={senderId}>
            {imageItem}
            <Header id={senderId} type="h4" text={sender}></Header>
            <br></br>
            <Header type="p" text={props.message.content}></Header>
            <br></br>
            <Header id={sendingTime} type="p" text={props.message.sendingTime}></Header>
        </div>
    )
}

export default MessageItem;