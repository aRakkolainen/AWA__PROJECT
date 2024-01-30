import "./styles.css";

const Header = function(props) {
    return (
        <p className={props.type}>{props.text}</p>
    )
}
export default Header; 