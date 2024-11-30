import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityHistoryTable from "@/components/table/ActivityHistoryTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useContext } from "react";
import { AuthContext } from "../../stores/AutProvider";
import { ActivityColumns, tabsContent, tabsTriggers } from "@/lib/columns/activity_history";
import { useState } from "react";

import DateRangePicker from "@/components/DateRangePicker";
export default function ActivityHistory() {
  const {
    userState: { role },
  } = useContext(AuthContext);
  const {
    data: ActivityHistoryData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/activity/fetch", [], "Error fetching Activity History");

  const [date, setDate] = useState(undefined);

  console.log(ActivityHistoryData);
  const filterData =
    ActivityHistoryData.length === 0
      ? []
      : ActivityHistoryData.data.filter((activity) => {
          if (date === undefined) return activity;
          const activityDate = new Date(activity.ActivityDateTime);
          const fromDate = new Date(date?.from);
          const toDate = new Date(date?.to);
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          return activityDate >= fromDate && activityDate <= toDate;
        });

  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col">
        <div className="m-1 flex justify-end">
          <DateRangePicker date={date} setDate={setDate} />
        </div>
        {loading && <CustomSkeleton times={100} />}
        {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}
        {!loading && !error && (
          <Tabs defaultValue="sales-activity" className="flex-1">
            <TabsList className="flex w-full">
              {tabsTriggers(role).map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsContent.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <ActivityHistoryTable
                  activityType={tab.activityType}
                  date={date}
                  data={filterData.filter((activity) => activity.ActivityType === tab.activityType)}
                  columns={ActivityColumns}
                  input_search="ActivityDateTime"
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
}
