import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CustomSelect from "@/components/customs/CustomSelect";
import { navigationOptions } from "@/lib/navigation_options";
import DisplayProduct from "@/components/DisplayProduct";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
import { useEffect } from "react";

export default function Products() {
  const { productCategory } = useParams();
  const { data, loading, error, setTriggerRefresh } = useFetch(
    "http://localhost:3000/api/products/display-user",
    [],
    "Error fetching Products",
  );

  const {
    userState: { id },
  } = useContext(AuthContext);

  const {
    data: favoriteData,
    loading: favoriteLoading,
    error: favoriteError,
    setTriggerRefresh: setFavoriteTriggerRefresh,
  } = useFetch(`http://localhost:3000/api/products/display/favorite/${id}`, [], "Error fetching favorite Products");

  const dataRefresher = useCallback(() => {
    setTriggerRefresh((prevState) => !prevState);
    setFavoriteTriggerRefresh((prevState) => !prevState);
  }, [setTriggerRefresh, setFavoriteTriggerRefresh]);
  useEffect(() => {
    dataRefresher();
  }, [productCategory, dataRefresher]);

  let productData = data?.data || [];
  let favoriteProductData = favoriteData?.data || [];
  if (productCategory === "favorites") {
    productData = productData.filter((product) =>
      favoriteProductData.find((favoriteProduct) => favoriteProduct.ProductID === product.ProductID),
    );
  }
  const navigate = useNavigate();
  return (
    <main className="flex flex-1 flex-col overflow-hidden rounded-t-2xl bg-white text-black">
      <section className="m-5 flex items-center justify-center gap-5 p-2">
        <span className="min-w-[45rem] text-2xl font-bold uppercase">{productCategory}</span>
        <div className="flex flex-1">
          <CustomSelect label="product Types" options={navigationOptions} onItemSelected={(value) => navigate(`/products/${value}`)} />
        </div>
      </section>
      <span className="divider m-0" />
      <ScrollArea className="h-[33rem]">
        <div className="flex flex-wrap justify-evenly gap-5">
          {loading && <CustomSkeleton times={50} />}
          {favoriteLoading && <CustomSkeleton times={50} />}
          {error && <div className="m-auto text-xs">Error: {error.message}</div>}
          {favoriteError && <div className="m-auto text-xs">Error: {favoriteError.message}</div>}

          <ul className="flex flex-wrap justify-evenly gap-5">
            {!error &&
              !loading &&
              !favoriteError &&
              productData.map((item) => (
                <li key={item.ProductID} className="flex gap-2">
                  <DisplayProduct
                    key={item.ProductID}
                    item={item}
                    favoriteProductData={favoriteProductData}
                    dataRefresher={dataRefresher}
                  />
                </li>
              ))}
          </ul>
        </div>
      </ScrollArea>
    </main>
  );
}
