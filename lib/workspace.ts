import { accessoryZones } from "../data/options";
import { findProduct } from "../data/products";
import type { AccessoryZone, Preset, Product, Setup, Zone } from "../types/workspace";

export function formatPrice(value: number) {
  return `$${value}`;
}

export function getPlacementLabel(zone: AccessoryZone) {
  return accessoryZones.find((item) => item.id === zone)?.label ?? "Workspace";
}

export function isZone(value: unknown): value is Zone {
  return value === "desk" || value === "chair" || accessoryZones.some((zone) => zone.id === value);
}

export function canProductDropInZone(product: Product | undefined, zone: Zone | null) {
  if (!product || !zone) {
    return false;
  }

  if (zone === "desk") {
    return product.category === "desk";
  }

  if (zone === "chair") {
    return product.category === "chair";
  }

  return accessoryZones.find((item) => item.id === zone)?.accepts.includes(product.category) ?? false;
}

export function getPresetLineItems(preset: Preset) {
  const ids = [preset.setup.desk, preset.setup.chair, ...Object.values(preset.setup.accessories).filter(Boolean)] as string[];
  return ids.map(findProduct).filter(Boolean) as Product[];
}

export function placeAccessoryOnce(accessories: Setup["accessories"], zone: AccessoryZone, productId: string) {
  const next = { ...accessories };
  for (const [currentZone, currentProductId] of Object.entries(next)) {
    if (currentProductId === productId && currentZone !== zone) {
      delete next[currentZone as AccessoryZone];
    }
  }
  next[zone] = productId;
  return next;
}

export function getLocalDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
