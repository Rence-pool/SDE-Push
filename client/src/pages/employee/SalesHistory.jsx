import { format } from "date-fns";

import { formatCurrency } from "@/lib/functions";
import SalesHistoryTable from "@/components/table/SalesHistoryTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import DashboardCalendar from "@/components/DashboardCalendar";

import { useState } from "react";
import { getCurrentDate } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function SalesHistory() {
  const navigate = useNavigate();
  const SalesHistoryColumns = [
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
          <Button
            variant="outline"
            onClick={() =>
              navigate(`/employee/orders/order-details/${orderNumber}`)
            }
          >
            Details
          </Button>
        );
      },
    },
  ];

  const [date, setDate] = useState();
  const {
    data: salesHistoyData,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/api/sales/fetch?from=${date?.from || getCurrentDate()}&to=${date?.to || getCurrentDate()}`,
    [],
    "Error fetching Sales History",
  );
  // console.log("salesHistoyData", salesHistoyData);
  console.log("salesHistoyData", loading);
  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        <div className="mb-5 self-end">
          <DashboardCalendar setDate={setDate} date={date} />
        </div>
        {loading && <CustomSkeleton times={20} />}
        {error && (
          <div className="m-auto text-2xl text-white">
            Error: {error.message}
          </div>
        )}

        {!loading && !error && (
          <>
            <SalesHistoryTable
              data={salesHistoyData.data}
              columns={SalesHistoryColumns}
              input_search="OrderID"
            />
            <div className="flex flex-1">
              <span className="m-5 flex-1 text-xl font-semibold uppercase text-white">
                Row Count: {salesHistoyData?.data?.length}
              </span>
              <span className="m-5 text-2xl font-semibold uppercase text-white">
                Total:{" "}
                {/* {formatCurrency(salesHistoyData?.data[0]?.TotalSales) ===NaN? "0.00" : formatCurrency(salesHistoyData?.data[0]?.TotalSales)} */}
                {formatCurrency(
                  salesHistoyData?.data[0]?.TotalSales === undefined
                    ? "0.00"
                    : salesHistoyData?.data[0]?.TotalSales,
                )}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
