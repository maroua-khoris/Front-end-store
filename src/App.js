import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./container/HomePage";
import CartView from "./container/checkoutPage.js";
import Footer from "./component/footer/footer.js";
import EmptyCard from "./component/emptyCard/EmptyCard.jsx";
import WishList from "./component/wishList/WishList.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/empty-card" element={<EmptyCard />} />
          <Route path="/wish-list" element={<WishList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
