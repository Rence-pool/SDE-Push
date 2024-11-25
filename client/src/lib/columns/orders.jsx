import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/functions";
import { Link } from "react-router-dom";
export const ordersColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "or_date",
    header: ({ column }) => {
      return (
        <div className="flex">
          <Button variant="ghost" className="flex-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
          <span className={`badge font-semibold tracking-wider text-white ${badgeColor}`}>{statusText.toUpperCase()}</span>
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
          <Link to={`/employee/orders/order-details/${orderNumber}`}>
            <Button variant="outline">View Order Details</Button>
          </Link>
          <Button variant="outline">Order Receipt (PDF)</Button>
        </div>
      );
    },
  },
];
