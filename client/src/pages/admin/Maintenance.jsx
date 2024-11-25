import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { maintenanceTabs } from "@/lib/maintenance_tabs";
export default function Maintenance() {
  const tabs = maintenanceTabs;

  return (
    <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <Tabs defaultValue="account" className="flex flex-1 flex-col">
          <TabsList className="flex w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                key={tab.value}
                value={tab.value}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent className="flex-1" key={tab.value} value={tab.value}>
              {<tab.content />}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
