import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import Receipt from './Receipt';

function OrderComplete() {
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetch('/past-orders?last_order_only=true')
        .then((r) => r.json())
        .then((data) => {
          setOrder(data[0]);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (!order) {
    return <p>Loading...</p>;
  }

  // Calculate the total for all products in the order
  function calculateTotal() {
    if (!order.cart_products) {
      return 0;
    } else {
      return order.cart_products.reduce((total, cartProduct) => {
        return total + (cartProduct.product.price * cartProduct.quantity);
      }, 0);
    }
  }

  return (
   
    <div className='ordercompletediv'>
      <Receipt cartProducts={order.cart_products} total={calculateTotal()} user={user} />
    </div>
 
  );
}

export default OrderComplete;
