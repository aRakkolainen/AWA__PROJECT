import "./styles.css";
import {useState} from 'react';
//Based on course materials from week 12!
const Login = function ({setJwt, jwt, setUser}) {
    const [userData, setUserData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault(); 
        fetch("/api/user/login", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData), 
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.token) {
                setJwt(data.token)
            }
        })
    }
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return(
        <>
        <div>
        <form onSubmit={handleSubmit} onChange={handleChange}>
                <label for="email">Email: </label>
                <input name="email" type="email"></input>
                <br></br>
                <br></br>
                <label for="password">Password: </label>
                <input name="password" type="password"></input>
                <br></br>
                <button id="submit">Login</button>
            </form> 
        </div>
        </>
    )
}
export default Login; 