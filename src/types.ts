export type ShopItem = {
  id: string;
  name: string;
  category: "basic" | "consumable" | "weapon" | "armor" | "misc";
  subcategory?: string;
  price?: number; // undefined means locked
  locked: boolean; // if true, show ???G
  source: "phb" | "homebrew";
  gamble?: boolean;
  desc?: string; // optional; you can fill on demand in Drawer
};
