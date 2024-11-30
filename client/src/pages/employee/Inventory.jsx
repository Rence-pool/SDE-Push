import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

import InventoryTable from "@/components/table/InventoryTable";
import { useLocation } from "react-router-dom";

import { inventoryColumns } from "@/lib/columns/inventory";
export default function Inventory() {
  const { data, loading, error, setTriggerRefresh } = useFetch("http://localhost:3000/api/products/fetch", []);

  const location = useLocation();
  const { stockCondition } = location.state || "";


  const fetchData = data.data === undefined ? [] : data.data;
  return (
    <>
      <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-0.5">
            <div className="flex flex-wrap justify-evenly gap-5 pt-2 text-black">
              {loading && (
                <>
                  <CustomSkeleton times={20} />
                </>
              )}
              {error && (
                <div className="flex-1 text-center text-5xl font-semibold uppercase tracking-wider text-white">{error.message}</div>
              )}

              {!loading && !error && (
                <InventoryTable
                  stockCondition={stockCondition}
                  data={fetchData}
                  columns={inventoryColumns(setTriggerRefresh)}
                  input_search="ProductName"
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
