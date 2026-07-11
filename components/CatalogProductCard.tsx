import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import { formatPrice } from "../lib/workspace";
import type { Cycle, Product } from "../types/workspace";
import { ProductMiniature } from "./ProductVisuals";

export function CatalogProductCard({
  product,
  cycle,
  onAdd
}: {
  product: Product;
  cycle: Cycle;
  onAdd: (product: Product) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: product.id
  });
  const style: CSSProperties = {
    opacity: isDragging ? 0.35 : undefined
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab touch-none rounded-xl border border-monis-line bg-white p-3 transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft active:cursor-grabbing ${
        isDragging ? "opacity-80 shadow-soft" : ""
      }`}
    >
      <div className="flex gap-3">
        <ProductMiniature product={product} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-black leading-tight">{product.name}</h3>
            <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-black">
              {product.badge}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{product.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-black">
              {formatPrice(cycle === "weekly" ? product.price : product.monthlyPrice)}
              <span className="text-xs font-semibold text-neutral-400">/{cycle === "weekly" ? "wk" : "mo"}</span>
            </span>
            <button
              className="rounded-lg bg-monis-green px-3 py-2 text-xs font-black text-white transition hover:bg-ink"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onAdd(product)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
