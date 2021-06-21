const login = localStorage.getItem("login");

let callbackMenuItems = [];

export const MenuList = [
  {
    title: "Producten",
    url: "/products",
  },
  {
    title: "Winkelwagen",
    url: "/cart",
  },

  {
    title: "Login",
    url: "/login",
  },
];

export const LoggedInMenu = [
  {
    title: "Producten",
    url: "/products",
  },
  {
    title: "Winkelwagen",
    url: "/cart",
  },

  {
    title: "Profiel",
    url: "/profile",
  },
];

export const onMenuChange = (func) => {
  console.log("Dut ia wwn");
  callbackMenuItems.push(func);
};

function callCallbacks() {
  // hier voeg je items toe in de array
  for (let i = 0; i < callbackMenuItems.length; i++) {
    callbackMenuItems[i](LoggedInMenu);
  }
}

// setTimeout(
//   () => {console.log("NAv timeout ")}, 2000
// );
setTimeout(
  // als je bent ingelooged moet je deze functie aanroepen
  () => {
    callCallbacks();
  },
  2000
);
