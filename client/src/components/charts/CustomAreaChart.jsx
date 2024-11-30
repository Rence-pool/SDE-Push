import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
              <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                  <YAxis type="number" domain={["dataMin", "dataMax"]} tickCount={10} tickFormatter={(value) => value.toLocaleString()} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area dataKey="sales" type="linear" fill="#Ffff00" fillOpacity={0.4} stroke="#Ffff00" />
                </AreaChart>
              </ChartContainer>
            }
          </span>
        }
      />
    </>
  );
}
CustomAreaChart.propTypes = {
  data: PropTypes.array,
};
