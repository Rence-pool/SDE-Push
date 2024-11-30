import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";

export default function OrderDetailsTable({ data, columns, input_search = "s_name" }) {
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
    <div className="z-0 flex flex-1 flex-col text-black">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Filter Order"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(input_search)?.setFilterValue(event.target.value)}
            className="flex-1"
          />
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
      <div className="flex h-[17rem] overflow-hidden rounded-md bg-white">
        <CustomTable columns={columns} table={table} flexRender={flexRender} />
      </div>
    </div>
  );
}
OrderDetailsTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};
