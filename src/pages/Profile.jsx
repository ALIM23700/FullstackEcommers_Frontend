import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../App/Features/orderSlice";
import moment from "moment";


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user) dispatch(fetchUserOrders());
  }, [dispatch, user]);

  if (!user)
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        Please login to view your profile.
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {orders.length === 0 && !isLoading && (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}

      <div className="max-w-3xl mx-auto space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-2xl shadow-lg">
            <p
              className={`mb-2 font-semibold inline-block px-3 py-1 rounded-full text-white ${
                order.orderStatus === "Delivered" ? "bg-green-600" : "bg-orange-500"
              }`}
            >
              {order.orderStatus}
            </p>

            <p className="mb-2 font-semibold">Total: ${order.totalPrice}</p>

            <div className="mb-2">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside">
                {order.orderItems.map((item) => (
                  <li key={item.product}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {order.orderStatus === "Delivered" && order.deliveredAt && (
              <p className="text-green-600 text-sm mb-2">
                Delivered on: {moment(order.deliveredAt).format("M/D/YYYY")}
              </p>
            )}

            <p className="text-gray-500 text-sm">
              Placed on: {moment(order.createdAt).format("M/D/YYYY")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
