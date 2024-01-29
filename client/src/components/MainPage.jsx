//Navbar based on example in react bootstrap documentation: https://react-bootstrap.netlify.app/docs/components/navbar
import Header from "./Header";
import ShowUsers from "./ShowUsers";
import Navigation from "./Navigation";
import {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
const MainPage = () => {
    useEffect(() => {
        fetch("/api/main", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("auth_token")
            }
        })
        .then(console.log("main page"))
    })
    return(
        <>
        <Router>
            <Route path="/api/main" element={
                <>
                <Navigation></Navigation>
                <Header text="Welcome to New Friends Site!"></Header>
                <ShowUsers></ShowUsers>
                </>
            }>
            </Route>
        </Router>
        
    </>
    )
}
export default MainPage;