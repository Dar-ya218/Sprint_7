import "./App.css";
import { checkboxData } from "./component/checkboxData";
import { useState, useEffect, SetStateAction } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

function CustomInput({ value, onIncrement, onDecrement, onChange }) {
    return (
        <div className="custom-input">
            <button onClick={onDecrement}>
                <FiMinus />
            </button>
            <input type="number" value={value} onChange={onChange} />
            <button onClick={onIncrement}>
                <FiPlus />
            </button>
        </div>
    );
}

function App() {
    const [checkboxState, setCheckboxState] = useState(
        new Array(checkboxData.length).fill(false)
    );
    const [total, setTotal] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const [numLanguages, setNumLanguages] = useState(1);

    useEffect(() => {
      // Cargar los datos del localStorage cuando se inicialice el componente
      const savedCheckboxState = window.localStorage.getItem("checkboxState");
      const savedNumPages = window.localStorage.getItem("numPages");
      const savedNumLanguages = window.localStorage.getItem("numLanguages");
  
      if (savedCheckboxState !== null) {
        setCheckboxState(JSON.parse(savedCheckboxState));
      }
  
      if (savedNumPages !== null) {
        setNumPages(parseInt(savedNumPages));
      }
  
      if (savedNumLanguages !== null) {
        setNumLanguages(parseInt(savedNumLanguages));
      }
    }, []);

    useEffect(() => {
      // Guardar los datos actualizados en el localStorage cada vez que haya cambios
    window.localStorage.setItem("checkboxState", JSON.stringify(checkboxState)); //lo convierte en string
    localStorage.setItem("numPages", JSON.stringify(numPages));
    localStorage.setItem("numLanguages", JSON.stringify(numLanguages));
    console.log(localStorage.getItem('numPages'));
    console.log(localStorage.getItem('numLanguages'));

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
        // Creamos un nuevo estado basado en el estado actual
        const newState = checkboxState.map((estado, i) => {
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

    //Definir las funciones handleWebPagesChange y handleWebLanguagesChange para manejar los cambios en los inputs de páginas e idiomas:
    const handleNumPagesChange = (value: SetStateAction<number>) => {
        setNumPages(value);
        calculateTotal();
    };

    const handleNumLanguagesChange = (value: SetStateAction<number>) => {
        setNumLanguages(value);
        calculateTotal();
    };
    return (
        <>
            <h4>¿Que quiere hacer?</h4>
            {/* Iteramos sobre los datos de checkbox y renderizamos los elementos */}
            {checkboxData.map(({ text, price }, index) => {
                return (
                    <div key={index}>
                        <p>
                            <input
                                type="checkbox"
                                id={`checkbox_${index}`}
                                checked={checkboxState[index]}
                                onChange={() => changeState(index)}
                            />
                            <label htmlFor={`checkbox_${index}`}>
                                {text} ({price}€)
                            </label>
                        </p>

                        {index === 0 && checkboxState[index] && (
                            <div className="inputDiv">
                                <div className="rowOne">
                                    <label htmlFor={`webPages_${index}`}>
                                        Número de páginas:
                                    </label>
                                    <CustomInput
                                        value={numPages}
                                        onIncrement={() =>
                                            handleNumPagesChange(numPages + 1)
                                        }
                                        onDecrement={() =>
                                            handleNumPagesChange(numPages - 1)
                                        }
                                        onChange={(e: { target: { value: any; }; }) =>
                                            handleNumPagesChange(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="rowOne">
                                    <label htmlFor={`webLanguages_${index}`}>
                                        Número de idiomas:
                                    </label>
                                    <CustomInput
                                        value={numLanguages}
                                        onIncrement={() =>
                                            handleNumLanguagesChange(
                                                numLanguages + 1
                                            )
                                        }
                                        onDecrement={() =>
                                            handleNumLanguagesChange(
                                                numLanguages - 1
                                            )
                                        }
                                        onChange={(e: { target: { value: any; }; }) =>
                                            handleNumLanguagesChange(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
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
