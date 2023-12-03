import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CategoriesPage from './container/categoriesPage'; // Adjust the path accordingly

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/category" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
