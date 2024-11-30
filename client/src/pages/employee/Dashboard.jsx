import DashboardCards from "@/components/DashboardCards";
import CustomBarChart from "@/components/charts/CustomBarChart";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { getCurrentDate } from "@/lib/functions";
import { dashboardCards } from "@/lib/dashboard_cards";
export default function Dashboard() {
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
  const cards = dashboardCards(salesData);
  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-2 p-2 lg:flex-col">
        {loading && <CustomSkeleton times={50} />}
        {error && <div className="flex flex-col">{error.message}</div>}
        {!loading && !error && (
          <>
            <section className="scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900 flex max-h-56 flex-shrink-0 flex-grow flex-col justify-between gap-2 overflow-auto lg:flex-row dark:text-white">
              {cards.map((item) => (
                <DashboardCards
                  key={item.title}
                  onClick={() => {
                    if (item.location === "/employee/inventory") {
                      navigate(item.location, { state: { stockCondition: "OUT OF STOCK" } });
                      return;
                    }
                    navigate(item.location);
                  }}
                  title={
                    <>
                      <p className="stat-title flex-1 dark:text-white">{item.title}</p>
                      {<item.icon />}
                    </>
                  }
                  description={<span className="stat-desc dark:text-white">{item.description}</span>}
                  content={<span className="stat-value">{item.content}</span>}
                  footer={<span className="stat-desc">{item.footer}</span>}
                />
              ))}
            </section>
            <section className="flex flex-grow flex-col justify-between gap-2 lg:flex-row">
              <CustomBarChart data={salesData?.data[4][0]} />
              <CustomAreaChart data={salesData?.data[3]} />
            </section>
          </>
        )}
      </section>
    </>
  );
}
