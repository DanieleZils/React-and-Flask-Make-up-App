import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from './NavBar';
import Signup from './SignUp';
import Login from './Login';
import { UserContext, UserProvider } from './UserContext';



function App() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    // auto-login
    fetch("/checksession").then((r) => {
      if (r.ok && r.headers.get("Content-Length") !== "0") {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);


  return (
    <UserProvider value = {{ user, setUser }}>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login  />} />
            {/* Add more routes here, if needed */}
          </Routes>
        </Router>
      </div>
    </UserProvider>
    );
}

export default App;
