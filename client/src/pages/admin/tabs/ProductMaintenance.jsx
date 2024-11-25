import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import MaintenanceProductTable from "@/components/table/MaintenanceProductTable";
export default function ProductMaintenance() {
  const navigate = useNavigate();
  const {
    data: fetchData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/products/fetch/display", []);
  console.log(fetchData);
  const inventoryColumns = [
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
              <DropdownMenuItem
                onClick={() => navigate(`/admin/maintenance/modify-product/${productID}`)}
              >
                Modify Product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-0.5 text-black">
            {loading && (
              <>
                <CustomSkeleton times={20} />
              </>
            )}
            {error && (
              <div className="flex-1 text-center text-5xl font-semibold uppercase tracking-wider text-white">
                {error.message}
              </div>
            )}
            {!loading && !error && (
              <>
                <div className="space-x-5">
                  <Button
                    onClick={() => navigate("/admin/maintenance/add-product")}
                    variant="secondary"
                  >
                    Add Product
                  </Button>
                  <Button
                    // onClick={() => navigate("/admin/maintenance/add-inventory")}
                    variant="secondary"
                  >
                    Disable Product
                  </Button>
                </div>
                <MaintenanceProductTable
                  data={fetchData.data === undefined ? [] : fetchData.data}
                  columns={inventoryColumns}
                  input_search="ProductName"
                />
              </>
            )}
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
