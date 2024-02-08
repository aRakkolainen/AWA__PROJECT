
//Component for showing message!
import Card from 'react-bootstrap/Card';
import ClickableHeader from '../Header/ClickableHeader';
const MessageItem = (props) => {
    /*let messages; 
    let messageList; 
    if(props.messages) {
        messages = props.messages; 
    if (messages) {
        messageList = messages.map((message) => {
            <li>{message.content}</li>
        })
    }
    }*/
    let sender; 
    if (props.message.sender === localStorage.getItem("username")) {
        sender = "You"
    } else {
        sender = props.message.sender; 
    }
    return (
        <Card style={{width: "fit-content", height: "fit-content"}} id={sender}>
            <Card.Body>
                <Card.Title>{sender}</Card.Title>
                <Card.Text id={sender}>
                    {props.message.content}
                </Card.Text>
        </Card.Body>
        <Card.Footer id="sender">{props.message.sendingTime}</Card.Footer>
        </Card>
    )
}

export default MessageItem;