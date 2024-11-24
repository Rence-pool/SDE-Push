import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import DashboardCards from "../DashboardCards";
import PropTypes from "prop-types";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import format from "date-fns/format";
export const description = "A donut chart with text";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#FF5733" },
  { browser: "safari", visitors: 200, fill: "#33FF57" },
  { browser: "firefox", visitors: 287, fill: "#3357FF" },
  { browser: "edge", visitors: 173, fill: "#FF33A1" },
  { browser: "other", visitors: 190, fill: "#FFD133" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#FF5733",
  },
  safari: {
    label: "Safari",
    color: "#33FF57",
  },
  firefox: {
    label: "Firefox",
    color: "#253357FF63eb",
  },
  edge: {
    label: "Edge",
    color: "FF33A1",
  },
  other: {
    label: "Other",
    color: "FFD133",
  },
};

export default function CustomPieChart({ date }) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <>
      <DashboardCards
        onClick={() => {}}
        title={
          <p className="stat-title flex-1 font-bold text-black">
            Pie Chart - Donut with Text
          </p>
        }
        description={
          <span className="stat-desc">
            {" "}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </span>
        }
        content={
          <span className="stat-value">
            {
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[200px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            }
          </span>
        }
        footer={
          <span className="stat-desc">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </span>
        }
      />
    </>
  );
}
CustomPieChart.propTypes = {
  date: PropTypes.object,
};
