
import Headerr from "./component/header";
import LOGIN from "./component/login";
import AppFooter from "./component/footer";
import Password from './component/password';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import REGISTER from "./component/register"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/header" element={<Headerr/>} />
      </Routes>
      <Routes>
        <Route path="/footer" element={<AppFooter/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<LOGIN/>} />
        <Route path="/api/customers/resetPassword/:resetToken" element={<Password/>}/>
        <Route path="/api/customers/validate/:verificationToken" element={<REGISTER/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
