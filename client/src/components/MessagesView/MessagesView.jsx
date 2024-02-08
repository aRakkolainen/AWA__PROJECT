import FriendsList from "../FriendsList/FriendsList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Chat from "./Chat";
import {Container, Row, Col} from "react-bootstrap";
import {useState} from "react";
const MessagesView = () => {
    const [chatView, setChatView] = useState(null);
    //const [chatData, setChatData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [recipient, setRecipient] = useState(null);
    //const [friend, setFriend] = useState=(null);
    const closeChat = () => {
        setVisible(false);
    }
    const changeChat = () => {
        setRecipient(null)
    }
    const openChat = (friend) => {
        setVisible(true);
        setRecipient(friend)
        setChatView(<Chat recipient={recipient} close={closeChat}></Chat>);
        //setChatView(<Chat recipient={friend} messages={chatData} showChat={show}></Chat>)
    
    }

    //chatView = <Chat recipient="None"></Chat>


    return(
        <>
        <Container fluid>
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