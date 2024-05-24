// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "../components/siderbar/Siderbar";
import DashboardHongos from "../components/mushrooms/general/DashboardHongos";
import General from "../components/general/general";
import ComparationValues from "../components/mushrooms/comparation/ComparationValues";
import DashboardInvernadero1 from "../components/invernadero2/general/DashboardInvernadero2";
import DashboardInvernadero3 from "../components/invernadero3/general/DashboardInvernadero3";
//import ComparationValues from '../components/mushrooms/comparation/ComparationValues';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Sidebar Dashboard={General} />} />
        <Route
          path="/dashboard/mushroom"
          element={<Sidebar Dashboard={DashboardHongos} />}
        />
        <Route
          path="/dashboard/comparation_mushroom"
          element={<Sidebar Dashboard={ComparationValues} />}
        />
        <Route
          path="/dashboard/tomato_wifi"
          element={<Sidebar Dashboard={DashboardInvernadero1} />}
        />

        <Route
          path="/dashboard/comparation_tomato_wifi"
          element={<Sidebar Dashboard={DashboardInvernadero1} />}
        />
        <Route
          path="/dashboard/tomato_lora"
          element={<Sidebar Dashboard={DashboardInvernadero3} />}
        />
        <Route
          path="/dashboard/comparation_tomato_lora"
          element={<Sidebar Dashboard={ComparationValues} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
