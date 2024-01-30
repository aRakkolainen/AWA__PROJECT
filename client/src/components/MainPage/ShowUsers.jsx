import {useState, useEffect} from 'react';
import UserItem from './UserItem';
import Container from 'react-bootstrap/Container';
import Header from '../Header/Header';
const ShowUsers = function(props) {
    const [userData, setUserData] = useState([]);
    let [currUserIndex, setCurrentUserIndex] = useState(0);
    let [likedUsers, setLikedUsers] = useState([]);
    //const [friends, setFriends] = useState([]);
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
    //Fetching friends data of logged user
    useEffect(() => {
        fetch("/api/user/list/friends/"+ localStorage.getItem("username"), { method:"GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token"),
            }
        })
        .then(response => response.json())
        .then(json => setLikedUsers(json.friendList));
    }, [])


    //Function for liking user and saving it to friends list and friend
    const handleLike = (username) => {
        console.log("You liked this user, saving that info..")
        //likedUsers.push(username);
        //setLikedUsers(likedUsers);
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
        .then(data => console.log(data))
        currUserIndex += 1; 
        setCurrentUserIndex(currUserIndex);
    }
    //Function for disliking user
    const handleDisLike = () => {
        console.log("Not liking this user, showing new one!");
        currUserIndex += 1; 
        setCurrentUserIndex(currUserIndex);

    }
    //Creating list of users except the logged in user! Also checking who the user has already liked/added to be friends!
    let users = []; 
    //etFriends(props.loggedUser.friends);
    userData.map((user) => {
        // All users besides the logged in user
        if (user.username !== localStorage.getItem("username")) { 
            // If logged user has existing friends, those won't be added!
            if (likedUsers) {
                if (likedUsers.length > 1) {
                    if (likedUsers.indexOf(user.username) === -1) {
                        users.push(user);
                    }
                } else if (likedUsers.length === 1) {
                    users.push(user)
                }
            } 
        }
})
    //console.log(users);
    const userList = users.map((user) => {
        if (user.username) {
            return <UserItem username={user.username} bio={user.bio} like={handleLike} dislike={handleDisLike}></UserItem> 
        } 
    })
    //checkForMatches(); 

    // Functions for like and dislike buttons needed! If like, then that user should be saved as a friend? If dislike, then next user should be shown
    //const createUserOptions = () => {

    //}
    //Creating list of users: 


    return(
        <Container>
            <ul>{userList[currUserIndex]}</ul>
        </Container>
    )
}

export default ShowUsers;