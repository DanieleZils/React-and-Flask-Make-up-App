import React, { useContext, useEffect, useState } from "react";
import { UserContext } from './UserContext';




function PastOrders(){

    const {user} = useContext(UserContext)
    const [ pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        if (user){
          fetch("/past_orders")
        .then((r) => r.json())
        .then((data) => {
            console.log("Fetched past orders:", data)
            setPastOrders(data)})
        .catch((error) => {
            console.error("Error fetching past orders", error);
        })
    }
    }, [user])


    return (
        <div>
          <h1>Past Orders</h1>
          {pastOrders.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            pastOrders.map((order, index) => (
              <div key={index}>
                <h2>Order #{order.id}</h2>
                <p>Order Date: {order.created_at}</p>
                <ul>
                  {order.cart_products.map((cartProduct) => (
                    <li key={cartProduct.id}>
                      {cartProduct.product.name} - Quantity: {cartProduct.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      );
    }

export default PastOrders;