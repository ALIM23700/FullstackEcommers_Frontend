import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNext = () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address.");
      return;
    }
    navigate("/payment", { state: { shippingAddress } });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
      
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Shipping Details</h2>
          <label className="block text-gray-700 font-semibold mb-2">
            Shipping Address
          </label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="123, Green Street, Dhaka"
            className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Next: Payment
          </button>
        </div>

       
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image?.[0]?.url || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
