import React, { useState, useEffect } from "react";
import HelpButton from "../component/helpbutton";
import CustomInput from "../component/customInput";
import SaveBudget from "../component/saveBudget";


function CalculationScreen() {
    const checkboxData = [
        { text: "Una página web", price: 500 },
        { text: "Una campaña SEO", price: 300 },
        { text: "Una campaña de publicidad", price: 200 },
    ];

    const [checkboxState, setCheckboxState] = useState(
        new Array(checkboxData.length).fill(false)
    );
    const [total, setTotal] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const [numLanguages, setNumLanguages] = useState(1);

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

    // Definir las funciones handleNumPagesChange y handleNumLanguagesChange para manejar los cambios en los inputs de páginas e idiomas:
    const handleNumPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
        setNumPages(value||1);
    };

    const handleNumLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
        setNumLanguages(value||1);
    };

    const increasePages = () => {
      setNumPages (numPages + 1)
    }
    
    const decreasePages = () => {
      if (numPages === 1) {
        setNumPages(numPages)
      } else {
        setNumPages (numPages - 1)
      }
    }

    const increaseLanguages = () => {
      setNumLanguages (numLanguages + 1)
    }

    const decreaseLanguages = () => {
      if (numPages === 1) {
        setNumLanguages(numLanguages)
      } else {
        setNumLanguages (numLanguages - 1)
      }
    }

    //========================LOCAL STORAGE=================================
    useEffect(() => {
        // Cargar los datos del localStorage cuando se inicialice el componente
        const savedCheckboxState = window.localStorage.getItem("checkboxState");
        const savedNumPages = window.localStorage.getItem("numPages");
        const savedNumLanguages = window.localStorage.getItem("numLanguages");
        const savedTotal = window.localStorage.getItem("total");

        if (savedCheckboxState !== null) {setCheckboxState(JSON.parse(savedCheckboxState));}
        if (savedNumPages !== null) {setNumPages(JSON.parse(savedNumPages));}
        if (savedNumLanguages !== null) {setNumLanguages(JSON.parse(savedNumLanguages));}
        if (savedTotal !== null) {setTotal(JSON.parse(savedTotal));}
    }, []);

    useEffect(() => {
        // Guardar los datos actualizados en el localStorage cada vez que haya cambios
        window.localStorage.setItem("numPages", JSON.stringify(numPages));
        window.localStorage.setItem("numLanguages",JSON.stringify(numLanguages));
        window.localStorage.setItem("checkboxState",JSON.stringify(checkboxState));
        window.localStorage.setItem("total",JSON.stringify(total));

        calculateTotal();
    }, [numPages, numLanguages, checkboxState, total]);
    //=============================================================================

    return (
        <div>
            <h4>¿Qué quiere hacer?</h4>
            {/* Iteramos sobre los datos de checkbox y renderizamos los elementos */}
            {checkboxData.map(({ text, price }, index) => (
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
                                    onIncrement={increasePages}
                                    onDecrement={decreasePages}
                                    onChange={handleNumPagesChange}
                                />
                                <HelpButton numPagesPopup={true} numLanguagesPopup={false} />
                            </div>
                            <div className="rowOne">
                                <label htmlFor={`webLanguages_${index}`}>
                                    Número de idiomas:
                                </label>
                                <CustomInput
                                    value={numLanguages}
                                    onIncrement={increaseLanguages}
                                    onDecrement={decreaseLanguages}
                                    onChange={handleNumLanguagesChange}
                                />
                                <HelpButton numLanguagesPopup={true} numPagesPopup={false}/>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <p>Total: {total}</p>
              <SaveBudget checkboxState={checkboxState} total={total} />
        </div>
    );
}

export default CalculationScreen;
