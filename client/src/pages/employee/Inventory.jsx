import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

import InventoryTable from "@/components/table/InventoryTable";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/functions";
import ModifyProductStock from "./sheets/ModifyProductStock";
export default function Inventory() {
  const {
    data: fetchData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/products/fetch", []);
  // console.log(fetchData.data);
  const inventoryColumns = [
    {
      accessorKey: "ProductName",
      header: () => <div className="text-center">Product Name</div>,
      cell: ({ row }) => {
        const product_name = row.getValue("ProductName");
        return <div className="text-left">{product_name}</div>;
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

        return <div className="text-left">{product_level}</div>;
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
      accessorKey: "P_AttributeValue",
      header: () => <div className="text-center">Variant </div>,
      cell: ({ row }) => {
        const variant_name = row.getValue("P_AttributeValue");

        return <div className="text-center">{variant_name}</div>;
      },
    },
    {
      accessorKey: "P_AttributeSize",
      header: () => <div className="text-center">Size</div>,
      cell: ({ row }) => {
        const size_name = row.getValue("P_AttributeSize");
        return <div className="text-center">{size_name}</div>;
      },
    },
    {
      accessorKey: "P_AttributePrice",
      header: () => <div className="text-center">Price</div>,
      cell: ({ row }) => {
        const product_price = row.getValue("P_AttributePrice");
        return (
          <span className="text-center font-semibold">
            {formatCurrency(product_price || 0)}
          </span>
        );
      },
    },

    {
      accessorKey: "Product_StockLeft",
      header: () => <div className="text-center">Stock Left</div>,
      cell: ({ row }) => {
        const product_stock = row.getValue("Product_StockLeft");
        return <div className="text-center">{product_stock} {product_stock > 1 ? "pcs" : "pc"}</div>;
      },
    },

    {
      accessorKey: "Product_StockCondition",
      header: () => <div className="text-center">Stock Level </div>,
      cell: ({ row }) => {
        const product_status = row.getValue("Product_StockCondition");
        let badgeColor = "";
        if (product_status === "HIGH") badgeColor = "badge-success";
        else if (product_status === "MEDIUM") badgeColor = "badge-info";
        else if (product_status === "LOW") badgeColor = "badge-warning";
        else badgeColor = "badge-error";
        return (
          <div className="flex justify-center">
            <span
              className={`badge text-nowrap font-semibold tracking-wider text-white ${badgeColor}`}
            >
              {product_status}
            </span>
          </div>
        );
      },
    },
    {
      id: "product-replenishment",
      enableHiding: false,
      cell: ({ row }) => (
        <ModifyProductStock
          trigger={<Button variant="outline">Edit Stock</Button>}
          productDetails={row.original}
        />
      ),
    },
  ];

  return (
    <>
      <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-0.5">
            <div className="flex flex-wrap justify-evenly gap-5 pt-2 text-black">
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
                <InventoryTable
                  data={fetchData.data === undefined ? [] : fetchData.data}
                  columns={inventoryColumns}
                  input_search="ProductName"
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
