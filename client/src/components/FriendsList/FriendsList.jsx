import {useState, useEffect} from "react";
//import FriendItem from "./FriendItem";
import Header from "../Header/Header";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
//Checking double clicks: https://www.geeksforgeeks.org/what-is-ondoubleclickcapture-event-in-reactjs/
const FriendsList = (props) => {
    //let username = localStorage.getItem("username");
    let [friends, setFriends] = useState([]);
    let [friend, setFriend] = useState(null);
    //Function for checking if both users have added each other as friends
    useEffect(() => {
      fetch("/api/user/list/friends/"+ localStorage.getItem("username"), { method:"GET",
      headers: {
          "authorization": "Bearer " + localStorage.getItem("auth_token"),
      }
  })
    .then(response => response.json())
    .then(json => setFriends(json.friendList))  
    }, []) 
    let friendsList; 
    //Creating friend items: 
    if (friends) {
      friendsList = friends.map((friend) => {
        return <ListGroup.Item action onClick={() => props.openChat(friend)} onDoubleClickCapture={props.closeChat}>{friend}</ListGroup.Item>
      })
    }

    //console.log(friends)
    return(
      <>
      <Header type="h2" text="Friends"></Header>
        <ListGroup>
          {friendsList}
        </ListGroup>
      
      </>



    )



}
export default FriendsList;