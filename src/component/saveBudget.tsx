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
    const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
    const [isSortedByDate, setIsSortedByDate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);


  
    const clearCheckboxes =()=>{
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
    
   
    const handleSortAlphabetically = () => {
      const sorted = [...savedBudgets].sort((a, b) => a.name.localeCompare(b.name));
      setSavedBudgets(sorted);
      setIsSortedAlphabetically(!isSortedAlphabetically);
      setIsSortedByDate(false);
    };
    

    const handleSortByDate = () => {
      const sorted = [...savedBudgets].sort((a, b) => a.date.getTime() - b.date.getTime());
      setSavedBudgets(sorted);
      setIsSortedByDate(!isSortedByDate);
      setIsSortedAlphabetically(false);
    };
    

  const handleResetSort = () => {
    setIsSortedAlphabetically(false);
    setIsSortedByDate(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    const filtered = savedBudgets.filter((budget) =>
      budget.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBudgets(filtered);
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
          <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar presupuestos"
          />
          <button onClick={handleSortAlphabetically}>
            {isSortedAlphabetically ? 'Desactivar orden alfabético' : 'Ordenar alfabéticamente'}
          </button>
          <button onClick={handleSortByDate}>
            {isSortedByDate ? 'Desactivar orden por fecha' : 'Ordenar por fecha'}
          </button>
          <button onClick={handleResetSort}>Reinicializar el orden</button>
        </div>
          <ul>
          <ul>
  {searchQuery === '' ? (
    savedBudgets.map((budget, index) => (
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
    ))
  ) : (
    filteredBudgets.map((budget, index) => (
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
    ))
  )}
</ul>

          </ul>
        </div>
      </div>
    );
  };
  
    
    export default SaveBudget;

              