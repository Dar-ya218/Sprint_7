import { FC, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaInfoCircle } from 'react-icons/fa';

interface Props{
  numPagesPopup: boolean
  numLanguagesPopup: boolean
}

const HelpButton:FC<Props>=({ numPagesPopup, numLanguagesPopup })=> {
    const [showPopup, setShowPopup] = useState(false);
  
    const getMessage = () => {
      if (numPagesPopup === true) {
        return (
          <div>
            <p>En este componente debe indicar el número de páginas que tendrá su sitio web</p>
          </div>
        );
      }
  
      if (numLanguagesPopup === true) {
        return (
          <div>
            <p>En este componente debe indicar el número de idiomas que tendrá su sitio web</p>
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
