import "./styles.css";

const ClickableHeader = function(props) {
    return (
        <p className={props.type} onClick={props.handleClick}>{props.text}</p>
    )
}
export default ClickableHeader; 