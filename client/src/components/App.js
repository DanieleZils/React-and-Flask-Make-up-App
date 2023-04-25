import React from 'react';
import { Switch, Route, Routes } from "react-router-dom";
import Home from "./Home";

// import './App.css';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route index element= {<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
