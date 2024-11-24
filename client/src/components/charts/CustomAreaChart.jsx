import { ConstructionIcon, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import format from "date-fns/format";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PropTypes from "prop-types";
import DashboardCards from "../DashboardCards";
import { months } from "@/lib/date";
const chartConfig = {
  sales: {
    label: "Sales",
    color: "#FFD133",
  },
};

export default function CustomAreaChart({ data }) {
  const chartData = data.map((item) => {
    return {
      month: months[item.month - 1],
      sales: item.total_sales,
    };
  });

  return (
    <>
      <DashboardCards
        onClick={() => {}}
        title={<p className="stat-title flex-1 font-bold text-black">Sales</p>}
        description={<span>Sales for this year</span>}
        content={
          <span className="stat-value text-black">
            {
              <ChartContainer
                config={chartConfig}
                className="max-h-[200px] w-full"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="sales"
                    type="linear"
                    fill="#Ffff00"
                    fillOpacity={0.4}
                    stroke="#Ffff00"
                  />
                </AreaChart>
              </ChartContainer>
            }
          </span>
        }
        footer={
          <span className="stat-desc">
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </span>
        }
      />
    </>
  );
}
CustomAreaChart.propTypes = {
  data: PropTypes.array,
};
