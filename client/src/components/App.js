import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./NavBar";
import Signup from "./SignUp";
import Login from "./Login";
import Products from "./Products";
import ProductCard from "./ProductCards";
import Cart from "./Cart";
import { UserContext, UserProvider } from "./UserContext";
import ProductDetail from "./ProductDetail";
import OrderComplete from "./OrderComplete";
import OrderCancelled from "./Cancel";



function App() {

  const { setUser } = useContext(UserContext);

  // state:
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    // auto-login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetch("/checksession").then((r) => {
        if (r.ok && r.headers.get("Content-Length") !== "0") {
          r.json().then((user) => {
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
          });
        }
      });
    }
  }, [setUser]);

  useEffect(() => {
    fetch("/products").then((r) => r.json()).then(setProducts);
  }, []);

  let productCards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products"element={<Products productCards={productCards} />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path = "/order-complete" element={<OrderComplete />}/>
          <Route path = "/cancel" element={<OrderCancelled />}/>
        </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}



