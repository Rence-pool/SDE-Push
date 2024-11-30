import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/functions";

export const columnsOrderDetailsColumns = [
  {
    accessorKey: "ProductName",
    header: () => {
      return <div className="flex justify-center">Product Name</div>;
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orderNumber = row.getValue("OrderID");
      return (
        <div className="z-0 flex items-center justify-center space-x-5">
          <Button variant="outline">Defected Item </Button>
        </div>
      );
    },
  },
];
