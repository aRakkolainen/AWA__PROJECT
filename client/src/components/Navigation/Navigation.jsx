import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import "./styles.css"
const Navigation = () => {
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    }
    return (
    <Navbar id="navbar" className="bg-body-tertiary">
            <Container id="nav">
                <Navbar.Text>Find new friends!</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link href="/main">Main page</Nav.Link>
                    <Nav.Link href="/edit/profile">Edit your profile</Nav.Link>
                    <Nav.Link href="/messages">Messages</Nav.Link>
                    <Button type="button" onClick={handleLogout}>Log out</Button>
                </Nav>

            </Container> 
        </Navbar>)
}
export default Navigation; 