import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CategoriesPage from './container/categoriesPage'; 
import Home from "./container/HomePage";
import CartView from "./container/checkoutPage.js";
import Header from "./component/header/header.js";
import Footer from "./component/footer/footer.js";
import { Provider } from "react-redux";
import { store } from "./store.js";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/category/:name"
                        element={<CategoriesPage/>}/>
        <Route path="/" 
                      element={<Home />} />
        <Route path="/cart" 
                      element={<CartView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
