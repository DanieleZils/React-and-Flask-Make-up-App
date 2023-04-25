import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from './NavBar';
import Signup from './SignUp';
import Login from './Login';



function App() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    // auto-login
    fetch("/checksession").then((r) => {
      if (r.ok) {r.json().then((user) => setUser(user))
      }
    });
   }, []);


  return (
    <div className="App">
      <Router>
        <Navbar user = {user} setUser = {setUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup onSignupSuccess={setUser}/>} />
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
          {/* Add more routes here, if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
