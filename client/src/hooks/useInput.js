import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);
  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }
  function handleInputBlur() {
    setDidEdit(true);
  }
  function handleResetState() {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }
  return {
    value: enteredValue,
    handleResetState,
    handleInputChange,
    handleInputBlur,
    setEnteredValue,
    hasError: didEdit && !valueIsValid,
  };
}
