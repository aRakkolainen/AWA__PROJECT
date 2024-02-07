// How to show currently logged in user: https://stackoverflow.com/questions/65060748/react-js-how-to-get-and-show-current-user-when-logged-in
// Adding delay: https://byby.dev/js-wait-n-seconds
// Using toasts in react: https://blog.logrocket.com/using-react-toastify-style-toast-messages/
import {Container, Row, Col} from "react-bootstrap";
import "./styles.css";
import {useState} from 'react';
import Header from "../Header/Header";
import 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Popup from "../Popup/Popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Based on course materials from week 12!
const Login = function () {
    const [userData, setUserData] = useState({});
    //let [message, setMessage] = useState(null); 
    function storeToken(token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("username", userData.username)
    }   
    function storeUsername(email) {
        let temp = email.split("@");
        localStorage.setItem("username", temp[0]);
    }
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
            //console.log(data.message)
            if (data.token) {
                //setJwt(data.token);
                storeToken(data.token);
                storeUsername(userData.email);
                //toast(data.message);
                setTimeout(function () {
                    window.location.replace("/main")
                }, 3000)
                //window.location.replace("/main");
            }
            //setMessage(data.message)
            toast(data.message)
        })
    }
    //toast.configure();
    
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return(
        <>
        <Container id="Login">
            <Row>
                <Col></Col>
                <Col>
                <Header type="h1" text="Login"></Header>
                {/*<div className="container-lg" id="login">
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <Header type="h4" text="Email: "></Header>
                        <input name="email" type="email"></input>
                        <br></br>
                        <br></br>
                        <Header type="h4" text="Password: "></Header>
                        <input name="password" type="password" autoComplete="current-password"></input>
                        <br></br>
                        <br></br>
                        <button id="submit">Login</button> <br></br><br></br>
                        <ToastContainer position="top-center"></ToastContainer>
                        <a href="/register">Not yet user? Sign up here...</a>
            </form> 
    </div>*/}
    <Container className="container-lg" id="login">
        <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Form.Label htmlFor="input-email">Email:</Form.Label>
            <Form.Control type="email" name="email" id="input-email" placeholder='Fill your email..'></Form.Control>
            <Form.Label htmlFor="input-password">Password:</Form.Label>
            <Form.Control type="password" name="password" id="input-password" autoComplete="current-password"></Form.Control>
            <Button onClick={handleSubmit}>Login</Button>
            <ToastContainer position="top-center"></ToastContainer>
            <a href="/register">Not yet user? Sign up here...</a>
        </Form>

    </Container>
                
                </Col>


                <Col></Col>
            </Row>
        </Container>
        </>
    )
}
export default Login; 