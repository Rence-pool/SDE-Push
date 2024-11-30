import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/functions";
import { useState } from "react";
import OrderInputsButton from "@/components/OrderInputsButton";
import OrderInputQuantity from "@/components/OrderInputQuantity";
import PropTypes from "prop-types";

export default function ManageDynamicPrice({ productData, productAttributes, productSizes }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const handleOnSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handleOnSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };
  const handleQuantityIncrement = () => {
    if (orderQuantity >= 3) return;
    setOrderQuantity((prevState) => prevState + 1);
  };

  const handleQuantityDecrement = () => {
    setOrderQuantity((prevState) => {
      if (prevState <= 1) return prevState;
      return prevState - 1;
    });
  };
  let isOverQuantity = orderQuantity >= 3;

  let defaultPrice = productData[0].ProductDefaultPrice;
  let priceLabel = "Starting Price";
  const variantName =
    productData[0].P_AttributeName.toLowerCase().charAt(0).toUpperCase() + productData[0].P_AttributeName.slice(1).toLowerCase();

  //   if (selectedSize !== "") {
  //     defaultPrice = productData[0].ProductDefaultPrice * productData[0].P_AttributeSize;
  //   }

  //   if (selectedVariant !== "") {
  //     defaultPrice = productData[0].ProductDefaultPrice * productData[0].P_AttributeValue;
  //   }

  if (selectedSize !== "" && selectedVariant !== "") {
    defaultPrice = productData.filter(
      (product) => product.P_AttributeSize === selectedSize && product.P_AttributeValue === selectedVariant,
    )[0].P_AttributePrice;
    priceLabel = "Price";
    console.log(defaultPrice, productData);
  }

  return (
    <>
      <span className="divider m-0" />
      <span className="text-3xl font-semibold">
        {priceLabel}: {formatCurrency(defaultPrice)}
      </span>
      <span className="divider m-0" />
      <main className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <span className="text-xl font-semibold">Select Size:</span>
            <OrderInputsButton
              handleOnSelectItem={handleOnSelectSize}
              selectedItem={selectedSize}
              data={Array.from(productSizes).reverse()}
            />
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <span className="text-xl font-semibold">Select {variantName}:</span>
            <OrderInputsButton
              handleOnSelectItem={handleOnSelectVariant}
              selectedItem={selectedVariant}
              data={Array.from(productAttributes)}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-5">
          {isOverQuantity && <p className="label text-error w-full text-center font-semibold">You have exceeded the order limit</p>}
          <OrderInputQuantity
            orderQuantity={orderQuantity}
            handleQuantityIncrement={handleQuantityIncrement}
            handleQuantityDecrement={handleQuantityDecrement}
          />
          <div className="flex gap-5">
            <Button variant="default" className="flex-1" disabled={isOverQuantity}>
              Buy Now
            </Button>
            <Button variant="outline" className="flex-1" disabled={isOverQuantity}>
              Add to cart <ShoppingCart />
            </Button>
          </div>
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
