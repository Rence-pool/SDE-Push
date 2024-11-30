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
export default function ModifyProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
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
      setProductData(fetchProduct.data[0]);
    }
  }, [fetchProduct]);
  console.log(fetchProduct);

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

  const handleAddVariantField = () => {};
  const handleRemoveVariantField = (productVariantIndex) => {};

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-black">
      <div className="flex items-center justify-between">
        <Button className="bg-white text-black hover:bg-white/80" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
      </div>

      {fetchProductLoading && <CustomSkeleton times={20} />}

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
        </header>
        {!fetchProductError && productData !== null && (
          <section>
            <div className="flex flex-col gap-2 px-2 text-black">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col text-white">
                  <TogglableField
                    defaultValue={productData.ProductID}
                    placeholder="Product Product ID"
                    setTriggerRefresh={setTriggerRefresh}
                  />
                  <TogglableField defaultValue={productData.ProductName} placeholder="Product Name" setTriggerRefresh={setTriggerRefresh} />
                  <TogglableField
                    defaultValue={productData.ProductDescription}
                    placeholder="Product Description"
                    setTriggerRefresh={setTriggerRefresh}
                  />
                  <TogglableField
                    defaultValue={productData.ProductDefaultPrice}
                    placeholder="Product Default Price"
                    type="number"
                    setTriggerRefresh={setTriggerRefresh}
                  />
                  <TogglableField
                    defaultValue={productData.ProductProgram}
                    placeholder="Product Program"
                    options={productProgram}
                    text="text"
                    inputType="select"
                    setTriggerRefresh={setTriggerRefresh}
                  />
                  <TogglableField
                    defaultValue={productData.ProductType}
                    placeholder="Product Type"
                    options={productTypes}
                    text="text"
                    inputType="select"
                    setTriggerRefresh={setTriggerRefresh}
                  />
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
                      setTriggerRefresh={setTriggerRefresh}
                    />
                    <TogglableField
                      defaultValue={product.ProductVariantValue}
                      placeholder="Product Variant Value"
                      type="number"
                      setTriggerRefresh={setTriggerRefresh}
                    />
                    <TogglableField
                      defaultValue={product.ProductSize}
                      placeholder="Product Size"
                      type="number"
                      setTriggerRefresh={setTriggerRefresh}
                    />
                    <TogglableField
                      defaultValue={product.ProductPrice}
                      placeholder="Product Price"
                      type="number"
                      setTriggerRefresh={setTriggerRefresh}
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
              </div>

              <button className="hidden" id="submit"></button>
            </div>
          </section>
        )}
      </ScrollArea>
    </main>
  );
}
