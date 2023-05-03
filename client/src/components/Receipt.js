import React from 'react';

function Receipt({ cartProducts, total, user }) {
  return (
    <div>
      <h2>Order Summary</h2>
      <p>Username: {user.username}</p>
      <form className='receiptForm'>
        {cartProducts.map((cartProduct) => (
          <div key={cartProduct.id}>
            <h4>{cartProduct.product.name}</h4>
            <p>Quantity: {cartProduct.quantity}</p>
            <p>Subtotal: ${(cartProduct.product.price * cartProduct.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
      </form>
    </div>
  );
}

export default Receipt;