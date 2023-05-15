import React from 'react';

function Receipt({ cartProducts, total, user }) {
  return (
    <div className=" p-8 rounded-xl ">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <p className="mb-4">Username: {user.username}</p>
      <form className='receiptForm'>
        {cartProducts.map((cartProduct) => (
          <div key={cartProduct.id} className="mb-4">
            <h4 className="text-lg font-semibold">{cartProduct.product.name}</h4>
            <p>Quantity: {cartProduct.quantity}</p>
            <p>Subtotal: ${(cartProduct.product.price * cartProduct.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
      </form>
    </div>
  );
}

export default Receipt;
