import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { useInput } from "@/hooks/useInput";
import Input from "../Input";
import { formatCurrency } from "@/lib/functions";
import SelectModal from "./SelectModal";
const ProcessOrderModal = forwardRef(function ProcessOrderModal(
  { handleOrderSubmit, selectedProduct, handleResetSelectedProduct },
  ref,
) {
  const [buttonAction, setButtonAction] = useState("ProcessOrder");
  const dialogRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open(action) {
      dialogRef.current.showModal();
      console.log("Open", action);
      setButtonAction(action);
    },
    close() {
      dialogRef.current.close();
    },
  }));
  const {
    value: studentNumberValue,
    handleResetState: handleStudentNumberReset,
    handleInputChange: handleStudentNumberChange,
    handleInputBlur: handleStudentNumberBlur,
    hasError: studentNumberHasError,
  } = useInput("", (val) => val.length === 6);
  const {
    value: productQuantity,
    handleResetState: handleProductQuantityReset,
    handleInputChange: handleProductQuantityChange,
    handleInputBlur: handleProductQuantityBlur,
    hasError: productQuantityHasError,
  } = useInput(
    "", //Fetch the remaining stock from the database
    () => true,
  );
  const {
    value: productSize,
    handleResetState: handleProductSizeReset,
    handleInputChange: handleProductSizeChange,
    handleInputBlur: handleProductSizeBlur,
    hasError: productSizeHasError,
  } = useInput("-", (val) => val !== "-");
  const {
    value: productGender,
    handleResetState: handleProductGenderReset,
    handleInputChange: handleProductGenderChange,
    handleInputBlur: handleProductGenderBlur,
    hasError: productGenderHasError,
  } = useInput("-", (val) => val !== "-");
  // console.log(selectedProduct);

  const resetAllState = () => {
    handleResetSelectedProduct();
    handleStudentNumberReset();
    handleProductSizeReset();
    handleProductGenderReset();
    handleProductQuantityReset();
    dialogRef.current.close();
  };

  const conditionalInputs = (productVariants, productType) => {
    const tobeReturned = [];
    if (
      productVariants === undefined ||
      productVariants?.length <= 1 ||
      productType === "UNIFORM_ACCESSORIES" ||
      productType === "MISCELLANEOUS"
    ) {
      return;
    }
    if (
      productType === "GENERAL_TOP_ATTIRE" ||
      productType === "GENERAL_BOTTOM_ATTIRE"
    ) {
      tobeReturned.push({
        id: "gender-element",
        element: (
          <SelectModal
            value={productGender}
            handleInputChange={handleProductGenderChange}
            handleInputBlur={handleProductGenderBlur}
            hasError={productGenderHasError}
            id={"product-variants"}
            placeholder={"Product Gender"}
            options={[
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
            ]}
          />
        ),
      });
      const uniqueProductSizes = [];
      const seenIDs = new Set();

      productVariants.forEach((variant) => {
        if (!seenIDs.has(variant.ProductSizeID)) {
          seenIDs.add(variant.ProductSizeID);
          uniqueProductSizes.push({
            label: variant.ProductSizeName,
            value: variant.ProductSizeID,
          });
        }
      });
      tobeReturned.push({
        id: "product-size",
        element: (
          <SelectModal
            value={productSize}
            handleInputChange={handleProductSizeChange}
            handleInputBlur={handleProductSizeBlur}
            hasError={productSizeHasError}
            id={"product-size"}
            placeholder={"Product Sizes"}
            options={uniqueProductSizes}
          />
        ),
      });
      return tobeReturned;
    }
    tobeReturned.push({
      id: "product-size",
      element: (
        <SelectModal
          value={productSize}
          handleInputChange={handleProductSizeChange}
          handleInputBlur={handleProductSizeBlur}
          hasError={productSizeHasError}
          id={"product-size"}
          placeholder={"Product Sizes"}
          options={productVariants.map((variant) => ({
            label: variant.ProductSizeName,
            value: variant.ProductSizeID,
          }))}
        />
      ),
    });

    return tobeReturned;
  };
  const totalOrder = (selectedProduct) => {
    if (
      productQuantityHasError ||
      productSizeHasError ||
      productGenderHasError
    ) {
      return;
    }

    if (selectedProduct?.ProductType === "UNIFORM_ACCESSORIES") {
      return (
        +productQuantity * +selectedProduct.ProductVariants[0].ProductPrice
      );
    }
    const total = selectedProduct.ProductVariants?.filter(
      (variant) => variant.ProductSizeID === productSize,
    )[0];

    return total == undefined ? 0 : total.ProductPrice * +productQuantity;
  };

  return (
    <dialog className="modal z-10" ref={dialogRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (
            studentNumberHasError ||
            productQuantityHasError ||
            productGenderHasError ||
            productSizeHasError
          ) {
            return;
          }
          resetAllState();
          handleOrderSubmit(e, selectedProduct, buttonAction);
          e.target.reset();
        }}
        method="dialog"
        className="modal-box w-11/12 max-w-5xl"
      >
        <div className="modal-top">
          <h3 className="text-lg font-bold">Process Order</h3>
          <div className="flex flex-col gap-5">
            <span>{selectedProduct.ProductName}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Input
            value={studentNumberValue}
            handleOnBlur={handleStudentNumberBlur}
            handleOnChange={handleStudentNumberChange}
            type="number"
            id="student-no"
            placeholder="Last 6 Student Number"
            isError={studentNumberHasError}
          />
          <Input
            value={productQuantity}
            handleOnBlur={handleProductQuantityBlur}
            handleOnChange={handleProductQuantityChange}
            type="number"
            id={"product-quantity"}
            placeholder={"Product Quantity"}
            isError={productQuantityHasError}
          />

          {selectedProduct?.ProductType !== "UNIFORM_ACCESSORIES" && (
            <>
              {conditionalInputs(
                selectedProduct?.ProductVariants,
                selectedProduct?.ProductType,
              )?.map((item) => (
                <div key={item.id}>{item.element}</div>
              ))}
            </>
          )}
        </div>

        <div className="my-2 flex gap-2">
          <span className="font-semibold uppercase">Total =</span>
          <span>{formatCurrency(totalOrder(selectedProduct))}</span>
        </div>
        <div className="modal-action">
          <button
            className="btn border-0 bg-transparent tracking-wider text-black"
            type="button"
            onClick={() => resetAllState()}
          >
            Cancel
          </button>
          {buttonAction === "ProcessOrder" ? (
            <button className="btn btn-primary tracking-wider text-white">
              Submit
            </button>
          ) : (
            <button className="btn btn-primary tracking-wider text-white">
              Add To Cart
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
});
ProcessOrderModal.propTypes = {
  selectedProduct: PropTypes.object,
  handleResetSelectedProduct: PropTypes.func,
  handleOrderSubmit: PropTypes.func,
};
export default ProcessOrderModal;
