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

function App() {
  return (
    <ThresholdProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Sidebar Dashboard={General} />} />
          <Route path="/dashboard/mushroom" element={<Sidebar Dashboard={DashboardHongos} />} />
          <Route path="/dashboard/comparation_mushroom" element={<Sidebar Dashboard={ComparationValues} />} />
          <Route path="/dashboard/tomato_wifi" element={<Sidebar Dashboard={DashboardInvernadero1} />} />
          <Route path="/dashboard/comparation_tomato_wifi" element={<Sidebar Dashboard={DashboardInvernadero1} />} />
          <Route path="/dashboard/tomato_lora" element={<Sidebar Dashboard={DashboardInvernadero2} />} />
          <Route path="/dashboard/comparation_tomato_lora" element={<Sidebar Dashboard={ComparationValues} />} />
          <Route path="/dashboard/settings" element={<Sidebar Dashboard={Settings} />} />
        </Routes>
      </Router>
    </ThresholdProvider>
  );
}

export default App;
