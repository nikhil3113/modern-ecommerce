import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Products from "./pages/product/Products";
import AddProduct from "./pages/admin/AddProduct";
import ProductDetails from "./pages/product/ProductDetails";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/details/:id"  element={<ProductDetails/>}/>
        

        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/admin/update/:id" element={<UpdateProduct/>} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
