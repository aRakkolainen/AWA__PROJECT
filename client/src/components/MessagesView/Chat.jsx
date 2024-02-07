import Header from "../Header/Header";
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/CloseButton';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles.css"
//Component for showing individual chat
const Chat = (props) => {
    //const [visibility, setVisibility] = useState(false);
    //const [messagesList, setMessagesList] = useState([]);
    let messagesList = [];
    const showMessages = (messages) => {
        let messagesList = []; 
        messagesList = messages.map((message) => {
            return <MessageItem message={message}></MessageItem>  
        })
        return messagesList;
    }
    if (props.messages !== "No new messages") {
        messagesList = showMessages(props.messages)
    }
    const handleClose = () => {
        while(messagesList.length >0) {
            messagesList.pop(); 
        }
        props.closeChat(); 

    }
      

    return(
            <Card>
            <Card.Header>
                <Card.Title>{props.recipient}</Card.Title>
                <Button onClick={handleClose}></Button>
            </Card.Header>
            <Card.Body>
                {props.visible && messagesList}
            </Card.Body>
            <Card.Footer><SendMessage></SendMessage></Card.Footer>

        </Card>


    )


}

export default Chat;