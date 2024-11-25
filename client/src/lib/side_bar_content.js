import { House, ChartPie, Shirt, BadgeDollarSign, Activity } from "lucide-react";
import { Hammer } from "lucide-react";
export function SideBarContent(role) {
  let sidebarContent = [
    { name: "Dashboard", path: "dashboard", icon: House },
    { name: "Orders", path: "orders", icon: ChartPie },
    { name: "Inventory", path: "inventory", icon: Shirt },
    { name: "Sales History", path: "sales-history", icon: BadgeDollarSign },
    { name: "Activity History", path: "activity-history", icon: Activity },
  ];
  if (role === "PAMO") {
    sidebarContent = [
      { name: "Dashboard", path: "dashboard", icon: House },
      { name: "Sales History", path: "sales-history", icon: BadgeDollarSign },
      { name: "Inventory", path: "inventory", icon: Shirt },
    ];
  } else if (role === "PROWARE") {
    sidebarContent = [
      { name: "Dashboard", path: "dashboard", icon: House },
      { name: "Orders", path: "orders", icon: ChartPie },
      { name: "Activity History", path: "activity-history", icon: Activity },
    ];
  } else if (role === "ADMN") {
    sidebarContent = [
      { name: "Maintenance", path: "maintenance", icon: Hammer },
      { name: "Activity History", path: "activity-history", icon: Activity },
    ];
  }
  return sidebarContent;
}
