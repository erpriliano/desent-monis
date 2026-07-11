export function PriceRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-neutral-500">{label}</span>
      <span className={`font-black capitalize ${accent ? "text-monis-green" : "text-ink"}`}>{value}</span>
    </div>
  );
}
