import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const productMaintenanceColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "ProductID",
    header: () => <div className="text-center"> ID</div>,
    cell: ({ row }) => {
      const product_id = row.getValue("ProductID");
      return <div className="text-left">{product_id}</div>;
    },
  },
  {
    accessorKey: "ProductName",
    header: () => <div className="text-center"> Name</div>,
    cell: ({ row }) => {
      const product_name = row.getValue("ProductName");
      return <div className="text-left">{product_name}</div>;
    },
  },
  {
    accessorKey: "ProductDescription",
    header: () => <div className="text-center"> Description</div>,
    cell: ({ row }) => {
      const product_description = row.getValue("ProductDescription");
      return <div className="text-left">{product_description}</div>;
    },
  },
  {
    accessorKey: "ProductTypeID",
    header: () => <div className="text-center"> Type</div>,
    cell: ({ row }) => {
      const product_type = row.getValue("ProductTypeID");
      return <div className="text-center">{product_type}</div>;
    },
  },
  {
    accessorKey: "ProgramLevel",
    header: () => <div className="text-center">Level</div>,
    cell: ({ row }) => {
      const product_level = row.getValue("ProgramLevel");
      return <div className="text-center">{product_level}</div>;
    },
  },
  {
    accessorKey: "ProductProgram",
    header: () => <div className="text-center"> Program</div>,
    cell: ({ row }) => {
      const product_program = row.getValue("ProductProgram");

      return <div className="text-center">{product_program}</div>;
    },
  },
  {
    accessorKey: "ProductDefaultPrice",
    header: () => <div className="text-center">Starting Price</div>,
    cell: ({ row }) => {
      const product_starting_price = row.getValue("ProductDefaultPrice");

      return <div className="text-center">{product_starting_price}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const productID = row.getValue("ProductID");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to={`/admin/maintenance/modify-product/${productID}`}>Modify Product</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
