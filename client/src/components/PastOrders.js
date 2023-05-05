import React, { useContext, useEffect, useState } from "react";
import { UserContext } from './UserContext';




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
          <h1>Past Orders</h1>
          {pastOrders.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            pastOrders.map((order, index) => (
              <div key={index}>
                <h2>Order #{order.id}</h2>
                <ul>
                  {order.cart_products.map((cartProduct) => (
                    <div key={cartProduct.id}>
                      <img src={cartProduct.product.image_url} alt={cartProduct.product.name} style={{height:"300px", width:"300px"}} />
                      <br />
                      <p>Order Date: {order.created_at}</p>
                    <li>
                      {cartProduct.product.name} - Quantity: {cartProduct.quantity}
                      <br />
                      Price: {cartProduct.product.price} - Subtotal: ${calculateSubtotal(cartProduct).toFixed(2)}
                    </li>
                    </div>
                  ))}
                </ul>
                <h3>Total: ${calculateTotal(order.cart_products).toFixed(2)}</h3>
              </div>
            ))
          )}
        </div>
      );
    }

export default PastOrders;