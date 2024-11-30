import { Shirt, PhilippinePeso } from "lucide-react";
import { formatCurrency } from "./functions";
export const dashboardCards = (salesData) => {
  let dashBoardCardsData = [
    {
      title: "Total Orders",
      description: `Orders this year `,
      icon: Shirt,
      content: "12",
      footer: "Footer",
      location: "/employee/orders",
    },
    {
      title: "Total Sales",
      description: "Sales for this year",
      icon: PhilippinePeso,
      content: 0,
      footer: "Footer",
      location: "/employee/sales-history",
    },
    {
      title: "Out of Stock Item",
      description: "out of stock products",
      icon: Shirt,
      content: "12",
      footer: "Footer",
      location: "/employee/inventory",
    },
  ];

  if (salesData?.data) {
    dashBoardCardsData.forEach((item) => {
      if (item.title === "Total Orders") {
        item.content = salesData?.data[2]?.TotalOrders;
      } else if (item.title === "Total Sales") {
        item.content = formatCurrency(salesData?.data[0]?.TotalSales === undefined ? "0.00" : salesData?.data[0]?.TotalSales);
      } else if (item.title === "Out of Stock Item") {
        item.content = `${salesData?.data[1]?.StockOutofStock}`;
      }
    });
  }
  return dashBoardCardsData;
};
