
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../App/Features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-red-500">
          Product not found
        </h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">

          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-5 sm:p-8">
            {product.image && product.image.length > 0 ? (
              <img
                src={product.image[0].url}
                alt={product.name}
                className="w-full max-w-md h-64 sm:h-80 md:h-96 object-contain rounded-xl"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-200 rounded-xl">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <span className="w-fit px-3 py-1 mb-3 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
              {product.category}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h2>

            <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-5">
              ৳{product.price}
            </p>

            <div className="border-t border-gray-200 pt-5 mb-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-7">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-6 space-y-3">
              <div className="flex justify-between items-center gap-4">
                <span className="font-semibold text-gray-700">
                  Category
                </span>

                <span className="text-gray-600 text-right">
                  {product.category}
                </span>
              </div>

              <div className="border-t border-gray-200"></div>

              <div className="flex justify-between items-center gap-4">
                <span className="font-semibold text-gray-700">
                  Stock
                </span>

                <span className="text-gray-600">
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition duration-200 shadow-sm"
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

