import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";



function App() {

  const [user, setUser] = useState('');


  useEffect(() => {
    // auto-login
    fetch("/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    });
   }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
