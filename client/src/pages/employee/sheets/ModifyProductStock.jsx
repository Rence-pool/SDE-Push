import { Button } from "@/components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";
import PropTypes from "prop-types";
import Input from "@/components/Input";
import { useInput } from "@/hooks/useInput";
import { toast } from "sonner";
import CustomSkeleton from "../../../components/customs/CustomSkeleton";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
import { useUpdate } from "@/hooks/useUpdate";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function ModifyProductStock({ trigger, productDetails, refresher }) {
  const {
    userState: { id },
  } = useContext(AuthContext);

  // console.log(productDetails);
  const {
    value: productStockQuantity,
    handleInputChange: handleProductStockQuantityChange,
    handleInputBlur: handleProductStockQuantityBlur,
    hasError: productStockQuantityHasError,
    handleResetState: resetProductStockQuantity,
  } = useInput(productDetails.Product_StockLeft, (value) => !isNaN(value) && Number(value) > -1 && value !== "-0");

  const {
    data: updateData,
    loading: updateLoading,
    error: updateError,
    updateValue,
    setError: setUpdateError,
  } = useUpdate([], "http://localhost:3000/api/products/update/stock/");
  const handleOnFormSubmit = async (e) => {
    e.preventDefault();
    if (productStockQuantity <= -1 || productStockQuantityHasError || productDetails.Product_StockLeft === productStockQuantity) {
      return;
    }
    let stockCondition = "high";

    if (+productStockQuantity === 0) stockCondition = "out of stock";
    else if (+productStockQuantity <= 10) stockCondition = "low";
    else if (+productStockQuantity <= 20) stockCondition = "medium";

    const data = {
      id: productDetails.ProductID,
      stockQuantity: productStockQuantity,
      actorID: id,
      productID: productDetails.ProductID,
      productStockID: productDetails.P_StockID,
      productAttributeID: productDetails.P_AttributeID,
      productStockCondition: stockCondition.toUpperCase(),

      actionType: Number(productDetails.Product_StockLeft) > Number(productStockQuantity) ? "Stock Adjustment" : "Stock Replenishment",
      update_timeStamp: getCurrentTime(),
      update_dateStamp: getCurrentDate(),
    };
    // console.log(data);
    await updateValue(data);
  };

  useEffect(() => {
    if (updateData?.data) {
      toast("Product Updated Successfully", {
        className: "text-xs m-6",
        description: `Product Updated Sucessful`,
      });
      refresher((prevState) => !prevState);
    }
  }, [updateData?.data, refresher]);
  const handleSheetClose = () => {
    resetProductStockQuantity();
    setUpdateError(null);
  };
  return (
    <Sheet modal onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex flex-1 flex-col gap-2 outline" onInteractOutside={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Modify Product Stock</SheetTitle>
          <SheetDescription>
            <span className="space-x-4">{updateError && <span className="text-red-500">{updateError.message}</span>}</span>
          </SheetDescription>
        </SheetHeader>
        <form className="flex h-full flex-col" onSubmit={handleOnFormSubmit}>
          {updateLoading && <CustomSkeleton times={20} />}
          {!updateLoading && !updateError && (
            <ScrollArea className="flex h-[27rem] flex-1 flex-col gap-2 pr-5">
              <div className="flex flex-col gap-5 p-2">
                <span>{`Product ID: ${productDetails.ProductID}`}</span>
                <span>{`Product Name: ${productDetails.ProductName}`}</span>
                <span>{`Product Type: ${productDetails.ProductTypeID}`}</span>
                <span>{`Product Program: ${productDetails.ProductProgram}`}</span>
                <span>{`Product At
                tributes: ${productDetails.P_AttributeValue}`}</span>
                <span>Product Size : {productDetails.P_AttributeSize}</span>
                <span>{`Product Price: ${productDetails.P_AttributePrice}`}</span>
              </div>
              <Input
                type={"text"}
                id={"product-stock-quantity"}
                placeholder={"Replenish Stock"}
                isError={productStockQuantityHasError}
                onChange={handleProductStockQuantityChange}
                onBlur={handleProductStockQuantityBlur}
                value={productStockQuantity}
              />

              <Button className="w-full" disabled={productStockQuantityHasError || updateLoading}>
                Save
              </Button>
            </ScrollArea>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
}
ModifyProductStock.propTypes = {
  trigger: PropTypes.any,
  productDetails: PropTypes.object,
  refresher: PropTypes.func,
};
