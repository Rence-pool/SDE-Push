import { ScrollArea } from "@/components/ui/scroll-area";
import AVATAR from "../assets/avatar.jpg";
import { ShoppingCart } from "lucide-react";
import { Search, Bell } from "lucide-react";
import LOGO from "../assets/White.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/stores/AutProvider";
import { useContext } from "react";
import { navLinks } from "@/lib/navlinks";
export default function UserPageHeader() {
  const {
    userState: { id },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const links = [
    {
      label: "Whats New",
      path: "products/whats-new",
      disable: false,
    },
    {
      label: "Favorites",
      path: "products/favorites",
      disable: id === undefined,
    },
  ];
  return (
    <section className="navbar h-[5rem] gap-2 rounded-2xl">
      <div className="flex gap-2 text-white">
        <Button variant="ghost" className="h-full min-w-[5rem] max-w-[5rem] flex-1 p-2 hover:bg-gray-800" onClick={() => navigate("home")}>
          <img src={LOGO} />
        </Button>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent transition-all duration-200 ease-in-out hover:bg-gray-500 hover:text-white">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ScrollArea className="transition-transform duration-300 ease-in-out">
                  <div className="bg-primary fixed bottom-2 left-2 right-2 top-16 flex flex-wrap content-evenly gap-10 rounded-2xl p-10 outline outline-white transition-all duration-300 ease-in-out">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.label}
                        to={link.path}
                        className={({ isActive }) =>
                          `btn btn-accent flex h-auto min-w-96 flex-1 flex-shrink-0 items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                            isActive ? "bg-blue-500" : ""
                          }`
                        }
                      >
                        <span>{<link.icon />}</span> <div className="flex-1 text-lg">{link.label}</div>
                      </NavLink>
                    ))}
                  </div>
                </ScrollArea>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) =>
              `btn btn-accent hidden h-auto items-center justify-center border-0 bg-transparent text-white transition-all duration-200 hover:scale-105 hover:bg-gray-500 hover:shadow-lg lg:inline-flex ${
                isActive ? "bg-blue-500" : ""
              }`
            }
            disabled={link.disable}
            end
          >
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="hidden flex-1 items-center justify-center text-black lg:flex">
        <label className="input input-bordered flex max-w-[40rem] flex-1 items-center gap-2 rounded-3xl">
          <input type="text" className="grow" placeholder="Search" />
          <Search />
        </label>
      </div>
      <div className="flex-none space-x-5">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <Button variant="ghost" size="icon" className="indicator rounded-2xl">
              <ShoppingCart className="h-5 w-5" />

              <span className="badge indicator-item badge-sm">8</span>
            </Button>
          </div>
          <div tabIndex={0} className="card dropdown-content card-compact bg-base-100 z-[1] mt-3 w-52 text-black shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <Button className="flex-1 text-white" onClick={() => navigate("cart/12")}>
                  View cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" className="hidden hover:scale-105 hover:bg-gray-500 hover:text-white hover:shadow-lg lg:flex">
          <Bell />
          Notification
        </Button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img src={AVATAR} alt="Avatar" />
            </div>
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 text-black shadow">
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
