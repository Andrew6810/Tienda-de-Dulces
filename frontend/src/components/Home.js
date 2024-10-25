import Carousel from "./Carousel";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Carousel />
        <ProductList />
      </header>
    </div>
  );
}

export default Home;