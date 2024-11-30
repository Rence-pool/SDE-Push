import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";
import DynamicTableToPrintPDF from "../DynamicTableToPrintPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { formatCurrency } from "@/lib/functions";
import { filterDate } from "@/lib/filterDate";
export default function SalesHistoryTable({ date, data, columns, input_search = "or_no" }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Search Order Number"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(input_search)?.setFilterValue(event.target.value)}
            className="flex-1"
          />
          <PDFDownloadLink
            document={
              <DynamicTableToPrintPDF
                date={filterDate(date)}
                data={data}
                title={"Sales Report"}
                columns={columns.filter((column) => column?.id !== "actions")}
              />
            }
            fileName={`Sales of ${filterDate(date)}.pdf`}
          >
            {({ loading, error }) => (
              <Button variant="outline" disabled={loading} className="ml-auto">
                {loading ? "Loading document..." : error ? "Error" : "Download Sales Report"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex h-[33rem] flex-col overflow-hidden rounded-md bg-white">
        <CustomTable columns={columns} table={table} flexRender={flexRender} filter />
        <div className="flex flex-1 items-center justify-center p-5 text-black">
          <span className="flex-1 text-xl font-semibold uppercase">Row Count: {data?.length}</span>
          <span className="text-2xl font-semibold uppercase">
            Total: {formatCurrency(data[0]?.TotalSales === undefined ? "0.00" : data[0]?.TotalSales)}
          </span>
        </div>
      </div>
    </div>
  );
}
SalesHistoryTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
  date: PropTypes.object,
};
