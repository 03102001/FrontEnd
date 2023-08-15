import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from './pages/Signin';
import Users from "./pages/Users";
import Gatepass from "./pages/Gatepass";
import Product from "./pages/Product";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddGatepass from "./pages/AddGatepass";
import EditGatepass from "./pages/EditGatepass";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ItIs from "./pages/ItIs";
import ItDi from "./pages/ItDi";
import ItSi from "./pages/ItSi";
import ItIt from "./pages/ItIt";
import SiSi from "./pages/SiSi";
import Popup from "./pages/Popup";
import { listen } from './features/listener';
import GuestOnlyRoute from "./components/GuessOnly";
import GuardRoute from "./components/GuardRoute";

function App() {

  useEffect(() => {
    listen();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='login'
            element={
              <GuestOnlyRoute>
                <Signin />
              </GuestOnlyRoute>
            }
          />
          <Route
            path='/'
            element={
              <>
                <GuardRoute />
              </>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/gatepass" element={<Gatepass />} />
            <Route path="/gatepass/add" element={<AddGatepass />} />
            <Route path="/gatepass/edit/:GatepassID" element={<EditGatepass />} />
            <Route path="/gatepass/getData/:GatepassID" element={<EditGatepass />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/update/:id" element={<EditProduct />} />
            <Route path="/it-is" element={<ItIs />} />
            <Route path="/it-is/:dept/:refNo" element={<ItIs />} />
            <Route path="/it-di" element={<ItDi />} />
            <Route path="/it-si" element={<ItSi />} />
            <Route path="/it-it" element={<ItIt />} />
            <Route path="/it-it/:dept/:refNo" element={<ItIt />} />
            <Route path="/si-si" element={<SiSi />} />
            <Route path="/popup" element={<Popup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;