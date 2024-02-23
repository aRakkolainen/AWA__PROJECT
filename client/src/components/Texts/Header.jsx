import "./styles.css";
//Custom header
const Header = function(props) {
    return (
        <span className={props.type} id={props.id}>{props.text}</span>
    )
}
export default Header; 