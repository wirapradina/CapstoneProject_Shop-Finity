import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Products from './component/Products';
import { Routes, Route } from 'react-router-dom';
import Product from './component/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './component/ProductDetail';

function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
