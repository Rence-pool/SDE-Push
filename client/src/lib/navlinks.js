import {
  ShoppingCart,
  Bed,
  Shirt,
  Computer,
  Plane,
  Calculator,
  Volleyball,
  ShoppingBasketIcon,
  Speech,
  Baby,
  LucideDrumstick,
} from "lucide-react";

export const navLinks = [
  {
    label: "All Products Available",
    icon: ShoppingCart ,
    path: "products/all",
  },
  {
    label: "Hospitality Management",
    icon: Bed,
    path: "products/bshm",
  },
  {
    label: "T-Shirts (Washday,NSTP,Anniversary Shirts)",
    icon: Shirt ,
    path: "products/tshirts",
  },
  {
    label:
      "Information Technology, Computer Science, Computer Engineering(BSIT,BSCS,BScPE)",
    icon: Computer ,
    path: "products/ict",
  },
  {
    label: "Tourism Management",
    icon: Plane,
    path: "products/bstm",
  },
  {
    label: "Uniform And Pants",
    icon: Shirt,
    path: "products/unif_pants",
  },
  {
    label: "Business Administration",
    icon: Calculator ,
    path: "products/bsba",
  },
  {
    label: "Physical Education",
    icon: Volleyball ,
    path: "products/pe",
  },
  {
    label: "Miscellaneous",
    icon: ShoppingBasketIcon ,
    path: "products/miscellaneous",
  },
  {
    label: "Arts in Communication",
    icon: Speech ,
    path: "products/bacomm",
  },
  {
    label: "Senior High School",
    icon: Baby ,
    path: "products/sh",
  },
  {
    label: "Limited Edition Item",
    icon: LucideDrumstick ,
    path: "products/anniv",
  },
];
