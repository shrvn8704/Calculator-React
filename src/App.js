import { useReducer } from "react"; 
import "./style.css"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton";
export const ACTION={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'

}
function reducer(state,{type,payload}){ 
  switch(type){
    case ACTION.ADD_DIGIT:
      if (payload.digit=== "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit=== "." && state.currentOperand.includes(".")){
         return state
        }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
  }

}
function App() {
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">

        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
        <button className="span-two" onClick={() => dispatch({type: ACTION.CLEAR})}>AC</button>
        <button>DEL</button> 
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({type:ACTION})}>=</button>


          
    </div>
  );
}

export default App;
