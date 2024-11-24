import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";

export default function SalesHistoryTable({
  data,
  columns,
  input_search = "or_no",
}) {
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
            onChange={(event) =>
              table.getColumn(input_search)?.setFilterValue(event.target.value)
            }
            className="flex-1"
          />

          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => {
              const printWindow = window.open("");
              printWindow.document.write(`
                  <html>
                    <head>
                      <title>Print Table</title>
                      <style>
                       @media print {
                          @page {
                           size: landscape;  /* or 'portrait' for portrait orientation */
                           margin: 15mm;    /* Add margins as needed */
                        }
                      }
                        table {
                          border-collapse: collapse;
                          width: 100%;
                        }
                        th, td {
                          border: 1px solid black;
                          padding: 8px;
                          text-align: left;
                        }
                        th {
                          background-color: #f2f2f2;
                        }
                      </style>
                    </head>
                    <body>
                      <table>
                        <thead>
                          <tr>
                            <th>Order Date</th>
                            <th>Order Number</th>
                            <th>Sales</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${data
                            .map(
                              (row) => `
                            <tr>
                              <td>${row.or_date}</td>
                              <td>${row.or_no}</td>
                              <td>${row.sales}</td>
                              <td>${row.total}</td>
                            </tr>
                          `,
                            )
                            .join("")}
                        </tbody>
                      </table>
                    </body>
                  </html>
                `);
              printWindow.document.close();
              printWindow.print();
            }}
          >
            Report
          </Button>
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
      <div className="flex h-[28rem] overflow-hidden rounded-md bg-white">
        <CustomTable
          columns={columns}
          table={table}
          flexRender={flexRender}
          filter
        />
      </div>
    </div>
  );
}
SalesHistoryTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};
