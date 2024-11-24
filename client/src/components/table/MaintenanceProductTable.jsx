import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";
import CustomSelect from "../customs/CustomSelect";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useFetch } from "@/hooks/useFetch";
export default function MaintenanceProductTable({
  data,
  columns,
  input_search,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const {
    data: product_info,
    loading: product_info_loading,
    error: product_info_error,
  } = useFetch(
    "http://localhost:3000/api/products/fetch/product-info",
    [],
    "Error fetching Products",
  );

  let productTypes = [{ label: "All", value: "all" }];
  let productProgram = [];
  if (product_info?.data?.length > 0) {
    productTypes = product_info.data[0]?.map((type) => ({
      label: type.ProductTypename,
      value: type.ProductTypeID,
    }));
    productTypes.unshift({ label: "Product Types", value: "all" });
    productProgram = product_info.data[1]?.map((type) => ({
      label: type.ProgramName,
      value: type.ProgramID,
    }));
    productProgram.unshift({ label: "Programs", value: "all" });
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  console.log("columnFilters", columnFilters);
  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Product Name"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) => {
              console.log(event.target.value);
              table.getColumn(input_search)?.setFilterValue(event.target.value);
            }}
            className="flex-1"
          />
          <div className="min-w-44">
            <CustomSelect
              label="Product Types"
              options={productTypes}
              onItemSelected={(value) => {
                table
                  .getColumn("ProductTypeID")
                  ?.setFilterValue(value === "all" ? "" : value);
              }}
            />
          </div>
          <div className="min-w-32">
            <CustomSelect
              label="Programs"
              options={productProgram}
              onItemSelected={(value) => {
                if (value === "TR" || value === "SH") {
                  table.getColumn("ProductProgram")?.setFilterValue("");
                  table.getColumn("ProgramLevel")?.setFilterValue(value);
                  return;
                }
                table.getColumn("ProgramLevel")?.setFilterValue("");
                table
                  .getColumn("ProductProgram")
                  ?.setFilterValue(value === "all" ? "" : value);
              }}
            />
          </div>
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
      <div className="flex h-[30rem] overflow-hidden rounded-md bg-white text-black">
        {product_info_loading && <CustomSkeleton times={20} />}
        {product_info_error && (
          <div className="m-auto text-2xl text-white">
            Error: {product_info_error.message}
          </div>
        )}
        {!product_info_loading && !product_info_error && (
          <CustomTable
            columns={columns}
            table={table}
            flexRender={flexRender}
          />
        )}
      </div>
    </div>
  );
}
MaintenanceProductTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};
