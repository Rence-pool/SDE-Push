import { Outlet } from "react-router-dom";

import NavigationHeader from "@/components/NavigationHeader";
import { Dialog } from "@radix-ui/react-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSideBar from "@/components/AdminSideBar";
import { SideBarContent } from "@/lib/side_bar_content";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function AdminPage() {
  const {
    userState: { role },
  } = useContext(AuthContext);
  return (
    <SidebarProvider>
      <Dialog>
        <main className="flex min-h-screen w-full overflow-auto">
          <AdminSideBar sidebarContent={SideBarContent(role)} userRole="Administrator" />
          <section className="flex h-screen w-full flex-1 flex-col">
            <NavigationHeader userRole={"Administrator"} />
            <main className="bg-primary scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-900 flex h-screen w-full overflow-auto">
              <Outlet />
            </main>
          </section>
        </main>
      </Dialog>
    </SidebarProvider>
  );
}
