import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import PropTypes from "prop-types";

export default function OrderInputQuantity({ orderQuantity, handleQuantityIncrement, handleQuantityDecrement }) {
  return (
    <div className="flex self-center">
      <div className="flex items-center gap-5 overflow-hidden rounded-2xl bg-gray-300 outline">
        <Button variant="ghost" disabled={orderQuantity <= 1} onClick={handleQuantityDecrement}>
          <Minus />
        </Button>
        <span className="w-24 text-center font-semibold">{orderQuantity}</span>
        <Button variant="ghost" onClick={handleQuantityIncrement}>
          <Plus />
        </Button>
      </div>
    </div>
  );
}
OrderInputQuantity.propTypes = {
  orderQuantity: PropTypes.number,
  handleQuantityIncrement: PropTypes.func,
  handleQuantityDecrement: PropTypes.func,
};
