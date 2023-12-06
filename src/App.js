import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CategoriesPage from './container/categoriesPage'; 
import Home from "./container/HomePage";
import CartView from "./container/checkoutPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/category/:name"
                        element={<CategoriesPage/>}/>
        <Route path="/" 
                      element={<Home />} />
        <Route path="/cart" 
                      element={<CartView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
