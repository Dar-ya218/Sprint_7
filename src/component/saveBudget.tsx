import React from 'react';
import { Link } from 'react-router-dom';
import { useSaveBudgetLogic } from './saveBudgetLogic';

interface SaveBudgetProps {
  checkboxState: boolean[];
  total: number;
}

const SaveBudget: React.FC<SaveBudgetProps> = ({ checkboxState, total }) => {
  const {
    handleSaveBudget,
    handleSortAlphabetically,
    handleSortByDate,
    handleResetSort,
    handleSearch,
    nombrePresupuesto,
    setNombrePresupuesto,
    nombreCliente,
    setNombreCliente,
    savedBudgets,
    isSortedAlphabetically,
    setIsSortedAlphabetically,
    isSortedByDate,
    setIsSortedByDate,
    searchQuery,
    setSearchQuery,
    filteredBudgets,
    setFilteredBudgets,
  } = useSaveBudgetLogic({ checkboxState, total });

  return (
    <div>
      <div>
        <p>Nombre de presupuesto</p>
        <input
          type="text"
          className="presupuestoImput"
          value={nombrePresupuesto}
          onChange={(e) => setNombrePresupuesto(e.target.value)}
        />
      </div>
      <div>
        <p>Nombre de cliente</p>
        <input
          type="text"
          className="clienteImput"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
      </div>
      <div>
        <button>
          <Link to="/presupuesto">Atras</Link>
        </button>
        <button onClick={handleSaveBudget}>Enviar</button>
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
      </div>
    </div>
  );
};

export default SaveBudget;
