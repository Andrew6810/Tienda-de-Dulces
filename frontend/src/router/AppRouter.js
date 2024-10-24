import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../components/Home";

const AppRouter = () => {
  return (
      <><Routes>
      <Route path="/" component={<Home />} exact />
    </Routes></>
  );
}

export default AppRouter;