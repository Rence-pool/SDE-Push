import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/functions";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CustomCarousell from "@/components/customs/CustomCarousell";
export default function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/products/fetch/${productId}`,
    [],
    `Error fetching ${productId} Data`,
  );
  console.log("data", data);

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-white">
      <Button
        className="self-start bg-white text-black hover:bg-white/80"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </Button>
      <span className="text-center text-2xl font-semibold">
        Product Details of {!error && !loading && data.data[0].ProductName}
      </span>
      <ScrollArea className="flex flex-1 flex-col pr-0.5">
        <div className="m-5 flex flex-col gap-2 justify-self-center">
          <CustomCarousell />
          <span>
            Product Details {""}
            {!error && !loading && data.data[0].ProductDescription}
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly gap-5 py-2 text-black">
          {loading && (
            <>
              <CustomSkeleton times={20} />
            </>
          )}
          {error && (
            <div className="flex-1 text-center text-5xl font-semibold uppercase tracking-wider text-white">
              {error.message}
            </div>
          )}

          {!loading &&
            !error &&
            data.data.length > 0 &&
            data.data[0]?.ProductVariants?.map((product) => {
              console.log(product);
              return (
                <div
                  key={product.ProductSizeID}
                  className="card w-[10rem] bg-white shadow-xl hover:ring-2 hover:ring-black lg:w-[17rem]"
                >
                  <div className="card-body px-0.5 text-center lg:px-2">
                    <div className="card-title text-start">
                      <h2 className="flex-1 text-start text-xs font-semibold lg:text-lg">
                        {product.ProductSizeName}
                      </h2>
                    </div>
                    <span className="text-start text-xs font-bold text-black lg:text-base">
                      {formatCurrency(product.ProductPrice)}
                    </span>

                    {product.ProductVariantName !== "NULL" && (
                      <span className="text-start">
                        {product.ProductVariantName}
                      </span>
                    )}

                    <div className="card-actions mt-1 flex justify-center text-xs">
                      <Button className="btn btn-primary flex-1">
                        Add To Cart
                      </Button>
                      <Button className="btn btn-primary flex-1">
                        Process Order
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </ScrollArea>
    </main>
  );
}
