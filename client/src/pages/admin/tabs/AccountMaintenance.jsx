import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import UsersTable from "@/components/table/UsersTable";

import AddUserSheet from "../sheets/AddUserSheet";
import ModifyUserRoles from "../sheets/ModifyUserRoles";
import { user_account_maintenance_columns } from "@/lib/columns/account_maintenance";
export default function AccountMaintenance() {
  const { data: fetchData, loading, error } = useFetch("http://localhost:3000/api/users/fetch", []);

  return (
    <section className="text-accent flex flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <ScrollArea className="flex-1 pr-0.5 text-black">
          {loading && <CustomSkeleton times={20} />}
          {error && <div className="m-auto text-2xl text-white">Error: {error.message}</div>}
          {!loading && !error && (
            <>
              <div className="space-x-5">
                <AddUserSheet trigger={<Button variant="secondary">Add User</Button>} />
                <ModifyUserRoles trigger={<Button variant="secondary">Modify User Roles</Button>} />
              </div>
              <UsersTable data={fetchData.data} columns={user_account_maintenance_columns} input_search="UserFName" />
            </>
          )}
        </ScrollArea>
      </div>
    </section>
  );
}
