import { format } from "date-fns";
import { formatCurrency } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export const salesHistoryColumns = [
  {
    accessorKey: "PaymentDate",
    header: () => <div className="flex justify-center">Payment Date</div>,
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("PaymentDate"), "MMM dd, y");
      return <div className="text-center">{formattedDate}</div>;
    },
  },

  {
    accessorKey: "OrderID",
    header: () => <div className="text-center">Order Number</div>,
    cell: ({ row }) => {
      const or_no = row.getValue("OrderID");
      return <div className="text-center">{or_no}</div>;
    },
  },
  {
    accessorKey: "OrderDate",
    header: () => <div className="flex justify-center">Order Date</div>,
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("OrderDate"), "MMM dd, y");

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "UserID",
    header: () => <div className="text-center">Student ID</div>,
    cell: ({ row }) => {
      const transaction_person_id = `${row.getValue("UserID")}`;
      return <div className="text-center">{transaction_person_id}</div>;
    },
  },
  {
    accessorKey: "UserFName",
    header: () => <div className="text-center">Student Name</div>,
    cell: ({ row }) => {
      const transaction_person = `${row.getValue("UserFName")} ${row.original.UserLName}`;
      return <div className="text-center">{transaction_person}</div>;
    },
  },

  {
    accessorKey: "PaymentID",
    header: () => <div className="text-center">PaymentID</div>,
    cell: ({ row }) => {
      const paymentID = row.getValue("PaymentID");

      return <div className="text-left">{paymentID}</div>;
    },
  },
  {
    accessorKey: "PaymentAmount",
    header: () => <div className="text-center">Sales</div>,
    cell: ({ row }) => {
      const sales = parseFloat(row.getValue("PaymentAmount"));
      const formatted = formatCurrency(sales);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "ActivityActor",
    header: () => <div className="text-center">Transaction Actor ID</div>,
    cell: ({ row }) => {
      const actor = row.getValue("ActivityActor");

      return <div className="text-left">{actor}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orderNumber = row.getValue("OrderID");
      return (
        <Link to={`/employee/orders/order-details/${orderNumber}`}>
          <Button variant="outline">Details</Button>
        </Link>
      );
    },
  },
];
