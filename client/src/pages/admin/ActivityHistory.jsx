import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityHistoryTable from "@/components/table/ActivityHistoryTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useContext } from "react";
import { AuthContext } from "../../stores/AutProvider";
import { ActivityColumns, tabsContent, tabsTriggers } from "@/lib/columns/activity_history";
export default function ActivityHistory() {
  const {
    userState: { role },
  } = useContext(AuthContext);
  const {
    data: ActivityHistoryData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/activity/fetch", [], "Error fetching Activity History");

  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1">
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
                  data={ActivityHistoryData.data.filter((activity) => activity.ActivityType === tab.activityType)}
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
