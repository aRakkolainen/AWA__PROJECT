
//Component for showing message!

const MessageItem = (props) => {
    let messages = props.messages; 
    console.log(messages)
    const messageList = messages.map((message) => {
        return <li>{message.content}</li>
    })
    return (

        <div>
            <ul>
                {messageList}
            </ul>

        </div>
    )
}

export default MessageItem;