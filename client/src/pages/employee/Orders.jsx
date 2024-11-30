import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { ordersColumns } from "@/lib/columns/orders";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { reareangeOrdersData } from "@/lib/orders_functions";
import OrdersTable from "@/components/table/OrdersTable";
import DateRangePicker from "@/components/DateRangePicker";
export default function Orders() {
  const {
    data: orderedData,
    loading,
    error,
    setTriggerRefresh,
  } = useFetch("http://localhost:3000/api/orders/fetch", [], "Error fetching Order Status");
  const [date, setDate] = useState(undefined);
  const newOrderedData = reareangeOrdersData(orderedData?.data);

  const filterData =
    newOrderedData === undefined
      ? []
      : newOrderedData.filter((order) => {
          if (date === undefined) return order;
          const orderDate = new Date(order.or_date);
          const fromDate = new Date(date?.from);
          const toDate = new Date(date?.to);
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          return orderDate >= fromDate && orderDate <= toDate;
        });
  return (
    <section className="flex flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        <div className="flex w-full justify-end">
          <DateRangePicker setDate={setDate} date={date} />
        </div>
        {loading && <CustomSkeleton times={20} />}
        {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}

        {!loading && !error && (
          <OrdersTable date={date} refresher={setTriggerRefresh} data={filterData} columns={ordersColumns} input_search="or_no" />
        )}
      </div>
    </section>
  );
}
