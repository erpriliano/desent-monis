import type { Category, Product } from "../types/workspace";

export function ProductMiniature({ product }: { product: Product }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-neutral-200 sm:h-16 sm:w-16 2xl:h-[72px] 2xl:w-[72px]"
      style={{ backgroundColor: product.color }}
    >
      <ProductGlyph category={product.category} />
    </div>
  );
}

export function ProductGlyph({ category }: { category: Category }) {
  if (category === "desk") {
    return <div className="h-7 w-11 rounded border-2 border-ink/60 border-b-4" />;
  }
  if (category === "chair") {
    return <div className="h-10 w-8 rounded-t-2xl rounded-b border-2 border-ink/60" />;
  }
  if (category === "monitor") {
    return (
      <div className="flex flex-col items-center">
        <div className="h-8 w-11 rounded-sm border-2 border-ink/60" />
        <div className="h-3 w-1 bg-ink/60" />
        <div className="h-1 w-7 rounded bg-ink/60" />
      </div>
    );
  }
  if (category === "lamp") {
    return (
      <div className="relative h-12 w-10">
        <div className="absolute bottom-1 left-4 h-8 w-1 rotate-[-28deg] bg-ink/60" />
        <div className="absolute left-1 top-1 h-5 w-7 rotate-[18deg] rounded-t-full border-2 border-ink/60" />
        <div className="absolute bottom-0 left-2 h-2 w-8 rounded bg-ink/60" />
      </div>
    );
  }
  if (category === "plant") {
    return (
      <div className="flex flex-col items-center">
        <div className="h-5 w-8 rounded-full border-2 border-ink/60 border-b-0" />
        <div className="h-5 w-7 rounded-b border-2 border-ink/60" />
      </div>
    );
  }
  if (category === "tech") {
    return <div className="h-8 w-12 rounded border-2 border-ink/60 border-t-4" />;
  }
  return <div className="h-9 w-9 rounded-lg border-2 border-ink/60" />;
}

export function SmallDeskObject({ product, label }: { product?: Product; label: string }) {
  return (
    <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-white/70 bg-white/70 text-center shadow-sm sm:h-14 sm:w-20 lg:h-16 lg:w-24 2xl:h-20 2xl:w-28">
      {product ? (
        <ProductGlyph category={product.category} />
      ) : (
        <span className="px-2 text-xs font-bold text-neutral-400">{label}</span>
      )}
    </div>
  );
}
