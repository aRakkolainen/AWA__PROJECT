import FriendsList from "../FriendsList/FriendsList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Chat from "./Chat";
import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
const MessagesView = () => {
    const [chatView, setChatView] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [visible, setVisible] = useState(false);
    const closeChat = () => {
        setVisible(false);
        console.log(visible);
    }
    const openChat = (friend) => {
        fetch("/api/user/list/chats/"+ localStorage.getItem("username") + "/" + friend, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token"),
        }
    })
      .then(response => response.json())
      .then(json => setChatData(json.messages))
      //Chat view needs to be rendered anyway so this isn't working!
      /*if (!chatData.includes("No new messages")) {
        setChatView(<Chat recipient={friend} messages={chatData} visible={visible} closeChat={() => closeChat}></Chat>)
      }*/
      setVisible(true);
      setChatView(<Chat recipient={friend} messages={chatData} closeChat={closeChat} visible={visible}></Chat>)
        //setChatView(<Chat recipient={friend} messages={chatData} showChat={show}></Chat>)
    
    }
    //chatView = <Chat recipient="None"></Chat>


    return(
        <>
        <Container fluid>
            <Navigation></Navigation>
            <Row>
                <Col>
                {/*List of friends */}
                <FriendsList openChat={openChat}></FriendsList>
                </Col>
                <Col>
                    <Header type="h1" text="Messages: "></Header>
                    {visible && chatView}
                </Col>
            </Row>


        </Container>
        </>
    )
}   
export default MessagesView; 