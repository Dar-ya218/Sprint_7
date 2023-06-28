import { FiPlus, FiMinus } from "react-icons/fi";

function CustomInput({ value, onIncrement, onDecrement, onChange }) {
    return (
        <div className="custom-input">
            <button onClick={onDecrement}>
                <FiMinus />
            </button>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={onIncrement}>
                <FiPlus />
            </button>
        </div>
    );
}
export default CustomInput