import PropTypes from "prop-types";
import { Button } from "./ui/button";
export default function OrderInputsButton({ data, handleOnSelectItem, selectedItem }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {data.map((button) => (
        <Button key={button} variant={selectedItem === button ? "default" : "outline"} onClick={() => handleOnSelectItem(button)}>
          {button}
        </Button>
      ))}
    </div>
  );
}
OrderInputsButton.propTypes = {
  data: PropTypes.array,
  handleOnSelectItem: PropTypes.func,
  selectedItem: PropTypes.string,
};
