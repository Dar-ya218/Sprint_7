import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaInfoCircle } from 'react-icons/fa';

function HelpButton({ numPages, numLanguages }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <button 
            className="popup-button"
            onClick={() => setShowPopup(true)}>
            <FaInfoCircle /> {/* Icono de información */}
            </button>
            <Popup
            className="popup-mesage"
            open={showPopup} onClose={() => setShowPopup(false)}
           >
                <div>
                {numPages && (
            <div>
              <h3>Información del servicio (Número de páginas)</h3>
              <p>En este componente debe indicar el número de páginas que tendrá su sitio web</p>
              <p>Número de páginas seleccionadas: {numPages}</p>
            </div>
          )}
          {numLanguages && (
            <div>
              <h3>Información del servicio (Número de idiomas)</h3>
              <p>En este componente debe indicar el número de idiomas que tendrá su sitio web</p>
              <p>Número de idiomas seleccionados: {numLanguages}</p>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
}
export default HelpButton;
