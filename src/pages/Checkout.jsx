import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [shippingAddress, setShippingAddress] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleNext = async () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address.");
      return;
    }

    try {
      // Map cartItems to include 'product' field for backend validation
      const formattedCartItems = cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product: item._id, // required by backend
      }));

      const res = await fetch("https://fullstackecommers-backend-uerv.onrender.com/api/v1/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          name: user?.name || "Test User",
          email: user?.email || "test@gmail.com",
          phone: user?.phone || "01700000000",
          userId: user?._id,
          cartItems: formattedCartItems,
          shippingAddress,
        }),
      });

      const data = await res.json();

      if (!data.url) {
        alert("Payment URL not found!");
        return;
      }

      // Redirect user to SSLCommerz payment page
      window.location.replace(data.url);

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Shipping */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Shipping Details</h2>
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

        {/* Order Summary */}
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
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
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