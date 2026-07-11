import type { AccessoryZone, Category } from "../types/workspace";

export const baliLocations = [
  "Canggu, Bali",
  "Seminyak, Bali",
  "Ubud, Bali",
  "Denpasar, Bali",
  "Kuta, Bali",
  "Sanur, Bali",
  "Uluwatu, Bali"
];

export const fallbackToday = "2026-07-11";

export const accessoryZones: Array<{ id: AccessoryZone; label: string; accepts: Category[] }> = [
  { id: "monitor-left", label: "Left screen", accepts: ["monitor"] },
  { id: "monitor-main", label: "Main screen", accepts: ["monitor"] },
  { id: "monitor-right", label: "Right screen", accepts: ["monitor"] },
  { id: "decor-left", label: "Decor left", accepts: ["lamp", "plant"] },
  { id: "decor-right", label: "Decor right", accepts: ["lamp", "plant"] },
  { id: "tech", label: "Desk tech", accepts: ["tech"] },
  { id: "comfort", label: "Comfort add-on", accepts: ["comfort"] }
];
