import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Home from "./container/HomePage";
import CartView from "./container/checkoutPage.js";
import Header from "./component/header/Header.jsx";
import Footer from "./component/footer/footer.js";
import EmptyCard from "./component/emptyCard/EmptyCard.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/empty-card" element={<EmptyCard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
