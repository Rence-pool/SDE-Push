import { useState, useContext, useEffect } from "react";
import Input from "./Input";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useInput } from "@/hooks/useInput";
import SelectModal from "./modals/SelectModal";
import PropTypes from "prop-types";
import { useUpdate } from "@/hooks/useUpdate";
import { AuthContext } from "@/stores/AutProvider";
import { toast } from "sonner";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";
export default function TogglableField({
  defaultValue,
  placeholder,
  type = "text",
  inputType = "text",
  options,
  setTriggerRefresh,
  tableName,
  columnName,
  productName,
  id,
}) {
  const {
    data: updateProduct,
    error: updateProductError,
    updateValue: updateProductData,
  } = useUpdate([], `http://localhost:3000/api/products/update/`);

  const {
    userState: { id: actor },
  } = useContext(AuthContext);
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

  useEffect(() => {
    if (updateProduct?.data?.affectedRows >= 1) {
      toast("Product Updated Successfully", {
        type: "success",
        autoClose: 2000,
        className: "m-5",
        pauseOnHover: true,
        closeOnClick: true,

        draggable: true,
      });
    }
  }, [updateProduct]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (defaultValue === value) {
      return;
    }
    const data = {
      columnName: columnName,
      value: value,
      tableName: tableName,
      valueID: id,
      id: id,
      actor: actor,
      date: `${getCurrentDate()} ${getCurrentTime()}`,
      activityType: "APPLICATION",
      activityDescription: `Update ${productName} Field ${columnName} ${defaultValue} to ${value}`,
    };

    updateProductData(data);

    toggleVisiblity(e);
  };

  if (isVisible) {
    return (
      <form onSubmit={onFormSubmit} className="flex flex-1 items-center justify-center gap-5">
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
          {updateProductError && <div className="flex-1 text-white">{updateProductError?.message}</div>}
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
  tableName: PropTypes.string,
  variantID: PropTypes.number,
  productName: PropTypes.string,
  columnName: PropTypes.string,
  id: PropTypes.string,
};
