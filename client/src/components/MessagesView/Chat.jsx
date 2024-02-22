//import Header from "../Header/Header";
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";
import Profile from "../Profile/Profile";
import {useState, useEffect, useCallback} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/CloseButton';
import {Row, Col, ListGroupItem} from 'react-bootstrap';
//import ListGroup from 'react-bootstrap/ListGroup';
import ClickableHeader from '../Header/ClickableHeader';
import {List} from 'react-virtualized';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Modal from 'react-bootstrap/Modal';
import "./styles.css"
import "../overallStyles.css"
//Sources: 
// Creating scrollable component: https://getbootstrap.com/docs/5.1/components/scrollspy/
//How to pass data from child component to parent component in react: https://www.geeksforgeeks.org/how-to-pass-data-from-one-component-to-other-component-in-reactjs/#approach-2-passing-data-from-child-to-parent-component

//Component for showing individual chat




const Chat = (props) => {
    console.log(props.recipientName)
    const [chatData, setChatData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    useEffect(() => {fetch("/api/user/list/chats/"+ localStorage.getItem("username") + "/" + props.recipientName, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token"),
        }
    })
      .then(response => response.json())
      .then(json => setChatData(json.messages))
},[props.recipientName]);


    /*if (props.visible === true) {
        props.newMessages(chatData, props.recipientName);
    }*/
    let messagesList; 
        if (chatData) {
            messagesList = chatData.map((message) => {
                return <MessageItem recipient={props.recipient} message={message}></MessageItem>
            })
        }
     
    const openProfile = () => {
        //setProfile(<Profile user={props.recipient}></Profile>)
        window.location.replace("/profile/"+props.recipientName);
        
    }
    const handleClose = () => {
        /*while(messagesList.length >0) {
            messagesList.pop(); 
        }*/
        setChatData([]);
        props.close(); 

    }

     return(
            <Card id="chatBox">
            <Card.Header>
                <Row>
                    <Col>
                    <Card.Title>
                        <ClickableHeader type="h2" text={props.recipientName} handleClick={openProfile}></ClickableHeader>
                    </Card.Title> 
                    </Col>
                    <Button onClick={handleClose}></Button>
                </Row>
            </Card.Header>
            <Card.Body>
                {/*Creating scrollable list of messages is based on this: https://www.dhiwise.com/post/boosting-performance-with-react-scroller-best-practices */}
                <List id="messagesList" width={450} height={450} rowCount={messagesList.length} rowHeight={150} rowRenderer={({index, key, style}) => (
                    <div key={key} style={style}>
                        {messagesList[index]}
                    </div>
                )}>


                </List>
            </Card.Body>
            <Card.Footer>
                <SendMessage recipient={props.recipientName}></SendMessage></Card.Footer>

        </Card>
    )


}

export default Chat;