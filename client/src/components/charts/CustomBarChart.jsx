import { ConstructionIcon, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PropTypes from "prop-types";
import DashboardCards from "../DashboardCards";

const chartData = [
  { month: "January", desktop: 120, mobile: 123 },
  { month: "February", desktop: 255, mobile: 2 },
  { month: "March", desktop: 26, mobile: 123 },
  { month: "April", desktop: 76, mobile: 522 },
  { month: "May", desktop: 234, mobile: 123 },
  { month: "June", desktop: 68, mobile: 232 },
  { month: "July", desktop: 23, mobile: 21 },
  { month: "August", desktop: 123, mobile: 123 },
  { month: "September", desktop: 22, mobile: 323 },
  { month: "October", desktop: 12, mobile: 23 },
  { month: "November", desktop: 77, mobile: 23 },
  { month: "December", desktop: 222, mobile: 77 },
];

const chartConfig = {
  top1: {
    label: "top1",
    color: "#2563eb",
  },
  top2: {
    label: "top2",
    color: "#60a5fa",
  },
};

export default function CustomBarChart({ data }) {
  console.log(data);
  const chartData = [];

  // Group by month and find top 1 and top 2 products
  const groupedData = data.reduce((acc, item) => {
    const month = item.month.split(" ")[0]; // Extract month name (e.g., 'January')

    // Initialize an array for each month if it doesn't exist
    if (!acc[month]) {
      acc[month] = [];
    }

    // Push each entry into its corresponding month group
    acc[month].push(item);
    return acc;
  }, {});

  for (const month in groupedData) {
    const monthData = groupedData[month];

    // Get top 1 and top 2 ranks (Rank 1 is the first item, Rank 2 the second)
    const top1 = monthData.find((item) => item.position === "Rank 1");
    const top2 = monthData.find((item) => item.position === "Rank 2");

    chartData.push({
      month: month,
      top1: top1 ? top1.total_quantity : null,
      top2: top2 ? top2.total_quantity : null,
    });
  }
  console.log(chartData);

  return (
    <>
      <DashboardCards
        onClick={() => {}}
        title={<p className="stat-title flex-1 font-bold text-black">Most Purchased Products</p>}
        description={<span className="stat-desc">Description</span>}
        content={
          <span className="stat-value">
            {
              <ChartContainer className="h-[10rem] w-full" config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="top1" fill="var(--color-top1)" radius={4} />
                  <Bar dataKey="top2" fill="var(--color-top2)" radius={4} />
                </BarChart>
              </ChartContainer>
            }
          </span>
        }
        footer={
          <span className="stat-desc">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
          </span>
        }
      />
    </>
  );
}
CustomBarChart.propTypes = {
  date: PropTypes.object,
};
