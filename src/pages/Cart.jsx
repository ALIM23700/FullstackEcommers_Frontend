import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../App/Features/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image?.[0]?.url || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>

                 
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>

            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
