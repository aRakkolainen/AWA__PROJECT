//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/api" element={<Header text="Welcome!"></Header>}></Route>
          <Route path="/login" element={<>
          <Header text="Login"></Header> 
          <Login></Login> 
          </>}></Route>
          {/*<Route path="/register"></Route>*/}
        </Routes>
    </div>
    </Router>
  );
}

export default App;
