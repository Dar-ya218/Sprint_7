import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SaveBudget() {
    const [nombrePresupuesto, setNombrePresupuesto] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
  


    const handleNombrePresupuesto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.value)
        setNombrePresupuesto(value);
      };

    const handleNombreCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.value)
        setNombreCliente(value);
      };  

    //========================LOCAL STORAGE=================================
    useEffect(() => {
        // Cargar los datos del localStorage cuando se inicialice el componente
        const savedNombrePresupuesto = window.localStorage.getItem("nombrePresupuesto");
        const savedNombreCliente = window.localStorage.getItem("nombreCliente");
      

        if (savedNombrePresupuesto !== null) {setNombrePresupuesto(JSON.parse(savedNombrePresupuesto));}
        if (savedNombreCliente !== null) {setNombreCliente(JSON.parse(savedNombreCliente));}
    }, []);

    useEffect(() => {
        // Guardar los datos actualizados en el localStorage cada vez que haya cambios
        window.localStorage.setItem("nombrePresupuesto", JSON.stringify(nombrePresupuesto));
        window.localStorage.setItem("nombreCliente",JSON.stringify(nombreCliente));

    }, [nombrePresupuesto, nombreCliente ]);
    //=============================================================================

    return(
        <div>
            <div>
                <p>Nombre de presupuesto</p>
                <input 
                type="text" 
                className='presupuestoImput'
                value={nombrePresupuesto}
                onChange={handleNombrePresupuesto}
                />
            </div>
            <div>
                <p>Nombre de cliente</p>
                <input 
                type="text" 
                className='clienteImput'
                value={nombreCliente}
                onChange={handleNombreCliente}
                />
            </div>
            <div>
                <button className='start'>
                <Link to ='/presupuesto' >Atras</Link>
                </button>
              

            </div>
        </div>
    );
}
export default SaveBudget