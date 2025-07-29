import React from 'react';
import { useCart } from './cartContext';
import { Link } from 'react-router-dom'; 

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="py-16 px-4 mx-4 md:mx-20 my-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li key={item._id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description.slice(0, 80)}...</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">Price: Rs {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded disabled:opacity-50"
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="text-right mt-4 md:mt-0">
                  <p className="font-semibold text-gray-800">Rs. {item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="mt-10 p-6 bg-gray-50 rounded-md shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🧾 Order Summary</h3>
            <div className="flex justify-between text-lg font-medium text-gray-700 mb-4">
              <span>Total Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-700 mb-6">
              <span>Total Price:</span>
              <span>Rs. {calculateTotal()}</span>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md text-center w-full md:w-auto"
              >
                Proceed to Checkout Rs. {calculateTotal()}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
