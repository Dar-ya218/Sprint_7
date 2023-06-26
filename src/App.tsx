import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './component/WelcomeScreen';
import CalculationScreen from "./component/calculationScreen";
import HelpButton from "./component/helpbutton.";

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