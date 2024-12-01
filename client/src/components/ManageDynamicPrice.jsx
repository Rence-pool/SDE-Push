import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/functions";
import { useState } from "react";
import OrderInputsButton from "@/components/OrderInputsButton";
import OrderInputQuantity from "@/components/OrderInputQuantity";
import PropTypes from "prop-types";
import OrderActionButton from "./OrderActionButton";

export default function ManageDynamicPrice({ productData, productAttributes, productSizes }) {
  console.log(productData);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const handleOnSelectSize = (size) => {
    setSelectedSize(size);
  };
  const orderLimit = 3;
  let isOverQuantity = orderQuantity >= orderLimit;
  let defaultPrice = productData[0].ProductDefaultPrice;
  let priceLabel = productData?.length === 1 ? "Price" : "Starting Price";
  let stockLeft = productData?.length === 1 ? productData[0].Product_StockLeft : undefined;
  const variantName =
    productData[0].P_AttributeName.toLowerCase().charAt(0).toUpperCase() + productData[0].P_AttributeName.slice(1).toLowerCase();

  const orderInformation = () => {
    return {
      productData,
      orderQuantity,
      selectedSize,
      selectedVariant,
    };
  };

  if (selectedSize !== "" && selectedVariant !== "") {
    const selectedVariantInfo = productData.filter(
      (product) => product.P_AttributeSize === selectedSize && product.P_AttributeValue === selectedVariant,
    )[0];
    defaultPrice = selectedVariantInfo.P_AttributePrice;
    stockLeft = selectedVariantInfo.Product_StockLeft;
    priceLabel = "Price";
    isOverQuantity = orderQuantity > stockLeft || orderQuantity >= orderLimit;
  }
  const handleOnSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };
  const handleQuantityIncrement = () => {
    if (orderQuantity >= orderLimit) return;
    setOrderQuantity((prevState) => prevState + 1);
  };

  const handleQuantityDecrement = () => {
    setOrderQuantity((prevState) => {
      if (prevState <= 1) return prevState;
      return prevState - 1;
    });
  };
  return (
    <>
      {stockLeft !== undefined && <span className="text-xl font-bold text-red-500">Stock Left: {stockLeft}</span>}
      <span className="text-error label font-semibold">Your order will be canceled if you do not pay at the cashier within 24 hours.</span>
      <span className="divider m-0" />
      <span className="text-3xl font-semibold">
        {priceLabel}: {formatCurrency(defaultPrice)}
      </span>
      <span className="divider m-0" />
      <main className="flex flex-1 flex-col gap-5 p-5">
        {productData[0].ProductTypeID !== "MC_PDS" && productData[0].ProductTypeID !== "DL_UNIF_ACCESSORIES" && (
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xl font-semibold">Select Size:</span>
              <OrderInputsButton
                handleOnSelectItem={handleOnSelectSize}
                selectedItem={selectedSize}
                data={Array.from(productSizes).reverse()}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xl font-semibold">Select {variantName}:</span>
              <OrderInputsButton
                handleOnSelectItem={handleOnSelectVariant}
                selectedItem={selectedVariant}
                data={Array.from(productAttributes)}
              />
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center gap-5">
          {isOverQuantity && <p className="label text-error w-full text-center font-semibold">You have exceeded the order limit</p>}
          <div className="flex">
            <OrderInputQuantity
              orderQuantity={orderQuantity}
              handleQuantityIncrement={handleQuantityIncrement}
              handleQuantityDecrement={handleQuantityDecrement}
            />
          </div>
          <OrderActionButton isOverQuantity={isOverQuantity}  orderInformation={orderInformation} />
        </div>
      </main>
    </>
  );
}
ManageDynamicPrice.propTypes = {
  productData: PropTypes.array,
  productAttributes: PropTypes.instanceOf(Set),
  productSizes: PropTypes.instanceOf(Set),
};
