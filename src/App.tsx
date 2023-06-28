import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import CalculationScreen from "./pages/calculationScreen";
import SaveBudget from './pages/saveBudget'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/presupuesto" element={<CalculationScreen />} />
        <Route path="/saveBudget" element={<SaveBudget/>} />
      </Routes>
    </Router>
  );
}

export default App;