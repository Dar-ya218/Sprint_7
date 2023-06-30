import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Budget {
    name: string;
    client: string;
    service: boolean[];
    total: number;
    date: Date;
  }
  
  interface SaveBudgetProps {
    checkboxState: boolean[];
    total: number;
  }
  
  const SaveBudget: React.FC<SaveBudgetProps> = ({ checkboxState, total }) => {
    const [nombrePresupuesto, setNombrePresupuesto] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  
    function clearCheckboxes(){
      window.localStorage.setItem("checkboxState",JSON.stringify([false, false, false]));
      window.localStorage.setItem("numPages", JSON.stringify(1));
      window.localStorage.setItem("numLanguages",JSON.stringify(1));
    }

    const handleSaveBudget = () => {
      const newBudget: Budget = {
        name: nombrePresupuesto,
        client: nombreCliente,
        service: checkboxState,
        total: total,
        date: new Date(),
      };
  
      setSavedBudgets([...savedBudgets, newBudget]);
  
      setNombrePresupuesto('');
      setNombreCliente('');
      clearCheckboxes();
    };
    
  
    return (
      <div>
        <div>
          <p>Nombre de presupuesto</p>
          <input
            type="text"
            className="presupuestoImput"
            value={nombrePresupuesto}
            onChange={(e) => setNombrePresupuesto(e.target.value)} // Use setNombrePresupuesto to update the state
          />
        </div>
        <div>
          <p>Nombre de cliente</p>
          <input
            type="text"
            className="clienteImput"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)} // Use setNombreCliente to update the state
          />
        </div>
        <div>
          <button >
            <Link to="/presupuesto">Atras</Link>
          </button>
          <button 
          onClick={handleSaveBudget}>Enviar</button>
        </div>
        <div>
          <h2>Presupuestos guardados:</h2>
          <ul>
            {savedBudgets.map((budget, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {budget.name}
                <br />
                <strong>Cliente:</strong> {budget.client}
                <br />
                <strong>Servicio:</strong> {budget.service}
                <br />
                <strong>Total:</strong> {budget.total}
                <br />
                <strong>Fecha:</strong> {budget.date.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
    
    export default SaveBudget;

              