import "./App.css";
import { checkboxData } from "./component/checkboxData";
import {useState} from "react"

function App() {
  const [checkboxState, setCheckboxState]= useState(
    new Array(checkboxData.length).fill(false)
  );
  const [total, setTotal] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [numLanguages, setNumLanguages] = useState(0);

  const changeState = (index: number) => {
const newState = checkboxState.map((estado, i)=>{
if (index === i) {
  estado = !estado;
}
return estado;
});
setCheckboxState(newState);

const totalPrice = newState.reduce((sum, currentState, index)=>{
    if (currentState === true){
      return sum + checkboxData[index].price;
    }
    return sum;
  },0);

    const webPageCost = numPages * numLanguages * 30;

  setTotal(totalPrice + webPageCost || 0);
};

const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(event.target.value);
  setNumPages(value || 0);
};

const handleNumLanguagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(event.target.value);
  setNumLanguages(value || 0);
};
    return (
        <>
            <h4>¿Que quiere hacer?</h4>
          {checkboxData.map(({text}, index)=>{
            return(
              <p key={index}>
                <input 
                type="checkbox" 
                id={`checkbox ${index}`} 
                checked={checkboxState[index]} 
                onChange={()=>changeState(index)}
                /> 
                <label htmlFor={`checkbox ${index}`}>{text}</label>
              </p>
            );
          })}
        <div className="adjustment">
        <h4>Ajustar página web</h4>
        <p>
        <label htmlFor="numPages">Número de páginas:</label>
        <input
          type="number"
          id="numPages"
          value={numPages}
          onChange={handleNumPagesChange}
        />
        </p>
        <p>
        <label htmlFor="numLanguages">Número de idiomas:</label>
        <input
          type="number"
          id="numLanguages"
          value={numLanguages}
          onChange={handleNumLanguagesChange}
        />
        </p>
      </div>
      
          <p>Total:{total}</p>
        </>
    );
}

export default App;
