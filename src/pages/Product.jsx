import { useEffect, useState } from "react"; 
import { fetchProducts } from "../App/Features/productSlice"; 
import { useSelector, useDispatch } from "react-redux";  
import { addToCart } from "../App/Features/cartSlice"; 
import { useNavigate } from "react-router-dom"; 

const Product = () => {   
  const { isLoading, products, error } = useSelector((state) => state.products);   
 console.log(products)
  const dispatch = useDispatch();    
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filters = {};
    if (category) filters.category = category;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (search) filters.search = search;

    dispatch(fetchProducts(filters));
  }, [dispatch, category, minPrice, maxPrice, search]);    

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (     
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center">
          <h3 className="font-semibold mb-2">Category</h3>
          {["", "watch", "sunglass", "bag", "cap"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full mb-2 transition-colors ${
                category === cat ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat === "" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center">
          <h3 className="font-semibold mb-2">Min Price</h3>
          <input 
            type="number" 
            placeholder="e.g. 100" 
            className="p-2 border rounded w-full"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center">
          <h3 className="font-semibold mb-2">Max Price</h3>
          <input 
            type="number" 
            placeholder="e.g. 1000" 
            className="p-2 border rounded w-full"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center">
          <h3 className="font-semibold mb-2">Search</h3>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="p-2 border rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <h3 className="text-lg font-semibold text-center">Loading...</h3>}       
      {error && <h3 className="text-red-500 font-semibold text-center">{error}</h3>}       

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {products && products.map((product) => (                             
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-shadow duration-300 w-full max-w-[260px] flex flex-col overflow-hidden"
          >
            {product.image && product.image.length > 0 && (
              <div className="h-52 overflow-hidden">
                <img
                  src={product.image[0].url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
              <p className="text-gray-600 font-medium">Price: ${product.price}</p>

              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleViewDetails(product._id)}
                  className="flex-1 bg-gray-600 text-white font-semibold py-2 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>                  
        ))}
      </div>
    </div>   
  ); 
};  

export default Product;