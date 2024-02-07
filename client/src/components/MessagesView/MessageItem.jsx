
//Component for showing message!
import Card from 'react-bootstrap/Card';
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
        <Card style={{width: '12rem'}} id={sender}>
            <Card.Body>
                <Card.Title>{sender}</Card.Title>
                <Card.Text id={sender}>
                    {props.message.content}
                </Card.Text>
                <Card.Text>{props.message.sendingTime}</Card.Text>
    
        </Card.Body>
        </Card>
    )
}

export default MessageItem;