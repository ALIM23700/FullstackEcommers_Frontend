import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Footer from '../src/components/Footer'
import Nav from "./components/NavBar"


function App() {
  

  return (
  
      <div>
          <BrowserRouter>
                 <Nav></Nav>
        
        <Routes>
           <Route path="/" element={<Home></Home>}></Route>
           <Route path="/register" element={<Register></Register>}></Route>
           <Route path="/login" element={<Login></Login>}></Route>
           <Route path="/product" element={<Product></Product>}></Route>
           <Route path="/contact" element={<Contact></Contact>}></Route>
           <Route path="/about" element={<About></About>}></Route>


        </Routes>
            <Footer></Footer>
          </BrowserRouter>
      </div>
      
  )
}

export default App
