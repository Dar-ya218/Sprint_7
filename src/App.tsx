import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './component/WelcomeScreen';
import CalculationScreen from "./component/calculationScreen";

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