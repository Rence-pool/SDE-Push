import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { Minus } from "lucide-react";
import { useParams } from "react-router-dom";
import { productTypes_productProgram } from "../../lib/product_types_product_program";
import { useEffect } from "react";
import TogglableField from "@/components/TogglableField";

import ProductImage from "@/components/ProductImage";
import ProductVariantFields from "@/components/ProductVariantFields";
export default function ModifyProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

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

  useEffect(() => {
    if (fetchProduct?.data?.length > 0) {
      //
    }
  }, [fetchProduct]);

  const productData = fetchProduct?.data?.length > 0 ? fetchProduct.data[0] : null;

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
  const handleRemoveVariantField = (productVariantIndex) => {
    // Update the productData state with the new productVariants array
    console.log(productVariantIndex);
  };

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
          <ProductImage defaultImage={`http://localhost:3000/images/products/${productData?.ProductImage}`} productData={productData} />
          {fetchProduct?.data?.length === 0 && <div className="self-center text-2xl text-white">No Products Found</div>}
          {fetchError && <div className="self-center text-2xl text-white">{fetchError?.message}</div>}
          {fetchProductError && <div className="flex-1 self-center text-2xl text-white">{fetchProductError?.message}</div>}
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
                      productName={productData?.ProductName}
                    />
                  ))}
                </div>

                {productData.ProductVariants.map((product, index) => (
                  <div key={product.ProductVariant} className="flex flex-wrap gap-2 pb-5 text-white">
                    <TogglableField
                      defaultValue={product.ProductVariantName}
                      placeholder="Product Variant Name"
                      type="text"
                      id={product.ProductVariant.toString()}
                      tableName={"productattributes"}
                      setTriggerRefresh={setTriggerRefresh}
                      inputType="text"
                      productName={productData?.ProductName}
                      columnName={"P_AttributeName"}
                    />
                    <TogglableField
                      defaultValue={product.ProductVariantValue}
                      placeholder="Product Variant Value"
                      type="text"
                      id={product.ProductVariant.toString()}
                      tableName={"productattributes"}
                      setTriggerRefresh={setTriggerRefresh}
                      inputType="text"
                      productName={productData?.ProductName}
                      columnName={"P_AttributeValue"}
                    />
                    <TogglableField
                      defaultValue={product.ProductSize}
                      placeholder="Product Size"
                      type="number"
                      id={product.ProductVariant.toString()}
                      tableName={"productattributes"}
                      setTriggerRefresh={setTriggerRefresh}
                      inputType="text"
                      productName={productData?.ProductName}
                      columnName={"P_AttributeSize"}
                    />
                    <TogglableField
                      defaultValue={product.ProductPrice}
                      placeholder="Product Price"
                      type="number"
                      id={product.ProductVariant.toString()}
                      tableName={"productattributes"}
                      setTriggerRefresh={setTriggerRefresh}
                      inputType="text"
                      productName={productData?.ProductName}
                      columnName={"P_AttributePrice"}
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
                <ProductVariantFields setTriggerRefresh={setTriggerRefresh} productData={productData} />
              </div>
            </div>
          </section>
        )}
      </ScrollArea>
    </main>
  );
}
