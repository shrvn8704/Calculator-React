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
      if(state.overwrite == true){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite: false
        }
      }
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
    case ACTION.CHOOSE_OPERATION:
        if( state.previousOperand === null && state.currentOperand=== null){ //initial case with no input
          return state
        }
        if(state.currentOperand == null) {       //change operand from already entered mistaken operand
          return{
            ...state,
            operation: payload.operation,
          }
        }
        if( state.previousOperand == null){       //make current operand with the operation as the previous operand and set current to null
          return{
            ...state,
            operation:payload.operation,
            previousOperand:state.currentOperand,
            currentOperand:null
          }
        }
        return{
          ...state,
          previousOperand:evaluate(state),          //default case to evaluate the prev and current and then set that result as prev and  give null operand as current
          operation:payload.operation,
          currentOperand:null
        }
    case ACTION.CLEAR:
      return {}
    case ACTION.DELETE_DIGIT:
      if(state.overwrite == true){return {
        ...state,
        overwrite:false,
        currentOperand:null
      }
    }
    if(state.currentOperand==null){return state}
    if(state.currentOperand.length === 1){return{
      ...state,
      currentOperand:null
    }}

  return{
    ...state,
    currentOperand: state.currentOperand.slice(0,-1)
  }
    case ACTION.EVALUATE:
      if(state.operation == null || state.previousOperand == null && state.current == null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        operation:null,
        currentOperand:evaluate(state)
      }
  }

}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{maximumFractionDigits:0})

function formatOperand(operand){
  if(operand == null){return }
  const[integer,decimal] = operand.split(".")
  if(decimal == null){
    return INTEGER_FORMATTER.format(integer)
  }
}

function evaluate({currentOperand , previousOperand , operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation="";
  switch(operation){
    case "+" :
      computation = prev+current
      break
    case "-":
      computation = prev-current
      break
    case "*":
      computation = prev*current
      break
    case "÷":
      computation = prev/current
  }
  return computation.toString()

}
function App() {
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">

        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
        <button className="span-two" onClick={() => dispatch({type: ACTION.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTION.DELETE_DIGIT})}>DEL</button> 
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
        <button className="span-two" onClick={() => dispatch({type: ACTION.EVALUATE})}>=</button>


          
    </div>
  );
}

export default App;
