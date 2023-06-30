import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import CalculationScreen from "./pages/calculationScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/presupuesto" element={<CalculationScreen />} />
      </Routes>
    </Router>
  );
}

export default App;