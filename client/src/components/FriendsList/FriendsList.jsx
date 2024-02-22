import {useState, useEffect} from "react";
//import FriendItem from "./FriendItem";
import Header from "../Header/Header";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
//Checking double clicks: https://www.geeksforgeeks.org/what-is-ondoubleclickcapture-event-in-reactjs/
const FriendsList = (props) => {
    //let username = localStorage.getItem("username");
    let [friendData, setFriendData] = useState([]);
    let friendsList; 
    let moreThanTen = false; 
    //Function for checking if both users have added each other as friends
    useEffect(() => {
      fetch("/api/user/list/friends/"+ localStorage.getItem("username"), { method:"GET",
      headers: {
          "authorization": "Bearer " + localStorage.getItem("auth_token"),
      }
    })
    .then(response => response.json())
    .then(json => setFriendData(json))  
    }, []) 
    //console.log(friendData);
    if (friendData.message === "This user has friends") {
      friendsList = friendData.friends.map((friend) => {
        return (<ListGroup.Item key={friend._id} action onClick={() => props.openChat(friend)} onDoubleClickCapture={props.closeChat}>
          <>
          <Header type="h6" text={friend.username}></Header>
          <Badge bg="info">{props.numberOfNewMessages}</Badge>
        </></ListGroup.Item>)
      })
    } else {
      friendsList = <Header type="h3" text="No friends"></Header>
    }
    //console.log(friendsList);
    const handleClick = (e) => {
      console.log(e.target.text);

      /*switch(pageCount) {
        case(1): 
          friendsList = friendsList.slice(0, n); 
          break; 
        case(2):
          friendsList = friendsList.slice(n, n+5); 
          break;
        default: 
          friendsList = friendsList.slice(0, n);
          break; 
      }
      return friendsList;*/
    }
    //Checking is user has more than 10 friends, if yes, pagination component is created!

    //console.log(friends.length)
    let pageCount=0; 
    let n=5; 
    /*if (friends.length >= n) {
      moreThanTen = true;
      pageCount = friends.length/10;
    }
    switch(pageCount) {
      case(1): 
        friendsList = friendsList.slice(0, n); 
        break; 
      case(2):
        friendsList = friendsList.slice(n, n+5); 
        break;
      default: 
        friendsList = friendsList.slice(0, n);
        break; 
    }*/
    //Splitting friend list based on page count! So it shows only 10 items at a time
    //Based on this react bootstrap 5 documentation page: https://react-bootstrap.netlify.app/docs/components/pagination
    //making pagination item clickable: https://stackoverflow.com/questions/59910754/getting-pagination-button-value-with-react-bootstrap-pagination-component
    let pages;  
    if (moreThanTen === true) {
      let numbers = []; 
      let active = 1; 
      for (let i=1; i <= 5; i++) {
        numbers.push(
          <Pagination.Item key={i} onClick={(event, pageCount) => handleClick(event)}>
            {i}
          </Pagination.Item>
        )
      }
      pages = (
        <Pagination size="sm">{numbers}</Pagination>
      )
    }
    return(
      <>
      <Header type="h2" text="Friends"></Header>
        <ListGroup>
          {friendsList}
        </ListGroup>
        {moreThanTen && pages}
      
      </>



    )



}
export default FriendsList;