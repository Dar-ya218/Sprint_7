import "./App.css";
import { checkboxData } from "./component/checkboxData";
import {useState} from "react"

function App() {
  const [checkboxState, setCheckboxState]= useState(
    new Array(checkboxData.length).fill(false)
  );
  const [total, setTotal] = useState(0);

  const changeState = (index: number) => {
const newState = checkboxState.map((estado, i)=>{
if (index===i) {
  estado = !estado;
}
return estado;
});
setCheckboxState(newState);

const totalPrice = newState.reduce(
  (sum, currentState, index)=>{
    if (currentState === true){
      return sum + checkboxData[index].price;
    }
    return sum;
  },0);
  setTotal(totalPrice);
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
            )
          })}
          <p>Total:{total}</p>
        </>
    );
}

export default App;
