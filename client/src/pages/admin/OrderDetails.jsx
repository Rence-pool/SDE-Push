import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { formatCurrency } from "@/lib/functions";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrderBreakdownTable from "@/components/table/OrderDetailsTable";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/orders/fetch/${orderId}`,
    [],
    `Error fetching ${orderId} Data`,
  );
  const orderDetails = data.data === undefined ? [] : data.data;
  console.log("data", orderDetails);
  const columnsOrderDetailsColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "ProductName",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
                console.log(column.getIsSorted());
              }}
            >
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "P_AttributeValue",
      header: () => <div className="text-center">Product Variant</div>,
      cell: ({ row }) => {
        const productVariantID = row.getValue("P_AttributeValue");
        return <div className="text-center">{productVariantID}</div>;
      },
    },
    {
      accessorKey: "P_AttributeSize",
      header: () => <div className="text-center">Product Size</div>,
      cell: ({ row }) => {
        const productSizeID = row.getValue("P_AttributeSize");
        return <div className="text-center">{productSizeID}</div>;
      },
    },

    {
      accessorKey: "OrderQuantity",
      header: () => <div className="text-center">Order Quantity</div>,
      cell: ({ row }) => {
        const studentNumber = row.getValue("OrderQuantity");
        return <div className="text-center">{studentNumber}</div>;
      },
    },
    {
      accessorKey: "OrderStatusID",
      header: () => <div className="text-center">Order Status</div>,
      cell: ({ row }) => {
        const order_status = row.getValue("OrderStatusID");
        let badgeColor = "";
        let statusText = "";
        if (order_status === "ORDER_200") {
          badgeColor = "badge-success";
          statusText = "completed";
        } else if (order_status === "ORDER_600") {
          badgeColor = "badge-info";
          statusText = "on going";
        } else if (order_status === "ORDER_400") {
          badgeColor = "badge-error";
          statusText = "failed";
        }
        return (
          <div className="flex justify-center">
            <span
              className={`badge font-semibold tracking-wider text-white ${badgeColor}`}
            >
              {statusText.toUpperCase()}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "Total",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => {
        // console.log(row);
        const total =
          parseFloat(row.original.P_AttributePrice) *
          parseFloat(row.getValue("OrderQuantity"));

        const formatted = formatCurrency(total);
        return <div className="text-left font-medium">{formatted}</div>;
      },
    },
  ];
  if (loading) {
    return <CustomSkeleton times={100} />;
  }
  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-white">
      <Button
        className="self-start bg-white text-black hover:bg-white/80"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </Button>
      {!error && !loading && (
        <div className="flex flex-col items-start gap-2 self-center text-center">
          <span className="text-center text-2xl font-semibold">
            Breakdown of{" "}
            {`${orderDetails[0].UserFName}  ${orderDetails[0].UserLName}`}
            {"`"}s Order
          </span>
          <span className="text-center text-2xl font-semibold">
            Student Number: {`${orderDetails[0].UserID}`}
          </span>
          <span className="text-center text-2xl font-semibold">
            Student Program: {`${orderDetails[0].Program[0]}`}
          </span>
          <span className="text-center text-2xl font-semibold">
            Order Date: {`${format(orderDetails[0].OrderDate, "MMM dd, y")}`}
          </span>
          <span className="text-center text-2xl font-semibold">
            Order Time: {`${orderDetails[0].OrderDate.split("T")[1]}`}
          </span>
          <span className="text-center text-2xl font-semibold">
            Order Total: {orderDetails[0].TotalOrder}
          </span>
        </div>
      )}

      <ScrollArea className="z-50 flex h-[20rem] flex-1 flex-col overflow-hidden rounded-lg pr-5 text-black">
        <OrderBreakdownTable
          columns={columnsOrderDetailsColumns}
          data={orderDetails}
          error={error}
          input_search="ProductName"
        />
      </ScrollArea>
    </main>
  );
}
