import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../App/Features/cartSlice"; 
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return <h2 className="text-center text-red-500 mt-10">Product not found</h2>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
        <div className="flex justify-center">
          {product.image && product.image.length > 0 ? (
            <img
              src={product.image[0].url}
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-full max-w-md h-72 flex items-center justify-center bg-gray-200 rounded-xl">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

      
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex flex-col gap-1 text-gray-600 text-sm">
            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
