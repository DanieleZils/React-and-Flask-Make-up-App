import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate, Link} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Receipt from './Receipt';




function Cart(){

    const { user } = useContext(UserContext);
    const [ cart, setCart ] = useState({ cart_products : []});
    const [showReceipt, setShowReceipt] = useState(false);
    const [showCheckoutButton, setShowCheckoutButton] = useState(false);

   

    const [ publishableKey, setPublishableKey ] = useState(null);

    const stripePromise = publishableKey && loadStripe(publishableKey);


    const navigate = useNavigate();


    useEffect(() => {
        if (user){
            fetch('/cart?is_ordered=false')
                .then((r) => r.json())
                .then((data) => setCart(data))
                .catch((error) => console.log(error));
        }
    },[user]);

    useEffect(() => {
        async function fetchPublishableKey() {
          try {
            const response = await fetch('/stripe_publishable_key');
            const data = await response.json();
            setPublishableKey(data.stripe_publishable_key)
          } catch (error) {
            console.log(error);
          }
        }
        fetchPublishableKey();
      }, []);    


     
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
    if (!cart.cart_products){
        return 0;
    } else {
    return cart.cart_products.reduce((total, cartProduct) => {
        return total + calculateSubtotal(cartProduct);
    }, 0);
}
}

//this function will post to the orders table and change the is_ordered to true/it will also delete the cart_products from the cart
function checkout(callback){
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
            navigate("/loading")
            callback(); 
        } else {
            alert('Checkout failed');
        }
    })
    .catch((error) => console.log(error));
}
async function handleStripeCheckout() {
    if (!publishableKey) {
      return;
    }

    const stripe = await loadStripe(publishableKey);

    // Calculate the total amount in the smallest currency unit (e.g., cents for USD)
    const totalAmount = calculateTotal() * 100;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "usd", // Replace with the desired currency
      }),
    });

    const data = await response.json();

    if (data.error) {
      // Handle server-side error
      console.log('[error]', data.error);
    } else {
      // Redirect to checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (error) {
        // Handle client-side error
        console.log('[error]', error);
      } 
    }
  }

  function reviewOrder() {
    setShowReceipt(true);
    setShowCheckoutButton(true);
  }


if (!user) {
    return <p>You must be logged in to view your cart.</p>; 
}


return (
    <div>
        <h1>Your Cart</h1>
         {cart?.cart_products?.map((cartProduct) => (
            <div key={cartProduct.id}>
                <Link to={`/products/${cartProduct.product.id}`}>
                <img style={{width:"200px"}} src={cartProduct.product.image_url} alt={cartProduct.product.name} />
                </Link>
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
            {cart?.cart_products?.length > 0 && stripePromise && (
            <>
            {!showReceipt ? (
              <button
                onClick={reviewOrder}
              >
                Review Order
              </button>
            ) : (
              <>
                <Receipt cartProducts={cart.cart_products} total={calculateTotal(cart.cart_products)} user={user} />
                {showCheckoutButton && (
                  <button
                    onClick={() => { checkout(handleStripeCheckout); }}
                  >
                    Checkout
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
}
    
export default Cart;