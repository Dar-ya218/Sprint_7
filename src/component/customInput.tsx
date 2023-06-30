import { FiPlus, FiMinus } from "react-icons/fi";

function CustomInput({ value, onIncrement, onDecrement, onChange }) {
    return (
        <div className="custom-input">
            <button 
            className="orangeButton"
            onClick={onDecrement}>
                <FiMinus />
            </button>
            <input type="text" value={value} onChange={onChange} />
            <button 
            className="orangeButton"
            onClick={onIncrement}>
                <FiPlus />
            </button>
        </div>
    );
}
export default CustomInput