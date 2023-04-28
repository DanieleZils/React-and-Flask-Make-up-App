import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';



function Cart(){

    const { user } = useContext(UserContext);
    const [ cart, setCart ] = useState("");


    useEffect(() => {
        if (user){
            fetch('/cart')
                .then((r) => r.json())
                .then((data) => setCart(data))
                .catch((error) => console.log(error));
        }
    },[user]);


    if (!user) {
        return <p>You must be logged in to view your cart.</p>;}

     
function deleteFromCart(cartProductId) {
    fetch("/cart", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        cart_product_id: cartProductId,
    }),
    })
    .then((response) => {
        if (response.status === 204) {
        // Update the cart state by removing the deleted product
        setCart((prevCart) => {
            return {
            ...prevCart,
            cart_products: prevCart.cart_products.filter(
                (cartProduct) => cartProduct.id !== cartProductId
            ),
            };
        });
        } else {
        alert("Something went wrong. Please try again.");
        }
    })
    .catch((error) => console.log(error));
}

function updateQuantity(cartProductId, newQuantity) {
    fetch('/cart', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cart_product_id: cartProductId,
            quantity: newQuantity,
        }),
    })
    .then((response) => response.json())
    .then((data)=> {
        if (!data.error){
            // Update the cart state with the new quantity
            setCart((prevCart) => {
                const updatedCartProducts = prevCart.cart_products.map((cartProduct) => {
                    if (cartProduct.id === cartProductId) {
                        return {
                            ...cartProduct,
                            quantity: newQuantity,
                        };
                    } else {
                        return cartProduct;
                    }
                });
                return {
                    ...prevCart,
                    cart_products: updatedCartProducts,
                };
            }); 
        }
    })
    .catch((error) => console.log(error));
}


return (
    <div>
        <h1>Your Cart</h1>
         {cart?.cart_products?.map((cartProduct) => (
            <div key={cartProduct.id}>
                <img style={{width:"200px"}} src={cartProduct.product.image_url} alt={cartProduct.product.name} />
                <h2>{cartProduct.product.name}</h2>
                <p>Quantity: {cartProduct.quantity}</p>
                <input
                    type="number"
                    min="1"
                    defaultValue = {cartProduct.quantity}
                    onChange={(e)=> updateQuantity(cartProduct.id, parseInt(e.target.value))}
                />
                <button onClick={() => deleteFromCart(cartProduct.id)}>Delete</button>
            </div>
            ))}
    </div>
  );

}

export default Cart;