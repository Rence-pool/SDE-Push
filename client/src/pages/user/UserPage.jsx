import { ScrollArea } from "@/components/ui/scroll-area";
import AVATAR from "../../assets/avatar.jpg";
import {
  Baby,
  Bed,
  Calculator,
  Computer,
  LucideDrumstick,
  Plane,
  Shirt,
  ShoppingBasketIcon,
  ShoppingCart,
  Speech,
  Volleyball,
} from "lucide-react";
import { Search, Bell } from "lucide-react";
import { Outlet } from "react-router-dom";
import LOGO from "../../assets/White.png";
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

function UserPage() {
  const navigate = useNavigate();
  const navLinks = [
    {
      label: "All Products Available",
      icon: <ShoppingCart />,
      path: "/product-categories",
    },
    {
      label: "Hospitality Management",
      icon: <Bed />,
      path: "/product-categories",
    },
    {
      label: "T-Shirts (Washday,NSTP,Anniversary Shirts)",
      icon: <Shirt />,
      path: "/product-categories",
    },
    {
      label:
        "Information Technology, Computer Science, Computer Engineering(BSIT,BSCS,BScPE)",
      icon: <Computer />,
      path: "/product-categories",
    },
    {
      label: "Tourism Management",
      icon: <Plane />,
      path: "/product-categories",
    },
    {
      label: "Uniform And Pants",
      icon: <Shirt />,
      path: "/product-categories",
    },
    {
      label: "Business Administration",
      icon: <Calculator />,
      path: "/product-categories",
    },
    {
      label: "Physical Education",
      icon: <Volleyball />,
      path: "/product-categories",
    },
    {
      label: "Misscellenous",
      icon: <ShoppingBasketIcon />,
      path: "/product-categories",
    },
    {
      label: "Arts in Communication",
      icon: <Speech />,
      path: "/product-categories",
    },
    {
      label: "Senior High School",
      icon: <Baby />,
      path: "/product-categories",
    },
    {
      label: "Limited Edition Item",
      icon: <LucideDrumstick />,
      path: "/product-categories",
    },
  ];

  return (
    <main className="flex h-screen flex-1 flex-col gap-3 overflow-hidden bg-gradient-to-b from-[#122A42] to-[#1B408C] p-2 text-accent lg:flex-col">
      <section className="navbar h-[5rem] gap-2 rounded-2xl">
        <div className="flex gap-2 text-white">
          <Button
            variant="ghost"
            className="h-full max-w-[5rem] flex-1 p-2 hover:bg-gray-800"
            onClick={() => navigate("/home")}
          >
            <img src={LOGO} />
          </Button>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent transition-all duration-200 ease-in-out hover:bg-opacity-90">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ScrollArea className="transition-transform duration-300 ease-in-out">
                    <div className="fixed bottom-2 left-2 right-2 top-16 flex flex-wrap content-evenly gap-10 rounded-2xl bg-primary p-10 outline outline-white transition-all duration-300 ease-in-out">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.label}
                          to={link.path}
                          className="btn btn-accent flex h-auto min-w-96 flex-1 flex-shrink-0 items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                          <span>{link.icon}</span>{" "}
                          <div className="flex-1 text-lg">{link.label}</div>
                        </NavLink>
                      ))}
                    </div>
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" onClick={() => navigate("/whats-new")}>
            Whats New
          </Button>
          <Button variant="ghost" onClick={() => navigate("/favorites")}>
            Favorites
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center text-black">
          <label className="input input-bordered flex max-w-[40rem] flex-1 items-center gap-2 rounded-3xl">
            <input type="text" className="grow" placeholder="Search" />
            <Search />
          </label>
        </div>
        <div className="flex-none space-x-5">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <div className="indicator">
                <ShoppingCart className="h-5 w-5" />

                <span className="badge indicator-item badge-sm">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 text-black shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <Button
                    className="flex-1 text-white"
                    onClick={() => navigate("/cart/12")}
                  >
                    View cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost">
            <Bell />
            Notification
          </Button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img src={AVATAR} alt="Avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-black shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex flex-1">
        <Outlet />
      </div>
      {/* </ScrollArea> */}
    </main>
  );
}

export default UserPage;
