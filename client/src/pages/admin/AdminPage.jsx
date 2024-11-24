import { Outlet } from "react-router-dom";
import { Logs } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import { Dialog } from "@radix-ui/react-dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSideBar from "@/components/sidebar/CustomSideBar";
import { Activity, Hammer } from "lucide-react";

export default function AdminPage() {
  const sidebarContent = [
    { name: "Maintenance", path: "maintenance", icon: <Hammer /> },
    { name: "Activity History", path: "activity-history", icon: <Activity /> },
  ];
  return (
    <SidebarProvider>
      <Dialog>
        <main className="flex min-h-screen w-full overflow-auto">
          <CustomSideBar sidebarContent={sidebarContent} />
          <section className="flex h-screen w-full flex-1 flex-col">
            <NavigationHeader
              userRole={"Administrator"}
              triggerButton={
                <SidebarTrigger
                  className="btn btn-ghost bg-accent text-primary duration-300"
                  icon={<Logs />}
                />
              }
            />
            <main className="flex h-screen w-full overflow-auto bg-primary scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-900">
              <Outlet />
            </main>
          </section>
        </main>
      </Dialog>
    </SidebarProvider>
  );
}
