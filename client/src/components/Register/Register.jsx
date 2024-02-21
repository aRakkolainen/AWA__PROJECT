import {Container, Row, Col} from "react-bootstrap";
import Header from "../Header/Header";
import {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//Form is based on this documentation from Bootstrap 5: https://react-bootstrap.netlify.app/docs/forms/overview

//Based on course materials from week 12!
const Register = function() {
    const [userData, setUserData] = useState({});
    const [registerStatus, setRegisterStatus] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/user/register", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData), 
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => setRegisterStatus(data.text))
        if (registerStatus === "Register succeeded") {
            toast.success("Register succeeded, redirecting to login page")
            window.location.replace("/login")

        } else if(registerStatus === "Email already in use") {
            toast.error("Email already in use, try other one")
        }
        
        //.then(data => console.log(data.email))
    }
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    
    
    return(
        <Container id="signup">
            <Header type="h1" text="Register"></Header>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Label htmlFor="input-email">Email:</Form.Label>
                <Form.Control type="email" name="email" id="input-email" placeholder='Fill your email..'></Form.Control>
                <Form.Label htmlFor="input-password">Password:</Form.Label>
                <Form.Control type="password" name="password" id="input-password" autoComplete="current-password"></Form.Control>
                <br></br>
                <Button onClick={handleSubmit}>Register</Button>
                <ToastContainer position="top-center"></ToastContainer>
                <br></br>



            </Form>
        </Container>
    )
}
export default Register; 