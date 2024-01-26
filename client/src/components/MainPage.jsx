//Navbar based on example in react bootstrap documentation: https://react-bootstrap.netlify.app/docs/components/navbar
import Header from "./Header";
import ShowUsers from "./ShowUsers";
import Navigation from "./Navigation";
const MainPage = () => {
    return(
        <>
        <Navigation></Navigation>
        <Header text="Welcome to New Friends Site!"></Header>
        <ShowUsers></ShowUsers>
        
    </>
    )
}
export default MainPage;