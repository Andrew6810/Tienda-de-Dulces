import Header from './components/Header';
import Carousel from './components/Carousel';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header />
      <Carousel />
      <ProductList />
      </header>
    </div>
  );
}

export default App;
