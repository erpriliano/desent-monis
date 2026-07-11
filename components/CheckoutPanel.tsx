import { formatPrice } from "../lib/workspace";
import type { Cycle, SelectedLineItem } from "../types/workspace";
import { PriceRow } from "./PriceRow";

export function CheckoutPanel({
  location,
  score,
  selectedLineItems,
  cycle,
  total,
  bundleSavings,
  dueToday,
  onOpenCheckout
}: {
  location: string;
  score: number;
  selectedLineItems: SelectedLineItem[];
  cycle: Cycle;
  total: number;
  bundleSavings: number;
  dueToday: number;
  onOpenCheckout: () => void;
}) {
  return (
    <aside className="rounded-xl border border-monis-line bg-white p-4 shadow-soft md:col-span-2 xl:col-span-1 xl:sticky xl:top-4 xl:self-start">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black">Ready to rent?</h2>
          <p className="text-sm text-neutral-500">Delivery to {location || "Bali"}</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-monis-mint bg-white text-lg font-black">
          {score}
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-ink p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-monis-mint">Workspace score</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-monis-mint" style={{ width: `${score}%` }} />
        </div>
        <p className="mt-3 text-sm text-white/75">Good ergonomics, fast setup, and enough flexibility to extend or swap later.</p>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-1">
        {selectedLineItems.map((item) => (
          <div key={item.key} className="flex items-start justify-between gap-3 rounded-lg border border-monis-line p-3">
            <div>
              <p className="text-sm font-black">{item.product.name}</p>
              <p className="text-xs text-neutral-500">{item.placement}</p>
            </div>
            <p className="text-sm font-black">
              {formatPrice(cycle === "weekly" ? item.product.price : item.product.monthlyPrice)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-monis-line pt-4 text-sm">
        <PriceRow label="Subtotal" value={formatPrice(total)} />
        <PriceRow label="Bundle savings" value={`-${formatPrice(bundleSavings)}`} accent />
        <PriceRow label="Delivery estimate" value="$4" />
        <div className="flex items-center justify-between pt-2 text-lg font-black">
          <span>Due first {cycle === "weekly" ? "week" : "month"}</span>
          <span>{formatPrice(dueToday)}</span>
        </div>
      </div>

      <button
        className="mt-5 w-full rounded-xl bg-monis-green px-4 py-4 text-base font-black text-white transition hover:bg-ink"
        onClick={onOpenCheckout}
      >
        Rent your setup
      </button>
      <p className="mt-3 text-center text-xs text-neutral-500">Standalone prototype. No real cart or payment is connected.</p>
    </aside>
  );
}
