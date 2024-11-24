import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import CustomSelect from "@/components/customs/CustomSelect";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./table/CustomTable";
import { useUpdate } from "@/hooks/useUpdate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { getCurrentDate } from "@/lib/functions";
import TableToPrint from "./TablePrint";
import OrderConfirmationSheet from "../pages/employee/sheets/OrderConfirmationSheet";
import MakeOrdersheet from "../pages/employee/sheets/MakeOrdersheet";

export default function OrdersTable({ data, columns, input_search }) {
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
  const {
    data: updateData,
    loading,
    error,
    updateValue,
  } = useUpdate([], "http://localhost:3000/api/orders/update/status/");
  const rowSelected = table.getSelectedRowModel()?.rows;

  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Filter Order"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(input_search)?.setFilterValue(event.target.value)
            }
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
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? "" : value);
              }}
            />
          </div>
          <MakeOrdersheet
            trigger={<Button variant="outline">Make Order</Button>}
          />
          <OrderConfirmationSheet
            content={rowSelected.map((row) => row.original)}
            trigger={
              <Button
                variant="outline"
                disabled={
                  rowSelected.length === 0 ||
                  rowSelected.filter(
                    (row) =>
                      row.original.status === "ORDER_200" ||
                      row.original.status === "ORDER_400",
                  ).length >= 1
                }
              >
                Mark Success
              </Button>
            }
          />

          <PDFDownloadLink
            document={
              <TableToPrint
                data={data}
                currentDate={format(getCurrentDate(), "MMMM dd, y")}
              />
            }
            fileName={`Orders of ${format(getCurrentDate(), "MMMM dd, y")}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading} className="ml-auto">
                {loading ? "Loading document..." : "Order Report"}
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex h-[36rem] overflow-hidden rounded-md bg-white 2xl:h-[48rem]">
        <CustomTable columns={columns} table={table} flexRender={flexRender} />
      </div>
    </div>
  );
}
OrdersTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};
