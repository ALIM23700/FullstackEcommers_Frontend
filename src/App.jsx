import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Nav from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

         <Route
          path="/product/:id"
          element={
            <PrivateRoute>
            <ProductDetails></ProductDetails>
            </PrivateRoute>
          }
        />
        
         <Route
          path="/cart"
          element={
            <PrivateRoute>
             <Cart></Cart>
            </PrivateRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
          <Route
          path="/profile"
          element={
            <PrivateRoute>
             <Profile></Profile>
            </PrivateRoute>
          }
        />
          <Route
          path="/checkout"
          element={
            <PrivateRoute>
             <Checkout></Checkout>
            </PrivateRoute>
          }
        />
          <Route
          path="/payment"
          element={
            <PrivateRoute>
             <Payment></Payment>
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;