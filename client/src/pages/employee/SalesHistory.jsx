
import SalesHistoryTable from "@/components/table/SalesHistoryTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import DashboardCalendar from "@/components/DateRangePicker";

import { useState } from "react";
import { getCurrentDate } from "@/lib/functions";

import { salesHistoryColumns } from "@/lib/columns/sales_history";
export default function SalesHistory() {
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
  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        <div className="mb-5 self-end">
          <DashboardCalendar setDate={setDate} date={date} />
        </div>
        {loading && <CustomSkeleton times={20} />}
        {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}

        {!loading && !error && (
          <SalesHistoryTable date={date} data={salesHistoyData.data} columns={salesHistoryColumns} input_search="OrderID" />
        )}
      </div>
    </section>
  );
}
