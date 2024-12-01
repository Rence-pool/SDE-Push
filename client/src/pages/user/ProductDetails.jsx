import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

import ToggleFavorite from "@/components/ToggleFavorite";

import ManageDynamicPrice from "@/components/ManageDynamicPrice";
export default function ProductDetails() {
  const { productId } = useParams();

  const {
    data: fetchData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(`http://localhost:3000/api/products/display-user/product-details/${productId}`, []);
  const productData = fetchData?.data;

  const productAttributes = new Set();
  const productSizes = new Set();

  if (productData?.length > 0) {
    productData.forEach((product) => {
      productAttributes.add(product.P_AttributeValue);
      productSizes.add(product.P_AttributeSize);
    });
  }

  return (
    <main className="scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-900 m-1 flex flex-1 flex-col gap-5 overflow-auto rounded-xl bg-white p-5 lg:flex-row">
      {/* Product Information of {productId} */}
      {fetchError && <div className="m-auto text-2xl text-white">Error: {fetchError.message}</div>}
      {fetchLoading && <CustomSkeleton times={100} />}
      {!fetchError && !fetchLoading && fetchData?.data?.length > 0 && (
        // <ScrollArea className="h-[45rem] flex-1 pr-0 lg:pr-10">
        <>
          <section className="flex flex-1 items-center justify-center p-5 outline lg:max-w-[45rem]">
            <img
              src={`http://localhost:3000/images/products/${productData[0].ProductImage}`}
              alt="Product Image"
              className="h-full rounded-2xl object-cover shadow-xl"
            />
          </section>
          <section className="flex flex-1 flex-col gap-5 text-black">
            <header className="flex">
              {/* Take Entire Space */}
              <div className="flex flex-1 flex-col gap-5">
                {/* Space  */}
                <span className="text-4xl font-bold">{productData[0].ProductName}</span>
                <span className="text-xl font-semibold">{productData[0].ProductDescription}</span>
                <span className="text-xl font-semibold">Available for limited time only</span>
              </div>
              <div className="flex items-center">
                <ToggleFavorite productId={productData[0].ProductID} />
              </div>
            </header>
            <ManageDynamicPrice productData={productData} productAttributes={productAttributes} productSizes={productSizes} />
          </section>
        </>
      )}
    </main>
  );
}
