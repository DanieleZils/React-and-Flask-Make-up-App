import React, { useContext, useEffect, useState } from "react";
import { UserContext } from './UserContext';
import Footer from "./Footer";




function PastOrders(){

    const {user} = useContext(UserContext)
    const [ pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        if (user){
          fetch("/past-orders")
        .then((r) => r.json())
        .then((data) => {
            setPastOrders(data)})
        .catch((error) => {
            console.error("Error fetching past orders", error);
        })
    }
    }, [user])

    // This calculates the subtotal for each product in the cart
function calculateSubtotal(cartProduct) {
  return cartProduct.product.price * cartProduct.quantity;
}

// This calculates the total for all products in the cart
function calculateTotal(cartProducts) {
  if (!cartProducts) {
    return 0;
  } else {
    return cartProducts.reduce((total, cartProduct) => {
      return total + calculateSubtotal(cartProduct);
    }, 0);
  }
}


return (
<div>
  <div className="glassy-bg min-h-screen flex flex-col items-center pt-16">
    {pastOrders.length === 0 ? (
      <p>No past orders found.</p>
    ) : (
      pastOrders.map((order, index) => (
        <div key={index} className="w-2/3 backdrop-blur-md bg-white/40 p-8 mb-8 rounded-3xl shadow-lg">
           <h1 className="text-3xl font-bold mb-8 text-center">Past Orders</h1>
          <ul>
            {order.cart_products.map((cartProduct) => (
              <div key={cartProduct.id} className="flex items-center mb-4">
                <img className="w-1/4 h-1/4 object-cover rounded-3xl mr-8" src={cartProduct.product.image_url} alt={cartProduct.product.name} />
                <div>
                  <p className="font-semibold">Order Date: {order.created_at}</p>
                  <li className="font-semibold">
                    {cartProduct.product.name} - Quantity: {cartProduct.quantity}
                    <br />
                    Price: ${cartProduct.product.price} - Subtotal: ${calculateSubtotal(cartProduct).toFixed(2)}
                  </li>
                </div>
              </div>
            ))}
          </ul>
          <h3 className="text-xl font-semibold text-center">Total: ${calculateTotal(order.cart_products).toFixed(2)}</h3>
        </div>
      ))
    )}
  </div>
  <Footer />
</div>
);
}

export default PastOrders;