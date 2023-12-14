import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CategoriesPage from "./container/categoriesPage";
import Home from "./container/HomePage";
import CartView from "./container/checkoutPage.js";
import Footer from "./component/footer/footer.js";
import EmptyCard from "./component/emptyCard/EmptyCard.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/empty-card" element={<EmptyCard />} />
          <Route path="/category/:name" element={<CategoriesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
