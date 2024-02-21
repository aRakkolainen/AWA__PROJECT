import {useState, useEffect} from 'react';
import UserItem from './UserItem';
import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
;
//import Header from '../Header/Header';

//Showing toast message when match is found: https://blog.logrocket.com/using-react-toastify-style-toast-messages/

const ShowUsers = function(props) {
    const [userData, setUserData] = useState([]);
    const [users, setUsers] = useState([]); 
    let [currUserIndex, setCurrentUserIndex] = useState(0);
    //This needs to be rethought how this is implemented! What if just fetching one user at a time from the database and checking whether user has liked that one?
    //Fetching list of all users this user hasn't liked
    useEffect(() => {
        fetch("/api/user/list/notLikedUsers/"+localStorage.getItem("username"), { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
            }
        })
        .then(response => response.json())
        .then(json => setUserData(json.users));
    }, [])
    console.log(userData);


    //Function for liking user and saving it to friends list and friend
    const handleLike = (username) => {
        console.log("You liked this user, saving that info..")
        let friends ={
           friendOne: localStorage.getItem("username"), 
           friendTwo: username
        } ;
        fetch("api/user/add/friend", {method: "POST", 
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
                "Content-type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(friends)
    
        }).then(response => response.json())
        .then(data => notifyMatch(data.matchFound))
        //console.log(matchFound)
        currUserIndex += 1; 
        setCurrentUserIndex(currUserIndex);
    }
    //How to set positions of toast messages in react: https://stackoverflow.com/questions/68617361/reacttoastify-position-not-working-in-react
    const notifyMatch = (matchFound) => {
        console.log(matchFound)
        if(matchFound) {
            toast.success("Match found! Send message by clicking this notification")
        } 
    }

    const sendMessage = () => {
        console.log("Open message page..")
        window.location.replace("/messages")
    }
    //Function for disliking user
    const handleDisLike = () => {
        console.log("Not liking this user, showing new one!");
        currUserIndex += 1; 
        setCurrentUserIndex(currUserIndex);

    }

    
    //Creating list of users except the logged in user! Also checking who the user has already liked/added to be friends so not showing same ones again!
    //Creating list of potential users to be liked
    const userList = userData.map((user) => {
        if (user.username) {
            return <UserItem key={user._id} username={user.username} bio={user.bio} like={handleLike} dislike={handleDisLike}></UserItem> 
        } 
    })

    console.log(userList);
    return(
        <Container>
            <ul>{userList[currUserIndex]}</ul>
            <br></br>
            <ToastContainer position="top-center" onClick={(sendMessage)}></ToastContainer>
        </Container>
    )
}

export default ShowUsers;