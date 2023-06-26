import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function HelpButton({ numPages }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div>
            <button onClick={() => setShowPopup(true)}>
                <i className="fa fa-info-circle"></i>
            </button>
            <Popup open={showPopup} onClose={() => setShowPopup(false)}>
                <div>
                    <h3>Información del servicio</h3>
                    <p>
                        En este componente debe indicar el numero de paginas que
                        tendra su sitio web.
                    </p>
                    <p>Número de páginas seleccionadas: {numPages}</p>
                </div>
            </Popup>
        </div>
    );
}
export default HelpButton;
