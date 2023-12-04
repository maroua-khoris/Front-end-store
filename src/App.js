import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./container/HomePage";
import CartView from "./container/cartPage";
import Checkout from "./container/checkoutPage.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
