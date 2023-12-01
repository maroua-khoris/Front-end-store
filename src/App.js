import { Header } from "antd/es/layout/layout";
import Headerr from "./component/header";
import AppFooter from "./component/footer";
import {Router, Routes, Route, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/header" element={<Headerr/>} />
      </Routes>
      <Routes>
        <Route path="/footer" element={<AppFooter/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
