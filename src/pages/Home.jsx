import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import alim from "../assets/alimvai.jpg";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/product");
    } else {
      alert("Please login to access the page");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-center bg-cover bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${alim})`,
      }}
    >
    
      <div className="absolute inset-0 bg-black/50"></div>

    
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
          Welcome to <span className="text-blue-400">Alim e-Store</span>
        </h1>

        <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-100 font-light">
          Discover the best products and feel free to shop with confidence.
        </p>

        <button
          onClick={handleGetStarted}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

     
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
  );
};

export default Home;
