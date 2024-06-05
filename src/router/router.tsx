// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/siderbar/Siderbar';
import DashboardHongos from '../components/mushrooms/general/DashboardHongos';
import General from '../components/general/general';
import ComparationValues from '../components/mushrooms/comparation/ComparationValues';
import DashboardInvernadero1 from '../components/invernadero1/general/DashboardInvernadero1';
import DashboardInvernadero2 from '../components/invernadero2/general/DashboardInvernadero2';
import Settings from '../components/settings/Settings';
import { ThresholdProvider } from '../context/ThresholdContext';
import ComparationValuesInv2 from '../components/invernadero2/comparation/ComparationValuesInv2';
import DashboardInvernadero3 from '../components/invernadero3/general/DashboardInvernadero3';
import ComparationValuesInv3 from '../components/invernadero3/comparation/ComparationValuesInv3';
import ComparationValuesInv1 from '../components/invernadero1/comparation/ComparationValuesInv1';

function App() {
  return (
    <ThresholdProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Sidebar Dashboard={General} />} />
          <Route path="/dashboard/mushroom" element={<Sidebar Dashboard={DashboardHongos} />} />
          <Route path="/dashboard/comparation_mushroom" element={<Sidebar Dashboard={ComparationValues} />} />
          <Route path="/dashboard/invernadero_1" element={<Sidebar Dashboard={DashboardInvernadero1} />} />
          <Route path="/dashboard/comparation_invernadero_1" element={<Sidebar Dashboard={ComparationValuesInv1} />} />
          <Route path="/dashboard/invernadero_2" element={<Sidebar Dashboard={DashboardInvernadero2} />} />
          <Route path="/dashboard/comparation_invernadero_2" element={<Sidebar Dashboard={ComparationValuesInv2} />} />
          <Route path="/dashboard/invernadero_3" element={<Sidebar Dashboard={DashboardInvernadero3} />} />
          <Route path="/dashboard/comparation_invernadero_3" element={<Sidebar Dashboard={ComparationValuesInv3} />} />
          <Route path="/dashboard/settings" element={<Sidebar Dashboard={Settings} />} />
        </Routes>
      </Router>
    </ThresholdProvider>
  );
}

export default App;
