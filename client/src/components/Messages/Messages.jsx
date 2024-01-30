import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import {Container, Row, Col} from "react-bootstrap";
const Messages = () => {
    return(
        <>
        <Container fluid>
            <Navigation></Navigation>
            <Row>
                <Col>
                {/*List of friends */}
                </Col>
                <Col>
                    <Header type="h1" text="Messages: "></Header>
                </Col>

                <Col>
                
                </Col>
            </Row>


        </Container>
        </>
    )
}   
export default Messages; 