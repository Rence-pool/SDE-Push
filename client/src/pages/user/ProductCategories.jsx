import React from "react";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { formatCurrency } from "@/lib/functions";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CustomSelect from "@/components/customs/CustomSelect";
export default function ProductCategories() {
  const { productCategory } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/products/display-user",
    [],
    "Error fetching Products",
  );

  const selectOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "T-Shirts",
      value: "tshirts",
    },
    {
      label: "Uniform And Pants",
      value: "unif_pants",
    },
    {
      label: "Business Administration",
      value: "bsba",
    },
    {
      label: "Physical Education",
      value: "pe",
    },
    {
      label: "Misscellenous",
      value: "misscellenous",
    },
    {
      label: "Arts in Communication",
      value: "bacomm",
    },
    {
      label: "Senior High School",
      value: "sh",
    },
    {
      label: "Limited Edition Item",
      value: "anniv",
    },
  ];
  return (
    <main className="flex flex-1 flex-col overflow-hidden rounded-t-2xl bg-white text-black">
      <section className="flex items-center justify-center gap-5 p-5">
        <span className="text-2xl font-bold uppercase">{productCategory}</span>
        <CustomSelect
          label="product Types"
          options={selectOptions}
          onItemSelected={(value) => navigate(`/product-categories/${value}`)}
        />
      </section>
      <p className="divider"></p>
      <ScrollArea className="flex flex-1 rounded-2xl">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:items-stretch lg:justify-center lg:gap-5 lg:py-2">
          {loading && <CustomSkeleton times={50} />}
          {error && (
            <div className="m-auto text-xs">Error: {error.message}</div>
          )}
          {!error &&
            !loading &&
            data.data.map((item) => (
              <div
                key={item.ProductID}
                className="card bg-primary w-[10rem] cursor-pointer text-white shadow-xl hover:ring-2 hover:ring-yellow-500 lg:w-[17rem]"
              >
                <figure
                  className="p-2 lg:px-4 lg:pt-5"
                  onClick={() =>
                    navigate(`/product_fullDetails/${item.ProductID}`)
                  }
                >
                  <img
                    src={`http://localhost:3000/images/products/${item.ProductImage}`}
                    alt="Shoes"
                    className="h-auto rounded-xl object-contain lg:h-[15rem]"
                  />
                </figure>
                <div
                  className="card-body px-0.5 text-center lg:px-2"
                  onClick={() =>
                    navigate(`/product_fullDetails/${item.ProductID}`)
                  }
                >
                  <div className="card-title text-start">
                    <h2 className="flex-1 text-start text-xs font-semibold lg:text-lg">
                      {item.ProductName}
                    </h2>
                  </div>
                  <span className="text-secondary text-start text-xs font-bold lg:text-base">
                    {formatCurrency(item.ProductDefaultPrice || 0)}
                  </span>
                  <span className="text-start text-xs">
                    {item.ProductDescription}
                  </span>
                </div>
                <div className="card-actions m-5 flex text-xs">
                  <Button variant="secondary" type="button" className="flex-1">
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="text-black"
                    type="button"
                  >
                    {<Star />}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </main>
  );
}
