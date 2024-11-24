import { generateOrderID } from "@/lib/functions";
import { getCurrentDate } from "@/lib/functions";
import { getCurrentTime } from "@/lib/functions";
export const handleOnPostOrder = (formData, selectedProduct) => {
  const data = Object.fromEntries(formData.entries());
  console.log("Data", data, "selectedProduct", selectedProduct);
  const generatedOrderId = generateOrderID();
  const orderStatus = "ORDER_600";
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const userID = `02000${data[`student-no`]}`;
  const productID = selectedProduct.ProductID;
  const productSizeID =
    selectedProduct.ProductType === "UNIFORM_ACCESSORIES" ||
    selectedProduct.ProductType === "MISCELLENEOUS"
      ? "NULL"
      : data["product-size"];
  const productVariant =
    selectedProduct.ProductType === "GENERAL_TOP_ATTIRE" ||
    selectedProduct.ProductType === "GENERAL_BOTTOM_ATTIRE"
      ? data["product-variants"]
      : "NULL";
  const productStockID = selectedProduct.ProductStockID;
  const productQuantity = data["product-quantity"];
  const sales = 0;
  // const total = totalOrder(selectedProduct);
  const total =
    selectedProduct.ProductVariants.filter(
      (variants) => variants.ProductSizeID === productSizeID,
    )[0].ProductPrice * productQuantity;
  console.log("Total", total);

  return {
    orderID: generatedOrderId,
    orderStatus: orderStatus,
    currentDate: currentDate,
    currentTime: currentTime,
    productQuantity: productQuantity,
    userID: userID,
    productID: productID,
    productSizeID: productSizeID,
    productVariant: productVariant,
    productStockID: productStockID,
    sales: sales,
    total: total,
  };
};
