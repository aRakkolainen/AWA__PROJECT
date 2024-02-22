import FriendsList from "../FriendsList/FriendsList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Chat from "./Chat";
import {Container, Row, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
const MessagesView = () => {
    const [chatView, setChatView] = useState(null);
    //const [chatData, setChatData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [recipientName, setRecipientName] = useState(null);
    const {recipientUsername} = useParams();
    const [recipient, setRecipient] = useState(null);
    const [numberOfNewMsg, setNumberOfNewMsg] = useState(0);
    //const [friend, setFriend] = useState=(null);
    //Checking if these page was redirected from match found, then opening the chat immediately
    useEffect(()=> {
        if(recipientUsername) {
            setVisible(true);
            setRecipientName(recipientUsername);
            setChatView(<Chat recipientName={recipientUsername} close={closeChat} visible={visible}></Chat>)
        }
    }, []);
    const closeChat = () => {
        setVisible(false);
        //setNumberOfNewMessages(0);
    }
    const changeChat = () => {
        setRecipient(null)
    }
    /*const setNumberOfNewMessages = (newMsgs, recipient) => {
        let numberOfNew=0; 
        if (newMsgs) {
            for (let i=0; i < newMsgs.length; i++) {
                if (newMsgs[i].sender === recipient) {
                    numberOfNew = numberOfNew + 1; 
                }
            }
            setNumberOfNewMsg(numberOfNew); 
        }
    }*/
    const openChat = (friend) => {
        setVisible(true);
        setRecipientName(friend.username);
        setRecipient(friend);
        console.log(recipient);
        setChatView(<Chat recipientName={recipientName} recipient={recipient} close={closeChat} visible={visible} ></Chat>);
    }
    
    return(
        <>
        <Container>
            <Navigation></Navigation>
            <Row>
                <Col xs lg="2" id="friends">
                {/*List of friends */}
                <FriendsList openChat={openChat} closeChat={closeChat} changeChat={changeChat}></FriendsList>
                </Col>
                <Col xs lg="5" id="messages">
                    <Header type="h1" text="Messages: "></Header>
                    {visible && chatView}
                </Col>
            </Row>


        </Container>
        </>
    )
}   
export default MessagesView; 