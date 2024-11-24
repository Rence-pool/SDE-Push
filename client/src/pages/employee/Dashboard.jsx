import DashboardCards from "@/components/DashboardCards";
import CustomBarChart from "@/components/charts/CustomBarChart";

import { Shirt, PhilippinePeso } from "lucide-react";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "@/lib/functions";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { getCurrentDate } from "@/lib/functions";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function Dashboard() {
  const {
    userState: { role },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: salesData,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/api/overall/fetch/dashboard?year=${getCurrentDate().split("-")[0]}`,
    {},
    "Error fetching Sales History",
  );

  let dashBoardCardsData = [
    {
      title: "Total Orders",
      description: `Orders this year `,
      icon: <Shirt />,
      content: "12",
      footer: "Footer",
      location: "/employee/orders",
    },
    {
      title: "Total Sales",
      description: "Sales for this year",
      icon: <PhilippinePeso />,
      content: 0,
      footer: "Footer",
      location: "/employee/sales-history",
    },
    {
      title: "Out of Stock Item",
      description: "out of stock products",
      icon: <Shirt />,
      content: "12",
      footer: "Footer",
      location: "/employee/inventory",
    },
  ];
  if (role === "PAMO") {
    dashBoardCardsData = [
      {
        title: "Total Sales",
        description: "Sales for this year",
        icon: <PhilippinePeso />,
        content: 0,
        footer: "Footer",
        location: "/employee/sales-history",
      },
      {
        title: "Out of Stock Item",
        description: "out of stock products",
        icon: <Shirt />,
        content: "12",
        footer: "Footer",
        location: "/employee/inventory",
      },
    ];
  } else if (role === "PROWARE") {
    dashBoardCardsData = [
      {
        title: "Total Orders",
        description: `Orders this year `,
        icon: <Shirt />,
        content: "12",
        footer: "Footer",
        location: "/employee/orders",
      },
    ];
  }

  if (salesData?.data) {
    dashBoardCardsData.forEach((item) => {
      if (item.title === "Total Orders") {
        item.content = salesData?.data[2]?.TotalOrders;
      } else if (item.title === "Total Sales") {
        item.content = formatCurrency(
          salesData?.data[0]?.TotalSales === undefined
            ? "0.00"
            : salesData?.data[0]?.TotalSales,
        );
      } else if (item.title === "Out of Stock Item") {
        item.content = salesData?.data[1]?.StockOutofStock;
      }
    });
  }
  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-2 p-2 lg:flex-col">
        {loading && <CustomSkeleton times={50} />}
        {error && <div className="flex flex-col">{error.message}</div>}
        {!loading && !error && (
          <>
            <section className="scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900 flex max-h-56 flex-shrink-0 flex-grow flex-col justify-between gap-2 overflow-auto lg:flex-row dark:text-white">
              {dashBoardCardsData.map((item) => (
                <DashboardCards
                  key={item.title}
                  onClick={() => navigate(item.location)}
                  title={
                    <>
                      <p className="stat-title flex-1 dark:text-white">
                        {item.title}
                      </p>
                      {item.icon}
                    </>
                  }
                  description={
                    <span className="stat-desc dark:text-white">
                      {item.description}
                    </span>
                  }
                  content={<span className="stat-value">{item.content}</span>}
                  footer={<span className="stat-desc">{item.footer}</span>}
                />
              ))}
            </section>
            <section className="flex flex-grow flex-col justify-between gap-2 outline lg:flex-row">
              <DashboardCards
                className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
                content={<CustomBarChart data={salesData?.data[4][0]} />}
              />
              <DashboardCards
                className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
                content={<CustomAreaChart data={salesData?.data[3]} />}
              />
            </section>
          </>
        )}
      </section>
    </>
  );
}
