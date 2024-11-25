import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInput } from "@/hooks/useInput";
import Input from "@/components/Input";
import SelectModal from "@/components/modals/SelectModal";
import { usePost } from "@/hooks/usePost";
import { toast } from "sonner";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { Minus, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
export default function ModifyProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [image, setImage] = useState(null);
  const {
    data: fetchProduct,
    loading: fetchProductLoading,
    error: fetchProductError,
  } = useFetch(
    `http://localhost:3000/api/products/fetch/${productId}`,
    [],
    "Error fetching Products",
  );

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    setValue,
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

  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: product_info,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(
    "http://localhost:3000/api/products/fetch/product-info",
    [],
    "Error fetching Products",
  );
  const {
    data: postData,
    loading: postLoading,
    error: postError,

    postData: postProduct,
  } = usePost("http://localhost:3000/api/products/post/new_product", null);
  const {
    value: productType,
    handleInputChange: handleProductTypeChange,
    handleInputBlur: handleProductTypeBlur,
    hasError: productTypeHasError,
    setEnteredValue: setProductType,
  } = useInput("", (value) => value !== "" && value !== "-");
  const {
    value: productProgramID,
    handleInputChange: handleProductProgramIDChange,
    handleInputBlur: handleProductProgramIDBlur,
    hasError: productProgramIDHasError,
    setEnteredValue: setProductProgramID,
  } = useInput("", (value) => value !== "" && value !== "-");

  useEffect(() => {
    if (fetchProduct?.data?.length > 0) {
      console.log("fetchProduct", fetchProduct);
      setProductProgramID(fetchProduct.data[0].ProductProgram);
      setProductType(fetchProduct.data[0].ProductType);
      setValue("productID", fetchProduct.data[0].ProductID);
      setValue("productName", fetchProduct.data[0].ProductName);
      setValue("productDescription", fetchProduct.data[0].ProductDescription);
      setValue("productDefaultPrice", fetchProduct.data[0].ProductDefaultPrice);

      let productAttributes = [];
      fetchProduct.data[0].ProductVariants.forEach((variant) => {
        productAttributes.push({
          productAttributeName: variant.ProductVariantName,
          productAttributeValue: variant.ProductVariantValue,
          productAttributeSize: variant.ProductSize,
          productAttributePrice: variant.ProductPrice,
        });
      });
      setValue("productAttributes", productAttributes);
      setImagePreview(
        `http://localhost:3000/images/products/${
          fetchProduct.data[0].ProductImage
        }`,
      );
    }
  }, [fetchProduct, setProductProgramID, setProductType, setValue]);

  let productTypes = [];
  let productProgram = [];
  if (product_info?.data?.length > 0) {
    productTypes = product_info.data[0]?.map((type) => ({
      label: type.ProductTypename,
      value: type.ProductTypeID,
    }));

    productProgram = product_info.data[1]?.map((type) => ({
      label: type.ProgramName,
      value: type.ProgramID,
    }));
  }

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
    if (postData?.message === "Product Posting successfull") {
      toast("Created  Product Successful 🎉", {
        className: "m-5",
        description: `Placed Product successfully  `,
      });
    }
  }, [postData]);

  const onNewSubmit = async (data) => {
    if (
      productTypeHasError ||
      productProgramIDHasError ||
      productType === "" ||
      productProgramID === ""
    ) {
      setError("root", {
        message: "Please fill all the fields",
      });
      return;
    }

    data.productProgram = productProgramID;
    data.productType = productType;

    data.productAttributes = data.productAttributes.map((field) => {
      return {
        productAttributeName: field.productAttributeName.toUpperCase(),
        productAttributeValue: field.productAttributeValue.toUpperCase(),
        productAttributeSize: field.productAttributeSize.toUpperCase(),
        productAttributePrice: field.productAttributePrice.toFixed(2),
       
     
      };
    });
    data.productImage = image;

    const formData = new FormData();
    formData.append("productImage", data.productImage);
    formData.append("productID", data.productID);
    formData.append("productName", data.productName);
    formData.append("productDescription", data.productDescription);
    formData.append("productDefaultPrice", data.productDefaultPrice);
    formData.append("productProgram", data.productProgram);
    formData.append("productType", data.productType);
    formData.append(
      "stringProductAttributes",
      JSON.stringify(data.productAttributes),
    );
    // const dataForm = Object.fromEntries(formData.entries());
    // console.log("formData", JSON.parse(dataForm.productAttributes));

    // await postProduct(formData);
  };
  // console.log("post error", postError);
  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-black">
      <div className="flex items-center justify-between">
        <Button
          className="bg-white text-black hover:bg-white/80"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>

        <Button
          disabled={postLoading || fetchLoading}
          className="bg-white text-black hover:bg-white/80"
          onClick={() => document.getElementById("submit").click()}
        >
          {postLoading || fetchLoading ? "Posting..." : "Post Product"}
        </Button>
      </div>

      {postError && <div className="text-white">{postError?.message}</div>}
      {fetchError && <div>{fetchError?.message}</div>}

      {postLoading || (fetchLoading && <CustomSkeleton times={20} />)}
      <ScrollArea className="flex flex-1 flex-col justify-center p-2 pr-0.5">
        <header className="flex flex-col items-center justify-center gap-2 p-2">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 max-w-72 cursor-pointer rounded-md outline"
              onClick={() => {
                document.getElementById("productImageInput").click();
              }}
            />
          )}
          <input
            type="file"
            hidden
            id="productImageInput"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            variant="secondary"
            className={`h-20 text-lg uppercase ${imagePreview ? "hidden" : ""}`}
            onClick={() => {
              document.getElementById("productImageInput").click();
            }}
          >
            Add Image
          </Button>
        </header>
        <section>
          <form
            onSubmit={handleSubmit(onNewSubmit)}
            className="flex flex-col gap-2 px-2 text-black"
          >
            {errors && errors.root && (
              <div className="text-white">{errors.root.message}</div>
            )}
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
                    const productDefaultPrice = getValues(
                      "productDefaultPrice",
                    );
                    prepend({
                      productAttributeName: "",
                      productAttributeValue: "",
                      productAttributeSize: "",
                      productAttributePrice: Number(productDefaultPrice),
                     
                    });
                  }}
                >
                  <Plus />
                </Button>
              </div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-wrap gap-2 border-b-2 border-y-gray-300 pb-5"
                >
                  <Input
                    labelStyle="text-white"
                    type="text"
                    id={`product-attribute-name-${index}`}
                    placeholder="Product Attribute Name"
                    register={{
                      ...register(
                        `productAttributes.${index}.productAttributeName`,
                        {
                          required: true,
                        },
                      ),
                    }}
                    isError={
                      errors.productAttributes?.[index]?.productAttributeName
                    }
                  />
                  <Input
                    labelStyle="text-white"
                    type="text"
                    id={`product-attribute-value-${index}`}
                    placeholder="Product Attribute Value"
                    register={{
                      ...register(
                        `productAttributes.${index}.productAttributeValue`,
                        {
                          required: true,
                        },
                      ),
                    }}
                    isError={
                      errors.productAttributes?.[index]?.productAttributeValue
                    }
                  />
                  <Input
                    labelStyle="text-white"
                    type="text"
                    id={`product-attribute-size-${index}`}
                    placeholder="Product Attribute Size"
                    register={{
                      ...register(
                        `productAttributes.${index}.productAttributeSize`,
                        {
                          required: true,
                        },
                      ),
                    }}
                    isError={
                      errors.productAttributes?.[index]?.productAttributeSize
                    }
                  />
                  <Input
                    labelStyle="text-white"
                    type="number"
                    id={`product-attribute-price-${index}`}
                    placeholder="Product Price"
                    register={{
                      ...register(
                        `productAttributes.${index}.productAttributePrice`,
                        {
                          required: true,
                          valueAsNumber: true,
                          validate: (value) => !isNaN(value) && value > 0,
                        },
                      ),
                    }}
                    isError={
                      errors.productAttributes?.[index]?.productAttributePrice
                    }
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
          </form>
        </section>
      </ScrollArea>
    </main>
  );
}
