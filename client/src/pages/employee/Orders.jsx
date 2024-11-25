import { useFetch } from "@/hooks/useFetch";
import { ordersColumns } from "@/lib/columns/orders";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { reareangeOrdersData } from "@/lib/orders_functions";
import OrdersTable from "@/components/OrdersTable";
export default function OrderStatus() {
  const {
    data: orderedData,
    loading,
    error,
    setTriggerRefresh,
  } = useFetch("http://localhost:3000/api/orders/fetch", [], "Error fetching Order Status");
  const newOrderedData = reareangeOrdersData(orderedData?.data);

  return (
    <section className="flex h-full flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        {loading && <CustomSkeleton times={20} />}
        {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}
        {!loading && !error && (
          <OrdersTable refresher={setTriggerRefresh} data={newOrderedData} columns={ordersColumns} input_search="or_no" />
        )}
      </div>
    </section>
  );
}
