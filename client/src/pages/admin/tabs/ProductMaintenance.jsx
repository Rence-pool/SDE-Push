import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { productMaintenanceColumns } from "@/lib/columns/product_maintenance";
import { useNavigate } from "react-router-dom";
import MaintenanceProductTable from "@/components/table/MaintenanceProductTable";
import ModifyProductTypes from "../sheets/ModifyProductTypes";
export default function ProductMaintenance() {
  const navigate = useNavigate();
  const { data: fetchData, loading, error } = useFetch("http://localhost:3000/api/products/fetch/display", []);


  return (
    <>
      <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-0.5 text-black">
            {loading && (
              <>
                <CustomSkeleton times={20} />
              </>
            )}
            {error && <div className="flex-1 text-center text-5xl font-semibold uppercase tracking-wider text-white">{error.message}</div>}
            {!loading && !error && (
              <>
                <div className="space-x-5">
                  <Button onClick={() => navigate("/admin/maintenance/add-product")} variant="secondary">
                    Add Product
                  </Button>
                  <Button
                    // onClick={() => navigate("/admin/maintenance/add-inventory")}
                    variant="secondary"
                  >
                    Disable Product
                  </Button>
                  <ModifyProductTypes trigger={<Button variant="secondary">Modify Product Types</Button>} />
                </div>
                <MaintenanceProductTable
                  data={fetchData.data === undefined ? [] : fetchData.data}
                  columns={productMaintenanceColumns}
                  input_search="ProductName"
                />
              </>
            )}
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
