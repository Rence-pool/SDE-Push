import { useForm, useFieldArray } from "react-hook-form";
import { productTypes_productProgram } from "@/lib/product_types_product_program";
import { useInput } from "@/hooks/useInput";
import { useFetch } from "@/hooks/useFetch";
import SelectModal from "./modals/SelectModal";
import { Button } from "./ui/button";
import Input from "./Input";
import { Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";
import CustomSkeleton from "./customs/CustomSkeleton";
export default function AddProductForm({ onSubmitPost }) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productID: "",
      productName: "",
      productType: "",
      productDescription: "",
      productDefaultPrice: "",
      productProgram: "",
      productAttributes: [],
    },
  });
  const { fields, remove, prepend } = useFieldArray({
    name: "productAttributes",
    control,
  });

  const {
    data: product_info,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch("http://localhost:3000/api/products/fetch/product-info", [], "Error fetching Products");

  const {
    value: productType,
    handleInputChange: handleProductTypeChange,
    handleInputBlur: handleProductTypeBlur,
    hasError: productTypeHasError,
  } = useInput("", (value) => value !== "" && value !== "-");
  const {
    value: productProgramID,
    handleInputChange: handleProductProgramIDChange,
    handleInputBlur: handleProductProgramIDBlur,
    hasError: productProgramIDHasError,
  } = useInput("", (value) => value !== "" && value !== "-");

  const { productTypes, productProgram } = productTypes_productProgram(product_info);
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmitPost(data, productType, productProgramID, productProgramIDHasError, productTypeHasError, setError),
      )}
      className="flex flex-col gap-2 px-2 text-black"
    >
      {errors && errors.root && <div className="text-white">{errors.root.message}</div>}
      {fetchLoading && <CustomSkeleton key={100} />}

      {fetchError && <div className="text-error">{fetchError.message}</div>}
      {!fetchLoading && !fetchError && (
        <>
          <Input
            labelStyle="text-white"
            type="text"
            id="product-id"
            placeholder="Product ID"
            isError={errors.productID}
            register={{ ...register("productID", { required: true }) }}
          />

          <Input
            labelStyle="text-white"
            type="text"
            id="product-name"
            placeholder="Product Name"
            isError={errors.productName}
            register={{ ...register("productName", { required: true }) }}
          />

          <Input
            labelStyle="text-white"
            type="text"
            id="product-description"
            placeholder="Product Description"
            isError={errors.productDescription}
            register={{
              ...register("productDescription", { required: true }),
            }}
          />
          <Input
            labelStyle="text-white"
            type="text"
            id="product-default-price"
            placeholder="Product Default Price"
            isError={errors.productDefaultPrice}
            register={{
              ...register("productDefaultPrice", {
                required: true,
                valueAsNumber: true,
                validate: (value) => !isNaN(value) && value > 0,
              }),
            }}
          />

          <SelectModal
            labelStyle="text-white"
            value={productProgramID}
            handleInputChange={handleProductProgramIDChange}
            handleInputBlur={handleProductProgramIDBlur}
            hasError={productProgramIDHasError}
            id={"product-program"}
            placeholder={"Product Program"}
            className="text-black"
            options={productProgram}
          />
          <SelectModal
            labelStyle="text-white"
            value={productType}
            handleInputChange={handleProductTypeChange}
            handleInputBlur={handleProductTypeBlur}
            hasError={productTypeHasError}
            id={"product-type"}
            className="text-black"
            placeholder={"Product Type"}
            options={productTypes}
          />
          <div className="flex flex-col">
            <div className="space-x-6">
              <Button
                variant="secondary"
                size="icon"
                type="button"
                onClick={() => {
                  const productDefaultPrice = getValues("productDefaultPrice");
                  prepend({
                    productAttributeName: "",
                    productAttributeValue: "",
                    productAttributeSize: "",
                    productAttributePrice: Number(productDefaultPrice),
                    productStockID: "",
                    productStockQuantity: "",
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-wrap gap-2 border-b-2 border-y-gray-300 pb-5">
                <Input
                  labelStyle="text-white"
                  type="text"
                  id={`product-attribute-name-${index}`}
                  placeholder="Product Attribute Name"
                  register={{
                    ...register(`productAttributes.${index}.productAttributeName`, {
                      required: true,
                    }),
                  }}
                  isError={errors.productAttributes?.[index]?.productAttributeName}
                />
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
                    }),
                  }}
                  isError={errors.productAttributes?.[index]?.productAttributeSize}
                />
                <Input
                  labelStyle="text-white"
                  type="number"
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
                  type="number"
                  id={`product-stock-quantity-${index}`}
                  placeholder="Product Stock Quantity"
                  register={{
                    ...register(`productAttributes.${index}.productStockQuantity`, {
                      required: true,
                      valueAsNumber: true,
                      validate: (value) => !isNaN(value) && value > 0,
                    }),
                  }}
                  isError={errors.productAttributes?.[index]?.productStockQuantity}
                />
                <Button
                  variant="secondary"
                  size="icon"
                  type="button"
                  className="self-center"
                  disabled={index <= 0}
                  onClick={() => remove(index)}
                >
                  <Minus />
                </Button>
              </div>
            ))}
          </div>

          <button className="hidden" id="submit"></button>
        </>
      )}
    </form>
  );
}
AddProductForm.propTypes = {
  onSubmitPost: PropTypes.func,
};
