import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaInfoCircle } from 'react-icons/fa';

function HelpButton({ numPages, numLanguages }) {
    const [showPopup, setShowPopup] = useState(false);
  
    const getMessage = () => {
      if (numPages !== undefined) {
        return (
          <div>
            <h3>Información del número de páginas</h3>
            <p>En este componente debe indicar el número de páginas que tendrá su sitio web</p>
            <p>Número de páginas seleccionadas: {numPages}</p>
          </div>
        );
      }
  
      if (numLanguages !== undefined) {
        return (
          <div>
            <h3>Información del número de idiomas</h3>
            <p>En este componente debe indicar el número de idiomas que tendrá su sitio web</p>
            <p>Número de idiomas seleccionados: {numLanguages}</p>
          </div>
        );
      }
  
      return null;
    };
  
    return (
      <div>
        <button 
          className="popup-button"
          onClick={() => setShowPopup(true)}
        >
        <FaInfoCircle /> {/* Icono de información */}
        </button>
        <Popup open={showPopup} onClose={() => setShowPopup(false)}>
          {getMessage()}
        </Popup>
      </div>
    );
  }
  
export default HelpButton;
