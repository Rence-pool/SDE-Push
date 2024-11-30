import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import MYAVATAR from "../assets/avatar.jpg";

export default function CustomSidebar({ sidebarContent, userID }) {
  const navigate = useNavigate();
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r" collapsible="icon">
      <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
      <DialogDescription className="sr-only">{"asdasds"}</DialogDescription>
      <SidebarContent className="light:bg-neutral flex h-screen py-4 dark:bg-black">
        <SidebarHeader className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="hover:text-accent-foreground hover:bg-accent h-auto w-full p-2">
                    <div className="m-0 flex w-full items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={MYAVATAR} alt="User avatar" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-medium">{userID}</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-56">
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate("/login", { replace: true })}>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup className="flex flex-1 flex-col">
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent className={`flex flex-1 flex-col gap-3`}>
            {sidebarContent.map((item) => (
              <SidebarMenuItem key={item.name} className="list-none">
                <NavLink
                  title={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-5 rounded-xl py-2 text-sm ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-100"} ${!open ? "justify-center" : "pl-5"}`
                  }
                >
                  {<item.icon />}
                  {open && <span>{item.name}</span>}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
CustomSidebar.propTypes = {
  sidebarContent: PropTypes.array,
  userID: PropTypes.string,
};
