import UserPageHeader from "@/components/UserPageHeader";
import { Outlet } from "react-router-dom";
export default function UserPage() {
  return (
    <main className="flex h-screen flex-1 flex-col gap-3 bg-gradient-to-b from-[#122A42] to-[#1B408C] text-white lg:flex-col">
      <UserPageHeader />
      <div className="scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-900 flex flex-1">
        <Outlet />
      </div>
    </main>
  );
}
