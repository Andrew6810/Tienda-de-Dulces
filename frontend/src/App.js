import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
