import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrderBreakdownTable from "@/components/table/OrderDetailsTable";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columnsOrderDetailsColumns } from "@/lib/columns/order_details";
export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, loading, error } = useFetch(`http://localhost:3000/api/orders/fetch/${orderId}`, [], `Error fetching ${orderId} Data`);
  const orderDetails = data.data === undefined ? [] : data.data;

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-white">
      <Button className="self-start bg-white text-black hover:bg-white/80" onClick={() => navigate(-1)}>
        <ChevronLeft />
      </Button>
      {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}
      {loading && <CustomSkeleton times={100} />}
      {!error && !loading && (
        <div className="flex flex-col items-start gap-2 self-center text-center">
          <span className="text-center text-2xl font-semibold">
            Breakdown of {`${orderDetails[0].UserFName}  ${orderDetails[0].UserLName}`}
            {"`"}s Order
          </span>
          <span className="text-center text-2xl font-semibold">Student Number: {`${orderDetails[0].UserID}`}</span>
          <span className="text-center text-2xl font-semibold">Student Program: {`${orderDetails[0].Program[0]}`}</span>
          <span className="text-center text-2xl font-semibold">Order Date: {`${format(orderDetails[0].OrderDate, "MMM dd, y")}`}</span>
          <span className="text-center text-2xl font-semibold">Order Time: {`${orderDetails[0].OrderDate.split("T")[1]}`}</span>
          <span className="text-center text-2xl font-semibold">Order Total: {orderDetails[0].TotalOrder}</span>
        </div>
      )}

      <ScrollArea className="z-50 flex h-[20rem] flex-1 flex-col overflow-hidden rounded-lg pr-5 text-black">
        <OrderBreakdownTable columns={columnsOrderDetailsColumns} data={orderDetails} error={error} input_search="ProductName" />
      </ScrollArea>
    </main>
  );
}
