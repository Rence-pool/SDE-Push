import AccountMaintenance from "../pages/admin/tabs/AccountMaintenance";
import ProductMaintenance from "../pages/admin/tabs/ProductMaintenance";
export const maintenanceTabs = [
  {
    value: "account",
    name: "Account",
    content: AccountMaintenance,
  },
  {
    value: "product",
    name: "Product",
    content: ProductMaintenance,
  },
];
