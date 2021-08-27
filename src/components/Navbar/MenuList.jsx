import { IoLogIn, IoPersonCircle } from "react-icons/io5";

export const MenuList = [
  // {
  //   title: "Producten",
  //   url: "/products",
  // },
  // {
  //   title: "Winkelwagen",
  //   url: "/cart",
  // },

  {
    title: "Login",
    url: "/login",
    icon: "sign-in-alt",
  },
];

export const LoggedInUser = [
  {
    title: "Producten",
    url: "/products",
    icon: "boxes",
  },
  {
    title: "Winkelwagen",
    url: "/cart",
    icon: "shopping-cart",
  },

  {
    title: "Bestelgeschiedenis",
    url: "/orderhistory/:id",
    icon: "history",
  },

  {
    title:  "Profiel",
    url: "/profile",
    icon: "user-circle",
  },
];

export const LoggedInManager = [
  {
    title: "Producten",
    url: "/products",
    icon: "boxes",
  },
  {
    title: "Winkelwagen",
    url: "/cart",
    icon: "shopping-cart",
  },

  {
    title: "Bestelgeschiedenis",
    url: "/orderhistory/:id",
    icon: "history",
  },

  {
    title: "Bestelverzoeken",
    url: "/management/orderrequests",
    icon: "inbox",
  },

  {
    title: "Profiel",
    url: "/profile",
    icon: "user-circle",
  },
];

export const LoggedInAdmin = [
  {
    title: "Producten",
    url: "/products",
    icon: "boxes",
  },
  {
    title: "Winkelwagen",
    url: "/cart",
    icon: "shopping-cart",
  },
  {
    title: "Producten wijzigen",
    url: "/management/products",
    icon: "edit",
  },

  {
    title: "Bestelgeschiedenis",
    url: "/orderhistory/:id",
    icon: "history",
  },

  {
    title: "Product Toevoegen",
    url: "/toevoegen",
    icon: "plus-circle",
  },

  {
    title: "Pakket Toevoegen",
    url: "/packtoevoegen",
    icon: "plus-square",
  },

  {
    title: "Bestelverzoeken",
    url: "/management/orderrequests",
    icon: "inbox",
  },

  {
    title: "Excel-export",
    url: "/management/exports",
    icon: "file-download",
  },

  {
    title: "Profiel",
    url: "/profile",
    icon: "user-circle",
  },
];
