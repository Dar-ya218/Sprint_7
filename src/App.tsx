import "./App.css";
import { checkboxData } from "./component/checkboxData";
import {useState, useEffect} from "react"

function App() {
  const [checkboxState, setCheckboxState]= useState(
    new Array(checkboxData.length).fill(false)
  );
  const [total, setTotal] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);

  useEffect(()=>{
    calculateTotal();
  }, [checkboxState, numPages, numLanguages]);

  const calculateTotal = () => {
    // Calculamos el total sumando los precios de los elementos seleccionados
    let totalPrice = checkboxState.reduce((sum, currentState, index) => {
      if (currentState) {
        return sum + checkboxData[index].price;
      }
      return sum;
    }, 0);
  
    // Si la primera opción está seleccionada, agregamos el costo adicional por páginas e idiomas
    if (checkboxState[0]) {
      totalPrice += numPages * numLanguages * 30;
    }
  
    // Actualizamos el estado total
    setTotal(totalPrice);
  };
  

  const changeState = (index: number) => {
const newState = checkboxState.map((estado, i)=>{
if (index === i) {
  estado = !estado;
}
return estado;
});

// Actualizamos el estado de los checkboxes
setCheckboxState(newState);

// Calculamos el nuevo total
calculateTotal();
};


const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(event.target.value);
  setNumPages(value || 0);
  calculateTotal();
};

const handleNumLanguagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(event.target.value);
  setNumLanguages(value || 0);
  calculateTotal();
};
    return (
        <>
            <h4>¿Que quiere hacer?</h4>
            {/* Iteramos sobre los datos de checkbox y renderizamos los elementos */}
          {checkboxData.map(({text, price}, index)=>{
            return(
              <div key={index}>
                <p>
                <input 
                type="checkbox" 
                id={`checkbox_${index}`} 
                checked={checkboxState[index]} 
                onChange={()=>changeState(index)}
                /> 
                <label htmlFor={`checkbox_${index}`}>{text} ({price}€)</label>
                </p>

                {index === 0 && checkboxState[index] && (
                   <div className="inputDiv">
                    <p>
                      <label htmlFor={`webPages_${index}`}>Número de páginas:</label>
                      <input
                        type="number"
                        className="imputNum"
                        id={`webPages_${index}`}
                        value={numPages}
                        onChange={handleNumPagesChange}
                      />
                    </p>
                    <p>
                      <label htmlFor={`webLanguages_${index}`}>Número de idiomas:</label>
                      <input
                        type="number"
                        className="imputNum"
                        id={`webLanguages_${index}`}
                        value={numLanguages}
                        onChange={handleNumLanguagesChange}
                      />
                    </p>
                    </div>
               )}
             </div>
           );
         })}
         <p>Total: {total}</p>
       </>
     );
    }
export default App;
