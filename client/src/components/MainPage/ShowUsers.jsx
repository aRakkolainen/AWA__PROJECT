import {useState, useEffect} from 'react';
import UserItem from './UserItem';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";;
//import Header from '../Header/Header';

//Showing toast message when match is found: https://blog.logrocket.com/using-react-toastify-style-toast-messages/

const ShowUsers = function(props) {
    const [userData, setUserData] = useState([]);
    let [currUserIndex, setCurrentUserIndex] = useState(0);
    let [likedUsers, setLikedUsers] = useState([]);
    //Fetching all user profiles
    useEffect(() => {
        fetch("/api/user/list", { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
            }
        })
        .then(response => response.json())
        .then(json => setUserData(json));
    }, [])
    //Fetching users the currently logged user has liked
    useEffect(() => {
        fetch("/api/user/list/likedUsers/"+ localStorage.getItem("username"), { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
            }
        })
        .then(response => response.json())
        .then(json => setLikedUsers(json.likedUsersList))
    }, [])

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

    const mapUsers = (likedUsers) => {
        let users = [];
        userData.map((user) => {
            // All users besides the logged in user are saved into this list
            if (user.username !== localStorage.getItem("username")) { 
                if (likedUsers.length > 0) {
                    if (likedUsers.includes("No liked users")) {
                        console.log("No liked users");
                        users.push(user);
                    }
                    else {
                        console.log("This user has liked users, checking them..")
                        for (let i=0; i< likedUsers.length; i++) {
                            //console.log(likedUsers[i]);
                            if (likedUsers[i] === user.username) {
                                console.log("Already liked this user, hiding them!");
                            } else {
                                users.push(user);
                            }
                        }
                    }
                } 
    
        }
        return users; 
    })
    return users; 
    }
    //Creating list of users except the logged in user! Also checking who the user has already liked/added to be friends so not showing same ones again!
    let users = mapUsers(likedUsers);
    //Creating list of found users
    const userList = users.map((user) => {
        if (user.username) {
            return <UserItem username={user.username} bio={user.bio} like={handleLike} dislike={handleDisLike}></UserItem> 
        } 
    })
    return(
        <Container>
            <ul>{userList[currUserIndex]}</ul>
            <br></br>
            <ToastContainer position="top-center" onClick={(sendMessage)}></ToastContainer>
        </Container>
    )
}

export default ShowUsers;