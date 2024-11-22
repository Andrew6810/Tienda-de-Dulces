import Header from './components/Header';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import CartPage from './pages/CartPage';
import PayPage from './pages/PayPage';
import ShippingForm from './pages/ShippingForm';
import ReportPage from './pages/ReportPage';
import AdminLogin from './pages/AdminLogin';

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ["/report", "/login"];
  return (
    <div className="App">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PayPage />} />
          <Route path="/form" element={<ShippingForm />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
