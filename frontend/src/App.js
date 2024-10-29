import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CartPage from './pages/CartPage';
import PayPage from './pages/PayPage';
import ShippingForm from './pages/ShippingForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PayPage />} />
          <Route path="/form" element={<ShippingForm />} />
      </Routes>
    </div>
  );
}

export default App;
