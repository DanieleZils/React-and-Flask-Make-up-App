import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';



function Cart(){

    const { user } = useContext(UserContext);
    const [ cart, setCart ] = useState({ cart_products : []});


    useEffect(() => {
        if (user){
            fetch('/cart')
                .then((r) => r.json())
                .then((data) => setCart(data))
                .catch((error) => console.log(error));
        }
    },[user]);



     
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
        alert('Quantity updated successfully');
        }
    })
    .catch((error) => console.log(error));
}

//this calculates the subtotal for each product in the cart
function calculateSubtotal(cartProduct){
    return cartProduct.product.price * cartProduct.quantity;
}

//this calculates the total for all products in the cart
function calculateTotal(){
    return cart.cart_products.reduce((total, cartProduct) => {
        return total + calculateSubtotal(cartProduct);
    }, 0);
}

//this function will post to the orders table and change the is_ordered to true/it will also delete the cart_products from the cart
function checkout(){
    fetch('/order', {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cart_id: cart.id,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data.error){
            setCart({cart_products: []});
            alert('Checkout successful');   
        } else {
            alert('Checkout failed');
        }
    })
    .catch((error) => console.log(error));
    }
    




if (!user) {
    return <p>You must be logged in to view your cart.</p>;}

return (
    <div>
        <h1>Your Cart</h1>
         {cart?.cart_products?.map((cartProduct) => (
            <div key={cartProduct.id}>
                <img style={{width:"200px"}} src={cartProduct.product.image_url} alt={cartProduct.product.name} />
                <h2>{cartProduct.product.name}</h2>
                <p>Quantity: {cartProduct.quantity}</p>
                <p>Price: ${cartProduct.product.price}</p>
                <p>Subtotal: ${calculateSubtotal(cartProduct).toFixed(2)}</p>
                <input
                    type="number"
                    min="1"
                    defaultValue = {cartProduct.quantity}
                    onChange={(e)=> updateQuantity(cartProduct.id, parseInt(e.target.value))}
                />
                <button onClick={() => deleteFromCart(cartProduct.id)}>Delete</button>
            </div>
            ))}
            <p>Total: ${calculateTotal(cart.cart_products).toFixed(2)}</p>
            {cart?.cart_products?.length > 0 && (
      <button onClick={checkout}>Checkout</button>
    )}
    </div>
  );

}

export default Cart;