import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SaveBudget() {
    const [nombrePresupuesto, setNombrePresupuesto] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');

    return(
        <div>
            <div>
                <p>Nombre de presupuesto</p>
                <input 
                type="text" 
                value={nombrePresupuesto}
                onChange={(e) => setNombrePresupuesto(e.target.value)}
                />
            </div>
            <div>
                <p>Nombre de cliente</p>
                <input 
                type="text" 
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                />
            </div>
            <div>
                <button className='start'>
                <Link to ='/calculationScreen' >Atras</Link>
                </button>
                <br /> <br />
                <button>Enviar</button>
            </div>
        </div>
    );
}
export default SaveBudget