import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { productTypes_productProgram } from "../../lib/product_types_product_program";
import { useEffect, useState } from "react";
import TogglableField from "@/components/TogglableField";
import { useForm, useFieldArray } from "react-hook-form";
import { useUpdate } from "@/hooks/useUpdate";
import Input from "@/components/Input";

export default function ModifyProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const {
    data: fetchProduct,
    loading: fetchProductLoading,
    error: fetchProductError,
  } = useFetch(`http://localhost:3000/api/products/fetch/${productId}`, [], "Error fetching Products");
  const {
    data: product_info,
    loading: fetchLoading,
    error: fetchError,
    setTriggerRefresh,
  } = useFetch("http://localhost:3000/api/products/fetch/product-info", [], "Error fetching Products");

  const {
    data: updateProduct,
    loading: updateProductLoading,
    error: updateProductError,
    updateData: updateProductData,
  } = useUpdate(`http://localhost:3000/api/products/update/${productId}`, []);

  const { productTypes, productProgram } = productTypes_productProgram(product_info);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result); // Set preview of the image
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };
  useEffect(() => {
    if (fetchProduct?.data?.length > 0) {
      setImagePreview(`http://localhost:3000/images/products/${fetchProduct.data[0].ProductImage}`);
    }
  }, [fetchProduct]);

  const productData = fetchProduct?.data?.length > 0 ? fetchProduct.data[0] : null;

  const {
    register,
    control,
    handleSubmit,
    setError,
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

  const handleAddVariantField = () => {
    prepend({
      productAttributeName: productData.ProductVariants[0].ProductVariantName,
      productAttributeValue: productData.ProductVariants[0].ProductVariantValue,
      productAttributeSize: "",
      productAttributePrice: 0,
      productStockID: "",
    });
  };
  const handleRemoveVariantField = (productVariantIndex) => {
    // Update the productData state with the new productVariants array
    console.log(productVariantIndex);
  };
  const handleOnFormSubmit = (data) => {
    console.log(data);
    setTriggerRefresh((prevState) => !prevState);
  };

  const productFields = [
    {
      name: "ProductName",
      value: productData?.ProductName,
      type: "text",
      inputType: "text",
      placeholder: "Product Name",

      tableName: "products",
      columnName: "ProductName",
    },
    {
      name: "ProductDescription",
      value: productData?.ProductDescription,
      type: "text",
      inputType: "text",
      placeholder: "Product Description",
      tableName: "products",
      columnName: "ProductDescription",
    },
    {
      name: "ProductDefaultPrice",
      value: productData?.ProductDefaultPrice,
      type: "number",
      inputType: "text",
      placeholder: "Product Default Price",
      tableName: "products",
      columnName: "ProductDefaultPrice",
    },
    {
      name: "ProductProgram",
      value: productData?.ProductProgram,
      type: "text",
      inputType: "select",
      placeholder: "Product Program",
      tableName: "products",
      options: productProgram,
      columnName: "ProductProgram",
    },
    {
      name: "ProductType",
      value: productData?.ProductType,
      type: "text",
      inputType: "select",
      options: productTypes,
      placeholder: "Product Type",
      tableName: "products",
      columnName: "ProductTypeID",
    },
  ];

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-black">
      <div className="flex items-center justify-between">
        <Button className="bg-white text-black hover:bg-white/80" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <Button
          disabled={updateProductLoading}
          className="bg-white text-black hover:bg-white/80"
          onClick={() => document.getElementById("submit").click()}
        >
          {updateProductLoading ? "Updating..." : "Update Product"}
        </Button>
      </div>

      {fetchProductLoading && <CustomSkeleton times={20} />}
      {updateProductLoading && <CustomSkeleton times={20} />}

      {fetchLoading && <CustomSkeleton times={20} />}

      <ScrollArea className="flex flex-1 flex-col justify-center p-2 pr-0.5">
        <header className="flex flex-col items-center justify-center gap-2 p-2">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 max-w-72 cursor-pointer rounded-md"
              onClick={() => {
                document.getElementById("productImageInput").click();
              }}
            />
          )}
          <input type="file" hidden id="productImageInput" accept="image/*" onChange={handleFileChange} />
          <Button
            variant="secondary"
            className={`h-20 text-lg uppercase ${imagePreview ? "hidden" : ""}`}
            onClick={() => {
              document.getElementById("productImageInput").click();
            }}
          >
            Add Image
          </Button>
          {fetchProduct?.data?.length === 0 && <div className="self-center text-2xl text-white">No Products Found</div>}
          {fetchError && <div className="self-center text-2xl text-white">{fetchError?.message}</div>}
          {fetchProductError && <div className="flex-1 self-center text-2xl text-white">{fetchProductError?.message}</div>}
          {updateProductError && <div className="text-white">{updateProductError?.message}</div>}
        </header>
        {!fetchProductError && productData !== null && (
          <section>
            <div className="flex flex-col gap-2 px-2 text-black">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col text-white">
                  {productFields.map((field) => (
                    <TogglableField
                      key={field.name}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      type={field.type}
                      id={productData?.ProductID}
                      inputType={field.inputType}
                      setTriggerRefresh={setTriggerRefresh}
                      tableName={field.tableName}
                      columnName={field.columnName}
                      options={field?.options}
                    />
                  ))}
                </div>
                <div className="space-x-6">
                  <Button variant="secondary" size="icon" type="button" onClick={handleAddVariantField}>
                    <Plus />
                  </Button>
                </div>
                {productData.ProductVariants.map((product, index) => (
                  <div key={product.ProductVariant} className="flex flex-wrap gap-2 border-b-2 border-y-gray-300 pb-5 text-white">
                    <TogglableField
                      defaultValue={product.ProductVariantName}
                      placeholder="Product Variant Name"
                      type="number"
                      id={product.ProductVariant}
                      tableName={"productattributes"}
                      setTriggerRefresh={setTriggerRefresh}
                    />
                    <TogglableField
                      defaultValue={product.ProductVariantValue}
                      placeholder="Product Variant Value"
                      type="number"
                      id={product.ProductVariant}
                      setTriggerRefresh={setTriggerRefresh}
                      tableName={"productattributes"}
                    />
                    <TogglableField
                      defaultValue={product.ProductSize}
                      placeholder="Product Size"
                      type="number"
                      setTriggerRefresh={setTriggerRefresh}
                      tableName={"productattributes"}
                    />
                    <TogglableField
                      defaultValue={product.ProductPrice}
                      placeholder="Product Price"
                      type="number"
                      setTriggerRefresh={setTriggerRefresh}
                      tableName={"productattributes"}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      type="button"
                      disabled={productData.ProductVariants.length === 1}
                      onClick={() => {
                        handleRemoveVariantField(index);
                      }}
                    >
                      <Minus />
                    </Button>
                  </div>
                ))}
                <form onSubmit={handleSubmit(handleOnFormSubmit)}>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-wrap gap-2 border-b-2 border-y-gray-300 pb-5 text-black">
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
                      <Button variant="secondary" size="icon" type="button" onClick={() => remove(index)}>
                        <Minus />
                      </Button>
                    </div>
                  ))}
                </form>
              </div>

              <button className="hidden" id="submit"></button>
            </div>
          </section>
        )}
      </ScrollArea>
    </main>
  );
}
