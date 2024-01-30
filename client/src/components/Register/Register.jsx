import {Container, Row, Col} from "react-bootstrap";
import Header from "../Header/Header";
import "./styles.css";


const Register = function() {
    return(
        <Container id="signup">
            <Row>
                <Col></Col>
                <Col>
                <Header type="h1" text="Register"></Header>
                <div className="container-lg" id="register">
                    <form action="/api/user/register" method="POST">
                        <Header type="h4" text="Email: "></Header>
                        <input id="input-email" name="email" type="email" placeholder="Fill out an email.."></input>
                        <br></br>
                        <Header type="h4" text="Password: "></Header>
                        <input id="input-password" name="password" type="password" placeholder="Fill out an password.."></input>
                        <br></br>
                        <br></br>
                        <button id="submit">Register</button>
                </form>
            </div></Col>
            <Col></Col>
            </Row>
        </Container>
    )
}
export default Register; 