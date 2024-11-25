import { formatCurrency } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
export const columnsOrderDetailsColumns = [
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
          <span className={`badge font-semibold tracking-wider text-white ${badgeColor}`}>{statusText.toUpperCase()}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "Total",
    header: () => <div className="text-center">Total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.original.P_AttributePrice) * parseFloat(row.getValue("OrderQuantity"));

      const formatted = formatCurrency(total);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];
