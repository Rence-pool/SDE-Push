import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";


import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CustomSelect from "@/components/customs/CustomSelect";
import { navigationOptions } from "@/lib/navigation_options";
import DisplayProduct from "@/components/DisplayProduct";
import Card from './Card'; 

export default function Products() {
  const { productCategory } = useParams();
  const { data, loading, error } = useFetch("http://localhost:3000/api/products/display-user", [], "Error fetching Products");
  const navigate = useNavigate();
  return (
    <main className="flex flex-1 flex-col overflow-hidden rounded-t-2xl bg-white text-black">
      <section className="m-5 flex gap-5 p-5 outline">
        <span className="text-2xl font-bold uppercase">{productCategory}</span>
        <div className="flex">
          <CustomSelect label="product Types" options={navigationOptions} onItemSelected={(value) => navigate(`/products/${value}`)} />
        </div>
      </section>
      <span className="divider" />
      <ScrollArea className="h-[33rem]">
        <div className="flex flex-wrap justify-evenly gap-5">
        {loading && <CustomSkeleton times={50} />}
          {error && <Card />}
          {!error && !loading && (
            <ul className="flex flex-wrap justify-evenly gap-5">
              {data.data.map((item) => (
                <li key={item.ProductID} className="flex gap-2">
                  <DisplayProduct key={item.ProductID} item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </main>
  );
}
