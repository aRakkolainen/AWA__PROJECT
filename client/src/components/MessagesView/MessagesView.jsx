import FriendsList from "../FriendsList/FriendsList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Chat from "./Chat";
import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
const MessagesView = () => {
    const [chatView, setChatView] = useState(null);
    const [chatData, setChatData] = useState([]);
    /*useEffect(() => {
        fetch("/api/user/list/friends/"+ localStorage.getItem("username"), { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
            }
        })
        .then(response => response.json())
        .then(json => setPossibleFriends(json.friendList))
        /*possibleFriends.forEach((friend) => {
            checkFriendship(friend);
            if (friendStatus === true) {
                console.log("friend")
            }
        })
    }, [])*/
    //Fetching all chats where this user is first member..
    /*useEffect(() => {
        fetch("/api/user/list/chats/"+ localStorage.getItem("username"), { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token"),
        }
    })
      .then(response => response.json())
      .then(json => console.log(json))  
      }, []) */
    const openChat = (friend) => {
        fetch("/api/user/list/chats/"+ localStorage.getItem("username") + "/" + friend, { method:"GET",
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token"),
        }
    })
      .then(response => response.json())
      .then(json => setChatData(json.messages))
      console.log(chatData)
      setChatView(<Chat recipient={friend} messages={chatData}></Chat>)
    
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
                    {chatView}
                </Col>

                <Col>
                
                </Col>
            </Row>


        </Container>
        </>
    )
}   
export default MessagesView; 