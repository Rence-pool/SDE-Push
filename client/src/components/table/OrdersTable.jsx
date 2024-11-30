import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import CustomSelect from "@/components/customs/CustomSelect";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { getCurrentDate } from "@/lib/functions";
import DynamicTableToPrintPDF from "../DynamicTableToPrintPDF";
import OrderConfirmationSheet from "../../pages/employee/sheets/OrderConfirmationSheet";
import MakeOrdersheet from "../../pages/employee/sheets/MakeOrdersheet";
import TablePagination from "./TablePagination";
import { filterDate } from "@/lib/filterDate";
export default function OrdersTable({ date, data, columns, input_search, refresher }) {
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
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const rowSelected = table.getSelectedRowModel()?.rows;

  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Filter Order"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(input_search)?.setFilterValue(event.target.value)}
            className="flex-1"
          />

          <div className="flex-1">
            <CustomSelect
              label="Order Status"
              options={[
                { label: "All", value: "all" },
                { label: "Completed", value: "ORDER_200" },
                { label: "On Going", value: "ORDER_600" },
                { label: "Failed", value: "ORDER_400" },
              ]}
              onItemSelected={(value) => {
                table.getColumn("status")?.setFilterValue(value === "all" ? "" : value);
              }}
            />
          </div>
          <MakeOrdersheet refresher={refresher} trigger={<Button variant="outline">Create Order</Button>} />
          <OrderConfirmationSheet
            refresher={refresher}
            content={rowSelected.map((row) => row.original)}
            trigger={
              <Button
                variant="outline"
                disabled={
                  rowSelected.length === 0 ||
                  rowSelected.filter((row) => row.original.status === "ORDER_200" || row.original.status === "ORDER_400").length >= 1
                }
              >
                Mark Order Complete
              </Button>
            }
          />

          <PDFDownloadLink
            document={
              <DynamicTableToPrintPDF
                date={filterDate(date)}
                data={data}
                title={"Orders Report"}
                columns={columns.filter((column) => column?.id !== "actions" && column?.id !== "select")}
              />
            }
            fileName={`Orders of ${filterDate(date)}.pdf`}
            // fileName={`Orders of ${getCurrentDate()}.pdf`}
          >
            {({ loading, error }) => (
              <Button variant="outline" disabled={loading || data.length === 0} className="ml-auto">
                {loading ? "Loading document..." : error ? "Error" : "Downloard Orders Report"}
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
      <div className="flex h-[33rem] flex-col overflow-hidden rounded-md bg-white 2xl:h-[48rem]">
        <CustomTable columns={columns} table={table} flexRender={flexRender} />
        <TablePagination table={table} />
      </div>
    </div>
  );
}
OrdersTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
  refresher: PropTypes.func,
  date: PropTypes.object,
};
