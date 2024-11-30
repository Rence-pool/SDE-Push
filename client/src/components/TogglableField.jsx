import { useState } from "react";
import Input from "./Input";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useInput } from "@/hooks/useInput";
import SelectModal from "./modals/SelectModal";
import PropTypes from "prop-types";
export default function TogglableField({ defaultValue, placeholder, type = "text", inputType = "text", options, setTriggerRefresh }) {
  const constraintsTexts = (value) => {
    return value !== "" && value !== "-" && value !== " ";
  };
  const constraintsNumber = (value) => {
    return !isNaN(value) && value > 0;
  };

  const { value, setEnteredValue, handleInputChange, handleInputBlur, hasError } = useInput(
    defaultValue,
    type === "text" ? constraintsTexts : constraintsNumber,
  );

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisiblity = (e) => {
    if (e.target.innerText === "Cancel") {
      setEnteredValue(defaultValue);
    }
    setIsVisible((prevState) => !prevState);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    // setEnteredValue(value);
    // setTriggerRefresh((prevState) => !prevState);

    toggleVisiblity(e);

    console.log("submit");
  };

  if (isVisible) {
    return (
      <form onSubmit={onFormSubmit} className="flex flex-1 items-center justify-center">
        <div className="flex flex-1 text-black">
          {inputType === "text" ? (
            <Input
              labelStyle="text-white"
              placeholder={placeholder}
              isError={hasError}
              name={placeholder}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={value}
            />
          ) : (
            <SelectModal
              value={value}
              labelStyle="text-white"
              placeholder={placeholder}
              handleInputBlur={handleInputBlur}
              handleInputChange={handleInputChange}
              options={options}
              hasError={hasError}
            />
          )}
        </div>
        <div className="flex gap-5">
          <Button className="text-black" variant="outline">
            Save
          </Button>
          <Button className="text-black" type="button" onClick={toggleVisiblity} variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
  return (
    <>
      <div className="flex flex-1 items-center">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-xl font-semibold">{placeholder}: </span>
          <span className="text-lg">{value}</span>
        </div>
        <Button onClick={toggleVisiblity} variant="outline" className="text-black">
          <Pencil />
        </Button>
      </div>
      <span className="divider border-white"></span>
    </>
  );
}
TogglableField.propTypes = {
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputType: PropTypes.string,
  options: PropTypes.array,
  setTriggerRefresh: PropTypes.func,
};
