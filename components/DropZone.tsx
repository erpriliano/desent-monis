import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { AccessoryZone, Product } from "../types/workspace";
import { ProductMiniature } from "./ProductVisuals";

export function DropZone({
  zone,
  label,
  product,
  active,
  invalid,
  onClear
}: {
  zone: AccessoryZone;
  label: string;
  product?: Product;
  active: boolean;
  invalid: boolean;
  onClear: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zone });
  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-24 rounded-xl border-2 p-3 transition sm:min-h-28 2xl:min-h-32 ${
        invalid
          ? "border-red-500 bg-red-50"
          : active || isOver
            ? "border-monis-green bg-monis-mint/30"
            : product
              ? "border-neutral-300 bg-white"
              : "drop-pulse border-dashed bg-white/70"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 sm:text-xs">{label}</p>
          <p className="mt-1 text-sm font-black leading-tight">{invalid ? "Not allowed here" : product?.name ?? "Drop item here"}</p>
        </div>
        {product ? (
          <button
            className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-black text-red-600 transition hover:border-red-500 hover:bg-red-100"
            onClick={onClear}
          >
            Remove
          </button>
        ) : null}
      </div>
      <div className="mt-3 flex justify-center">
        {product ? (
          <ProductMiniature product={product} />
        ) : (
          <div className="h-14 w-14 rounded-xl border border-dashed border-neutral-300 sm:h-16 sm:w-16" />
        )}
      </div>
    </div>
  );
}

export function FurnitureDropZone({
  zone,
  active,
  invalid,
  invalidMessage,
  className,
  idleClassName,
  children
}: {
  zone: "desk" | "chair";
  active: boolean;
  invalid: boolean;
  invalidMessage: string;
  className: string;
  idleClassName: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: zone });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${
        invalid
          ? "border-red-500 bg-red-50"
          : active || isOver
            ? "border-monis-green bg-monis-mint/30"
            : idleClassName
      }`}
    >
      {children}
      {invalid ? (
        <div className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-sm">
          {invalidMessage}
        </div>
      ) : null}
    </div>
  );
}
