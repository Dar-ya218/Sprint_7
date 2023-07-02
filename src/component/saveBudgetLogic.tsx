import { useState, useEffect } from 'react';
import { saveDataToLocalStorage, getDataFromLocalStorage } from './LocalStorageUtils';

// Definimos la interfaz Budget para representar un objeto de presupuesto.
interface Budget {
  name: string;
  client: string;
  service: boolean[];
  total: number;
  date: Date;
}

// Definimos la interfaz SaveBudgetLogicProps que representa las props del componente SaveBudget.
interface SaveBudgetLogicProps {
  checkboxState: boolean[];
  total: number;
  handleSaveBudget: () => void;
  handleSortAlphabetically: () => void;
  handleSortByDate: () => void;
  handleResetSort: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nombrePresupuesto: string;
  setNombrePresupuesto: React.Dispatch<React.SetStateAction<string>>;
  nombreCliente: string;
  setNombreCliente: React.Dispatch<React.SetStateAction<string>>;
  savedBudgets: Budget[];
  setSavedBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  isSortedAlphabetically: boolean;
  setIsSortedAlphabetically: React.Dispatch<React.SetStateAction<boolean>>;
  isSortedByDate: boolean;
  setIsSortedByDate: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredBudgets: Budget[];
  setFilteredBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

// Exportamos función personalizada useSaveBudgetLogic que recibe como argumento un objeto
export const useSaveBudgetLogic = ({
  checkboxState,
  total,
}: {
  checkboxState: boolean[];
  total: number;
}): SaveBudgetLogicProps => {
   // Usamos useState para crear varios estados y sus funciones para actualizarlos.
  const [nombrePresupuesto, setNombrePresupuesto] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    // Cargar los presupuestos guardados al cargar el componente
    const savedBudgetsFromLocalStorage = getDataFromLocalStorage();
    setSavedBudgets(savedBudgetsFromLocalStorage);
  }, []);

  useEffect(() => {
    // Guardar los presupuestos en el localStorage cuando cambie el estado de savedBudgets
    saveDataToLocalStorage(savedBudgets);
  }, [savedBudgets]);

   // Función para limpiar los valores de los checkboxes
   const clearCheckboxes = () => {
    const checkboxState = [false, false, false];
    const numPages = 1;
    const numLanguages = 1;
  
    saveDataToLocalStorage({ checkboxState, numPages, numLanguages });
  };
  

  // Función para manejar el evento de guardar el presupuesto.
  const handleSaveBudget = () => {
    const newBudget: Budget = {
      name: nombrePresupuesto,
      client: nombreCliente,
      service: checkboxState,
      total: total,
      date: new Date(),
    };

    const updatedBudgets = [...savedBudgets, newBudget];
    setSavedBudgets(updatedBudgets);

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

  // Retornamos un objeto con todas las props y estados necesarios para el componente SaveBudget.
  return {
    checkboxState,
    total,
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
    setSavedBudgets,
    isSortedAlphabetically,
    setIsSortedAlphabetically,
    isSortedByDate,
    setIsSortedByDate,
    searchQuery,
    setSearchQuery,
    filteredBudgets,
    setFilteredBudgets,
  };
};
