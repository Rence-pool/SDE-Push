import PropTypes from "prop-types";
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
import CustomSelect from "@/components/customs/CustomSelect";
import CustomTable from "./CustomTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

function UsersTable({ data, columns, input_search = "UserID" }) {
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
    data: fetchData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/users/fetch/user-roles", []);

  let roleOptions = [];
  if (fetchData?.data?.length > 0) {
    roleOptions = fetchData?.data[1]?.map((role) => ({
      value: role.UserRoleID,
      label: role.UserRoleName,
    }));
  }

  return (
    <div className="flex flex-1 flex-col">
      {!loading && !error && (
        <>
          <div className="m-4 flex items-center gap-5">
            <div className="flex flex-1 gap-5">
              <Input
                placeholder="Search User"
                value={table.getColumn(input_search)?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table
                    .getColumn(input_search)
                    ?.setFilterValue(event.target.value)
                }
                className="flex-1"
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="User Roles"
                options={roleOptions}
                onItemSelected={(value) => {
                  table
                    .getColumn("UserRole")
                    ?.setFilterValue(value === "all" ? "" : value);
                }}
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
          <div className="flex h-[30rem] overflow-hidden rounded-md bg-white">
            <CustomTable
              columns={columns}
              table={table}
              flexRender={flexRender}
              filter
            />
          </div>
        </>
      )}
      {loading && <CustomSkeleton times={20} />}
      {error && (
        <div className="m-auto text-2xl text-white">Error: {error.message}</div>
      )}
    </div>
  );
}

UsersTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};

export default UsersTable;
