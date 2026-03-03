import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  markOrderDelivered,
  deleteOrder as deleteOrderAction,
} from "../App/Features/adminOrderSlice"; 
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../App/Features/adminProductSlice"; 

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { orders = [], isLoading: ordersLoading, error: ordersError } = useSelector(
    (state) => state.adminOrders
  );


  const { products = [], isLoading: productsLoading, error: productsError } = useSelector(
    (state) => state.adminProducts
  );

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: [{ url: "", public_id: "" }],
  });

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  
  const handleDeliver = async (orderId) => {
    try {
      const resultAction = await dispatch(markOrderDelivered(orderId));
      if (markOrderDelivered.fulfilled.match(resultAction)) {
        alert("Order marked as delivered!");
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrderAction(orderId));
    }
  };

  
  const handleCreateProduct = async () => {
    const { name, price, description, category, stock, image } = newProduct;
    if (!name || !price || !description || !category || !stock || !image[0].url || !image[0].public_id) {
      alert("Please fill all required fields!");
      return;
    }
    try {
      await dispatch(createProduct(newProduct));
      alert("Product created successfully!");
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        stock: 0,
        image: [{ url: "", public_id: "" }],
      });
    } catch (err) {
      alert("Failed to create product");
    }
  };

  const handleUpdateProduct = async (product) => {
    const updatedName = prompt("Enter new name", product.name);
    if (!updatedName) return;
    const updatedDescription = prompt("Enter new description", product.description);
    if (!updatedDescription) return;
    const updatedPrice = Number(prompt("Enter new price", product.price));
    if (!updatedPrice) return;
    const updatedStock = Number(prompt("Enter new stock", product.stock));
    if (!updatedStock) return;
    const updatedCategory = prompt("Enter new category", product.category);
    if (!updatedCategory) return;
    const updatedImageUrl = prompt("Enter new image URL", product.image[0]?.url);
    if (!updatedImageUrl) return;

    const updatedProduct = {
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
      stock: updatedStock,
      category: updatedCategory,
      image: [{ url: updatedImageUrl, public_id: "manual" }],
    };

    try {
      await dispatch(updateProduct({ id: product._id, updatedProduct }));
      alert("Product updated!");
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

     
      <h3 className="text-2xl font-semibold mb-4">Orders</h3>
      {ordersLoading && <p>Loading orders...</p>}
      {ordersError && <p className="text-red-500">{ordersError}</p>}
      {!ordersLoading && orders.length > 0 ? (
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Order ID</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Products</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">{order.user?.name || "N/A"}</td>
                  <td className="border p-2">
                    {order.orderItems?.map((item) => (
                      <div key={item._id || item.product}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">${order.totalPrice}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="border p-2 flex gap-2">
                    {order.orderStatus !== "Delivered" && (
                      <button
                        onClick={() => handleDeliver(order._id)}
                        className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !ordersLoading && <p>No orders found.</p>
      )}

  
      <h3 className="text-2xl font-semibold mb-4">Products</h3>

     
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h4 className="font-semibold mb-2">Add New Product</h4>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          className="border p-1 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image[0]?.url}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: [{ url: e.target.value, public_id: "manual" }] })
          }
          className="border p-1 mr-2 mb-2"
        />
        <button
          onClick={handleCreateProduct}
          className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
        >
          Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!productsLoading && products.map((product) => (
          <div key={product._id} className="bg-white rounded shadow p-4 hover:shadow-2xl transition">
            <img
              src={product.image[0]?.url}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleUpdateProduct(product)}
                className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
