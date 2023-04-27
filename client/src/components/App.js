import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from './NavBar';
import Signup from './SignUp';
import Login from './Login';
import Products from './Products';
import ProductCard from './ProductCards';
import { UserContext, UserProvider } from './UserContext';



function App() {

  const { user, setUser } = useContext(UserContext)

  //state:
  // const [ isLoginPage, setIsLoginPage] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/checksession").then((r) => {
      if (r.ok && r.headers.get("Content-Length") !== "0") {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/products')
      .then(r => r.json())
      .then(setProducts)
  }, [])


  let productCards = products.map( product => <ProductCard key={product.id} product={product} />)




  return (
    <UserProvider >
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/products" element={<Products productCards={productCards} />}/>
            {/* Add more routes here, if needed */}
          </Routes>
        </Router>
      </div>
    </UserProvider>
    );
  }

export default App;
