import { useFetch } from "@/hooks/useFetch";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/functions";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useNavigate } from "react-router-dom";
import OrdersTable from "@/components/OrdersTable";
export default function OrderStatus() {
  const navigate = useNavigate();
  const {
    data: orderedData,
    loading,
    error,
    setTriggerRefresh,
  } = useFetch(
    "http://localhost:3000/api/orders/fetch",
    [],
    "Error fetching Order Status",
  );
  const newOrderedData = [];
  function reareangeData(passedData) {
    if (!passedData) return;

    for (let i = 0; i < passedData.length; i++) {
      newOrderedData.push({
        or_date: passedData[i].OrderDate.split("T")[0],
        or_no: passedData[i].OrderID,
        status: passedData[i].OrderStatusID,
        sales: passedData[i].Sales,
        total: passedData[i].TotalAmount,
        s_name: ` ${passedData[i].UserFName} ${passedData[i].UserLName}`,
        s_program: passedData[i].Program,
        s_no: passedData[i].UserID,
        order: passedData[i].Order,
      });
    }
  }

  reareangeData(orderedData?.data);
  const orderStatusColumn = [
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
      accessorKey: "or_date",
      header: ({ column }) => {
        return (
          <div className="flex">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Order Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },

      cell: ({ row }) => {
        const formattedDate = format(row.getValue("or_date"), "MMM dd, y");

        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "or_no",
      header: () => <div className="text-center">Order Number</div>,
      cell: ({ row }) => {
        const orderNumber = row.getValue("or_no");
        return <div className="text-center">{orderNumber}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const order_status = row.getValue("status");
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
      accessorKey: "total",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"));
        const formatted = formatCurrency(total);
        return <div className="text-left font-medium">{formatted}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const orderNumber = row.getValue("or_no");

        return (
          <div className="flex items-center justify-center space-x-5">
            <Button
              variant="outline"
              onClick={() =>
                navigate(`/employee/orders/order-details/${orderNumber}`)
              }
            >
              View Order Details
            </Button>
            <Button variant="outline">Order Receipt (PDF)</Button>
          </div>
        );
      },
    },
  ];
  return (
    <section className="flex h-full flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        {loading && <CustomSkeleton times={20} />}
        {error && (
          <div className="m-auto text-2xl text-white">
            Error: {error.message}
          </div>
        )}

        {!loading && !error && (
          <OrdersTable
            refresher={setTriggerRefresh}
            data={newOrderedData}
            columns={orderStatusColumn}
            input_search="or_no"
          />
        )}
      </div>
    </section>
  );
}
