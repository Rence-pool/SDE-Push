import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
export const user_account_maintenance_columns = [
  {
    accessorKey: "UserID",
    header: () => <div className="text-center">User ID</div>,
    cell: ({ row }) => {
      const user_id = row.getValue("UserID");
      return <div className="text-center">{user_id}</div>;
    },
  },
  {
    accessorKey: "UserFName",
    header: () => <div className="text-center">First Name</div>,
    cell: ({ row }) => {
      const user_fname = row.getValue("UserFName");
      return <div className="text-left">{user_fname}</div>;
    },
  },
  {
    accessorKey: "UserLName",
    header: () => <div className="text-center">Last Name</div>,
    cell: ({ row }) => {
      const user_lname = row.getValue("UserLName");
      return <div className="text-left">{user_lname}</div>;
    },
  },
  {
    accessorKey: "UserEmail",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => {
      const user_email = row.getValue("UserEmail");
      return <div className="text-left">{user_email}</div>;
    },
  },

  {
    accessorKey: "UserRole",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const user_role = row.getValue("UserRole");
      return <div className="text-center">{user_role}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userID = row.getValue("UserID");

      return (
        <DropdownMenu className="bg-green-500 outline">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="outline">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Modify User</DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
