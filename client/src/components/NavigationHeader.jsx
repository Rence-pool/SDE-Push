import PropTypes from "prop-types";
import { SidebarTrigger } from "./ui/sidebar";
import { Logs } from "lucide-react";
export default function NavigationHeader({ userRole }) {
  return (
    <div className="flex w-full">
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <SidebarTrigger className="btn btn-ghost bg-accent text-primary duration-300" icon={<Logs />} />
        </div>
        <div className="lg:navbar-center hidden lg:block">
          <span className="text-accent font-bold uppercase md:text-lg lg:text-2xl">STI Merchandise {userRole}</span>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
}
NavigationHeader.propTypes = {
  userRole: PropTypes.string,
};
