import "./styles.css";

const Header = function(props) {
    return (
        <p className={props.type} id={props.id}>{props.text} <span></span> {props.content}</p>
    )
}
export default Header; 