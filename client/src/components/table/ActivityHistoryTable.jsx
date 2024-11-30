import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";
import { filterDate } from "@/lib/filterDate";
import DynamicTableToPrintPDF from "../DynamicTableToPrintPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function ActivityHistoryTable({ activityType, date, data, columns, input_search }) {
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

  const formatTypeName = activityType.charAt(0) + activityType.slice(1).toLowerCase();

  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Search Activity"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(input_search)?.setFilterValue(event.target.value)}
            className="flex-1"
          />

          <PDFDownloadLink
            document={
              <DynamicTableToPrintPDF
                date={filterDate(date)}
                data={data}
                title={"Activity History"}
                columns={columns.filter((column) => column?.id !== "actions")}
              />
            }
            fileName={`Activity History of ${formatTypeName} ${filterDate(date)}.pdf`}
          >
            {({ loading, error }) => (
              <Button variant="outline" disabled={loading || data.length === 0} className="ml-auto">
                {loading ? "Loading document..." : error ? "Error" : `Download ${formatTypeName} Activity History`}
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
      <div className="flex h-[30rem] flex-col overflow-hidden rounded-md bg-white">
        <CustomTable columns={columns} table={table} flexRender={flexRender} />
        <div className="m-5">
          <span>{data?.length} Logs</span>
        </div>
      </div>
    </div>
  );
}
ActivityHistoryTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
  date: PropTypes.object,
  activityType: PropTypes.string,
};
