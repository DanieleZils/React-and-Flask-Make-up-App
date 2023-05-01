import React from "react";
import { Link } from "react-router-dom";




function OrderCancelled(){


    return (
    <div>
        <h1>Order Cancelled</h1>
        <h3>Something went wrong! Your payment has been cancelled. Please try again!</h3>
        <Link to = "/cart"> Return to Cart </Link>
    </div>
    )
}

export default OrderCancelled;