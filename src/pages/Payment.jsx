import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../App/Features/cartSlice"



const Payment = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState({ id: "NA", status: "Pending" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { shippingAddress } = location.state || "";

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!shippingAddress || cartItems.length === 0) return alert("Missing info");

    const orderData = {
      products: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      shippingAddress,
      paymentMethod,
    };

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post("http://localhost:3000/api/v1/createOrder", orderData, config);

      if (data.success) {
        alert("Order placed successfully!");
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Payment</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-gray-700 mb-2">Total Amount: ${totalPrice.toFixed(2)}</p>
        <label className="block text-gray-700 mb-2">Select Payment Method</label>
        <select
          value={paymentMethod.status}
          onChange={(e) => setPaymentMethod({ ...paymentMethod, status: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="Pending">Cash on Delivery</option>
          <option value="Paid">Online Payment</option>
        </select>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
