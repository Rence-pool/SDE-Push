import { Button } from "@/components/ui/button";
import ModifyProductStock from "@/pages/employee/sheets/ModifyProductStock";
import { formatCurrency } from "@/lib/functions";
export const inventoryColumns = (setTriggerRefresh) => {
  return [
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
        return <span className="text-center font-semibold">{formatCurrency(product_price || 0)}</span>;
      },
    },

    {
      accessorKey: "Product_StockLeft",
      header: () => <div className="text-center">Stock Left</div>,
      cell: ({ row }) => {
        const product_stock = row.getValue("Product_StockLeft");
        return (
          <div className="text-center">
            {product_stock} {product_stock > 1 ? "pcs" : "pc"}
          </div>
        );
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
            <span className={`badge text-nowrap font-semibold tracking-wider text-white ${badgeColor}`}>{product_status}</span>
          </div>
        );
      },
    },
    {
      id: "product-replenishment",
      enableHiding: false,
      cell: ({ row }) => (
        <ModifyProductStock
          refresher={setTriggerRefresh}
          trigger={<Button variant="outline">Edit Stock</Button>}
          productDetails={row.original}
        />
      ),
    },
  ];
};
