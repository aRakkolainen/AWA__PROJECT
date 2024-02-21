import {Container, Row, Col} from "react-bootstrap";
import Header from "../Header/Header";
import {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
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
            <Row>
                <Col></Col>
                <Col>
                <Header type="h1" text="Register"></Header>
                <div className="container-lg" id="register">
                    <form action="" method="POST" onChange={handleChange} onSubmit={handleSubmit}>
                        <Header type="h4" text="Email: "></Header>
                        <input id="input-email" name="email" type="email" placeholder="Fill out an email.."></input>
                        <br></br>
                        <Header type="h4" text="Password: "></Header>
                        <input id="input-password" name="password" type="password" placeholder="Fill out an password.."></input>
                        <br></br>
                        <br></br>
                        <input id="submit" type="submit" value="Register"></input>
                </form>
                <ToastContainer position="top-center"></ToastContainer>
            </div>
            
            </Col>
            <Col></Col>
            </Row>
        </Container>
    )
}
export default Register; 