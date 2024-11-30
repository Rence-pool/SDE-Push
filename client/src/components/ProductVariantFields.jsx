import { useForm, useFieldArray } from "react-hook-form";
import { Minus } from "lucide-react";
import { Button } from "./ui/button";
import Input from "./Input";
import { useUpdate } from "@/hooks/useUpdate";
import { Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/AutProvider";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { getCurrentDate, getCurrentTime } from "@/lib/functions";
export default function ProductVariantFields({ setTriggerRefresh, productData }) {
  const {
    userState: { id },
  } = useContext(AuthContext);
  const {
    data: updateProduct,
    loading: updateProductLoading,
    error: updateProductError,
    updateValue: updateProductData,
  } = useUpdate([], `http://localhost:3000/api/products/update/add-product-attributes/`);
  const {
    register,
    control,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productAttributes: [],
    },
  });
  const { fields, remove, prepend } = useFieldArray({
    name: "productAttributes",
    control,
  });

  const handleOnFormSubmit = (data) => {
    if (data.productAttributes.length === 0)
      return setError("root", {
        message: "Please add at least one variant",
      });
    const variants = [];
    const formatData = {
      productID: productData.ProductID,
      productName: productData.ProductName,
      actor: id,
      id: id,
      date: `${getCurrentDate()} ${getCurrentTime()}`,
      activityType: "APPLICATION",

      productAttributes: data.productAttributes.map((field) => {
        variants.push([`Value:${field.productAttributeValue} `, `Size:${field.productAttributeSize} `]);
        return {
          productAttributeName: field.productAttributeName.toUpperCase(),
          productAttributeValue: field.productAttributeValue.toUpperCase(),
          productAttributeSize: field.productAttributeSize.toUpperCase(),
          productAttributePrice: field.productAttributePrice.toFixed(2),
          productStockID: `${productData.ProductID}_${field.productAttributeValue.toUpperCase()}_${field.productAttributeSize.toUpperCase()}`,
          productStockQuantity: field.productStockQuantity,
        };
      }),
      //   activityDescription: `Update ${productData.ProductName} Variants ${JSON.stringify(...variants)}`,
      activityDescription: `Update ${productData.ProductName} Variants: ${variants}`,
    };
    // console.log(formatData);
    updateProductData(formatData);

    setTriggerRefresh((prevState) => !prevState);
  };

  const handleAddVariantField = () => {
    prepend({
      productAttributeName: productData.ProductVariants[0].ProductVariantName,
      productAttributeValue: productData.ProductVariants[0].ProductVariantValue,
      productAttributeSize: "",
      productAttributePrice: 0,
      productAttributeQuantity: 0,
      productStockID: "",
    });
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
  return (
    <>
      <Button
        disabled={updateProductLoading || getValues("productAttributes").productAttributes?.length === 0}
        className="bg-white text-black hover:bg-white/80"
        onClick={() => document.getElementById("submit").click()}
      >
        {updateProductLoading ? "Updating..." : "Update Product"}
      </Button>
      {updateProductError && <div className="text-white">{updateProductError?.message}</div>}
      {errors && errors.root && <div className="text-error font-semibold">{errors.root.message}</div>}
      <div className="space-x-6">
        <Button variant="secondary" size="icon" type="button" onClick={handleAddVariantField}>
          <Plus />
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleOnFormSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-wrap gap-2 pb-5 text-black">
            <Input
              labelStyle="text-white"
              type="text"
              id={`product-attribute-value-${index}`}
              placeholder="Product Attribute Value"
              register={{
                ...register(`productAttributes.${index}.productAttributeValue`, {
                  required: true,
                }),
              }}
              isError={errors.productAttributes?.[index]?.productAttributeValue}
            />
            <Input
              labelStyle="text-white"
              type="text"
              id={`product-attribute-size-${index}`}
              placeholder="Product Attribute Size"
              register={{
                ...register(`productAttributes.${index}.productAttributeSize`, {
                  required: true,
                  validate: (value) => value !== "" && value !== " ",
                }),
              }}
              isError={errors.productAttributes?.[index]?.productAttributeSize}
            />
            <Input
              labelStyle="text-white"
              type="text"
              id={`product-attribute-price-${index}`}
              placeholder="Product Price"
              register={{
                ...register(`productAttributes.${index}.productAttributePrice`, {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) => !isNaN(value) && value > 0,
                }),
              }}
              isError={errors.productAttributes?.[index]?.productAttributePrice}
            />
            <Input
              labelStyle="text-white"
              type="text"
              id={`product-attribute-quantity-${index}`}
              placeholder="Product Quantity"
              register={{
                ...register(`productAttributes.${index}.productStockQuantity`, {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) => !isNaN(value) && value > 0,
                }),
              }}
              isError={errors.productAttributes?.[index]?.productStockQuantity}
            />
            <Button variant="secondary" size="icon" type="button" onClick={() => remove(index)}>
              <Minus />
            </Button>
          </div>
        ))}
        <button className="hidden" id="submit"></button>
      </form>
    </>
  );
}
ProductVariantFields.propTypes = {
  setTriggerRefresh: PropTypes.func,
  productData: PropTypes.object,
};
