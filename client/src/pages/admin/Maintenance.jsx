import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductMaintenance from "./tabs/ProductMaintenance";
import AccountMaintenance from "./tabs/AccountMaintenance";

export default function Maintenance() {
  const tabs = [
    { name: "Accounts", value: "account", content: <AccountMaintenance /> },
    { name: "Products", value: "products", content: <ProductMaintenance /> },
  ];

  return (
    <section className="flex flex-1 flex-col gap-3 p-2 text-accent lg:flex-col">
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
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
