import React from 'react';

function Receipt({ cartProducts, total, user }) {
  return (
    <div className=" p-8 rounded-xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <p className="mb-4">Username: {user.username}</p>
      <form className='receiptForm'>
        {cartProducts.map((cartProduct) => (
          <div key={cartProduct.id} className="my-8 flex flex-col items-center">
            <h4 className="text-xl font-semibold">{cartProduct.product.name}</h4>
            <p className='py-2'>Quantity: {cartProduct.quantity}</p>
            <p>Subtotal: ${(cartProduct.product.price * cartProduct.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h3 className="text-xl font-bold flex flex-col items-center">Total: ${total.toFixed(2)}</h3>
      </form>
    </div>
  );
}

export default Receipt;
