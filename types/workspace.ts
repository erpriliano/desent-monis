export type Cycle = "weekly" | "monthly";

export type Category = "desk" | "chair" | "monitor" | "lamp" | "plant" | "tech" | "comfort";

export type Zone =
  | "desk"
  | "chair"
  | "monitor-left"
  | "monitor-main"
  | "monitor-right"
  | "decor-left"
  | "decor-right"
  | "tech"
  | "comfort";

export type AccessoryZone = Exclude<Zone, "desk" | "chair">;

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  monthlyPrice: number;
  badge: string;
  description: string;
  color: string;
};

export type Setup = {
  desk: string;
  chair: string;
  accessories: Partial<Record<AccessoryZone, string>>;
};

export type Preset = {
  id: string;
  name: string;
  setup: Setup;
  tag: string;
  description: string;
};

export type SelectedLineItem = {
  key: string;
  product: Product;
  placement: string;
};
