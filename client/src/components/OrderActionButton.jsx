import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
import { useEffect } from "react";
import ConfirmModal from "./modals/ConfirmModal";

export default function OrderActionButton({ isOverQuantity, orderInformation }) {
  const { orderQuantity, selectedSize, selectedVariant, productData } = orderInformation();
  console.log(orderInformation());
  const {
    userState: { id },
  } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (selectedSize !== "" && selectedVariant !== "") {
      setError("");
    }
  }, [selectedVariant, selectedSize]);
  const validateOrder = () => {
    if (productData.length === 1 && (productData[0].ProductTypeID === "MC_PDS" || productData[0].ProductTypeID === "DL_UNIF_ACCESSORIES")) {
      return true;
    }
    if (selectedSize === "" || selectedVariant === "") {
      setError("Please Select Size and Variant");
      return false;
    }
    setError("");
    return true;
  };
  const handleOnBuyNow = () => {
    if (!validateOrder()) return;

    if (productData.length === 1 && (productData[0].ProductTypeID === "MC_PDS" || productData[0].ProductTypeID === "DL_UNIF_ACCESSORIES")) {
      handleOnOrderWithoutVariant();
      setIsConfirmModalOpen(true);
      return;
    }
    handleOnOrderWithVariant();
    setIsConfirmModalOpen(true);
  };
  const handleOnAddToCart = () => {
    if (!validateOrder()) return;
    if (productData.length === 1 && (productData[0].ProductTypeID === "MC_PDS" || productData[0].ProductTypeID === "DL_UNIF_ACCESSORIES")) {
      handleOnOrderWithoutVariant();
      return;
    }
    handleOnOrderWithVariant();
  };

  const handleOnOrderWithVariant = () => {
    console.log("handleOnOrderWithVariant");
  };
  const handleOnOrderWithoutVariant = () => {
    console.log("handleOnOrderWithoutVariant");
  };
  const handleOnConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };
  console.log(isConfirmModalOpen);
  return (
    <>
      {error !== "" && <span className="font-semibold text-red-500">{error}</span>}
      <div className="flex gap-5">
        <ConfirmModal isOpen={isConfirmModalOpen} onClose={handleOnConfirmModalClose} />
        <Button
          variant="default"
          onClick={handleOnBuyNow}
          disabled={isOverQuantity || error !== "" || id === undefined}
          className="bg-primary flex-1 rounded-3xl hover:bg-gray-600"
        >
          Buy Now
        </Button>
        <Button
          variant="outline"
          onClick={handleOnAddToCart}
          disabled={isOverQuantity || error !== "" || id === undefined}
          className="flex-1 rounded-3xl ring-2 ring-black"
        >
          Add to cart <ShoppingCart />
        </Button>
      </div>
    </>
  );
}
OrderActionButton.propTypes = {
  isOverQuantity: PropTypes.bool,
  orderInformation: PropTypes.func,
};
