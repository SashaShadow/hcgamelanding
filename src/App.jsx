
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeVite from "./pages/HomeVite/HomeVite.jsx"
import Login from "./pages/Login/Login.jsx"
import Admin from "./pages/Admin/Admin.jsx"
import Unsubscribe from "./pages/Unsubscribe/Unsubscribe.jsx"
import { SessionContext } from "./context/SessionContext.jsx";
import { ScreenMsgProvider } from "./utils/screenMsg.jsx";
import Redireccionador from "./pages/Redireccionador/Redireccionador.jsx"

function App() {

  return (
    <ScreenMsgProvider>
      <SessionContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeVite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ctrl" element={<Admin />} />
            <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
            <Route path='/discord' element={<Redireccionador sitio="discord" />} />
            <Route path='/steam' element={<Redireccionador sitio="steam" />} />

            <Route path="*" element={<HomeVite />} />

          </Routes>
        </BrowserRouter>
      </SessionContext>
    </ScreenMsgProvider>
  );
}

export default App
