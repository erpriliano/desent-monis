"use client";

import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { CatalogProductCard } from "../components/CatalogProductCard";
import { CheckoutPanel } from "../components/CheckoutPanel";
import { DropZone, FurnitureDropZone } from "../components/DropZone";
import { PriceRow } from "../components/PriceRow";
import { ProductMiniature, SmallDeskObject } from "../components/ProductVisuals";
import { accessoryZones, baliLocations, fallbackToday } from "../data/options";
import { initialSetup, presets } from "../data/presets";
import { categoryLabels, findProduct, products } from "../data/products";
import {
  canProductDropInZone,
  formatPrice,
  getLocalDateInputValue,
  getPlacementLabel,
  getPresetLineItems,
  isZone,
  placeAccessoryOnce
} from "../lib/workspace";
import type { AccessoryZone, Category, Cycle, Product, SelectedLineItem, Zone } from "../types/workspace";

const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  return pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args);
};

function WorkspaceBuilder() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 }
    })
  );
  const [activeCategory, setActiveCategory] = useState<Category>("desk");
  const [setup, setSetup] = useState(initialSetup);
  const [activePresetId, setActivePresetId] = useState("custom-start");
  const [cycle, setCycle] = useState<Cycle>("weekly");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("2026-07-12");
  const [minimumDeliveryDate, setMinimumDeliveryDate] = useState(fallbackToday);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [dragTarget, setDragTarget] = useState<Zone | null>(null);
  const [activeDragProductId, setActiveDragProductId] = useState<string | null>(null);

  useEffect(() => {
    const currentDate = getLocalDateInputValue(new Date());
    setMinimumDeliveryDate(currentDate);
    setDeliveryDate((currentDeliveryDate) => (currentDeliveryDate < currentDate ? currentDate : currentDeliveryDate));
  }, []);

  const selectedLineItems = useMemo(() => {
    const lineItems: SelectedLineItem[] = [];
    const deskProduct = findProduct(setup.desk);
    const chairProduct = findProduct(setup.chair);

    if (deskProduct) {
      lineItems.push({ key: "desk", product: deskProduct, placement: "Desk" });
    }

    if (chairProduct) {
      lineItems.push({ key: "chair", product: chairProduct, placement: "Chair" });
    }

    for (const [zone, productId] of Object.entries(setup.accessories)) {
      if (!productId) {
        continue;
      }

      const product = findProduct(productId);
      if (product) {
        const typedZone = zone as AccessoryZone;
        lineItems.push({
          key: `${typedZone}-${product.id}`,
          product,
          placement: getPlacementLabel(typedZone)
        });
      }
    }

    return lineItems;
  }, [setup]);

  const total = selectedLineItems.reduce((sum, item) => {
    return sum + (cycle === "weekly" ? item.product.price : item.product.monthlyPrice);
  }, 0);
  const bundleSavings = selectedLineItems.length >= 5 ? Math.ceil(total * 0.12) : 0;
  const dueToday = Math.max(total - bundleSavings + 4, 0);
  const score = Math.min(100, 48 + selectedLineItems.length * 7 + (setup.accessories["monitor-main"] ? 8 : 0));
  const activePreset = presets.find((preset) => preset.id === activePresetId) ?? presets[0];
  const activePresetItems = getPresetLineItems(activePreset);
  const activeDragProduct = activeDragProductId ? findProduct(activeDragProductId) : undefined;
  const invalidDropTarget = activeDragProduct && dragTarget && !canProductDropInZone(activeDragProduct, dragTarget) ? dragTarget : null;
  const activeProducts = products.filter((product) => product.category === activeCategory);
  const filteredLocations = baliLocations.filter((city) => city.toLowerCase().includes(location.toLowerCase()));
  const desk = findProduct(setup.desk);
  const chair = findProduct(setup.chair);

  function chooseProduct(product: Product) {
    setActivePresetId("custom-start");

    if (product.category === "desk") {
      setSetup((current) => ({ ...current, desk: product.id }));
      return;
    }

    if (product.category === "chair") {
      setSetup((current) => ({ ...current, chair: product.id }));
      return;
    }

    const firstZone =
      accessoryZones.find((zone) => zone.accepts.includes(product.category) && !setup.accessories[zone.id]) ??
      accessoryZones.find((zone) => zone.accepts.includes(product.category));
    if (!firstZone) {
      return;
    }

    setSetup((current) => ({
      ...current,
      accessories: placeAccessoryOnce(current.accessories, firstZone.id, product.id)
    }));
  }

  function placeProduct(productId: string, zone: Zone) {
    const product = findProduct(productId);
    if (!product) {
      return;
    }

    setActivePresetId("custom-start");

    if (zone === "desk" && product.category === "desk") {
      setSetup((current) => ({ ...current, desk: product.id }));
      return;
    }

    if (zone === "chair" && product.category === "chair") {
      setSetup((current) => ({ ...current, chair: product.id }));
      return;
    }

    const accessoryZone = accessoryZones.find((item) => item.id === zone);
    if (accessoryZone?.accepts.includes(product.category)) {
      setSetup((current) => ({
        ...current,
        accessories: placeAccessoryOnce(current.accessories, accessoryZone.id, product.id)
      }));
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveDragProductId(String(event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    const zone = event.over?.id;
    setDragTarget(isZone(zone) ? zone : null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const productId = String(event.active.id);
    const zone = event.over?.id ?? dragTarget;
    if (isZone(zone)) {
      placeProduct(productId, zone);
    }
    setDragTarget(null);
    setActiveDragProductId(null);
  }

  function handleDragCancel() {
    setDragTarget(null);
    setActiveDragProductId(null);
  }

  function clearAccessory(zone: AccessoryZone) {
    setActivePresetId("custom-start");
    setSetup((current) => {
      const next = { ...current.accessories };
      delete next[zone];
      return { ...current, accessories: next };
    });
  }

  function clearAllAccessories() {
    setActivePresetId("custom-start");
    setSetup((current) => ({ ...current, accessories: {} }));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <main className="min-h-screen bg-monis-paper text-ink">
        <header className="relative z-40 border-b border-monis-line bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-3 py-4 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-lg font-black text-white">
                m
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-monis-green">monis.rent concept</p>
                <h1 className="text-2xl font-black sm:text-3xl 2xl:text-4xl">Design your workspace</h1>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[1fr_170px_160px] lg:w-[620px] 2xl:w-[700px]">
              <div
                className="relative rounded-lg border border-monis-line bg-white px-3 py-2"
                onBlur={(event) => {
                  const nextFocusedElement = event.relatedTarget as Node | null;
                  if (!event.currentTarget.contains(nextFocusedElement)) {
                    setLocationOpen(false);
                  }
                }}
              >
                <span className="block text-xs font-bold text-neutral-500">Location</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                      setLocationOpen(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setLocationOpen(false);
                      }
                    }}
                    placeholder="Search Bali area"
                  />
                  <button
                    type="button"
                    aria-label="Show Bali locations"
                    aria-expanded={locationOpen}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-monis-line text-sm font-black transition hover:border-ink"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setLocationOpen((isOpen) => !isOpen)}
                  >
                    {locationOpen ? "^" : "v"}
                  </button>
                </div>
                {locationOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-monis-line bg-white shadow-soft">
                    {(filteredLocations.length > 0 ? filteredLocations : baliLocations).map((city) => (
                      <button
                        key={city}
                        type="button"
                        className="block w-full px-3 py-2 text-left text-sm font-semibold transition hover:bg-monis-paper"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setLocation(city);
                          setLocationOpen(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <label className="rounded-lg border border-monis-line bg-white px-3 py-2">
                <span className="block text-xs font-bold text-neutral-500">Delivery date</span>
                <input
                  className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"
                  type="date"
                  min={minimumDeliveryDate}
                  value={deliveryDate}
                  onChange={(event) => setDeliveryDate(event.target.value)}
                />
              </label>
              <div className="grid grid-cols-2 rounded-lg border border-monis-line bg-white p-1">
                {(["weekly", "monthly"] as Cycle[]).map((item) => (
                  <button
                    key={item}
                    className={`rounded-md px-3 py-2 text-sm font-bold capitalize transition ${
                      cycle === item ? "bg-ink text-white" : "text-neutral-500 hover:text-ink"
                    }`}
                    onClick={() => setCycle(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-screen-2xl gap-4 px-3 py-4 sm:px-4 md:grid-cols-[280px_minmax(0,1fr)] lg:px-6 xl:grid-cols-[300px_minmax(0,1fr)_320px] 2xl:grid-cols-[340px_minmax(0,1fr)_360px]">
          <aside className="rounded-xl border border-monis-line bg-white p-3 shadow-soft md:self-start xl:sticky xl:top-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black">Catalog</h2>
                <p className="text-sm text-neutral-500">Drag or click to add.</p>
              </div>
              <span className="rounded-full bg-monis-mint px-3 py-1 text-xs font-black text-ink">Instant</span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {(Object.keys(categoryLabels) as Category[]).map((category) => (
                <button
                  key={category}
                  className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                    activeCategory === category
                      ? "border-ink bg-ink text-white"
                      : "border-monis-line bg-white text-neutral-600 hover:border-ink"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {activeProducts.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  product={product}
                  cycle={cycle}
                  onAdd={chooseProduct}
                />
              ))}
            </div>
          </aside>

          <section className="min-w-0 space-y-4">
            <div className="rounded-xl border border-monis-line bg-white p-3 shadow-soft">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black">Quick presets</h2>
                  <p className="text-sm text-neutral-500">Start with a rental bundle, then customize it below.</p>
                </div>
                <span className="hidden rounded-full bg-monis-mint px-3 py-1 text-xs font-black text-ink sm:inline-flex">
                  6 templates
                </span>
              </div>
              <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    className={`flex min-h-32 flex-col rounded-xl border-2 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft ${
                      activePresetId === preset.id ? "border-monis-green shadow-soft" : "border-monis-line"
                    }`}
                    onClick={() => {
                      setSetup(preset.setup);
                      setActivePresetId(preset.id);
                    }}
                  >
                    <span
                      className={`w-fit rounded-full px-2 py-1 text-[11px] font-black ${
                        activePresetId === preset.id ? "bg-monis-mint text-ink" : "bg-monis-paper text-monis-green"
                      }`}
                    >
                      {preset.tag}
                    </span>
                    <span className="mt-3 block text-sm font-black">{preset.name}</span>
                    <span className="mt-1 block flex-1 text-xs leading-5 text-neutral-500">{preset.description}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-monis-line bg-monis-paper p-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-monis-green">Selected preset</p>
                    <h3 className="mt-1 text-base font-black">{activePreset.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">{activePreset.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    {activePresetItems.map((product) => (
                      <span key={`${activePreset.id}-${product.id}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-600">
                        {product.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-monis-line bg-white p-3 shadow-soft">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-black">Workspace preview</h2>
                  <p className="text-sm text-neutral-500">Drop products into the desk, chair, and accessory zones.</p>
                </div>
                <button
                  className="w-fit rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-black text-red-600 transition hover:border-red-500 hover:bg-red-100"
                  onClick={clearAllAccessories}
                >
                  Clear accessories
                </button>
              </div>

              <div className="workspace-grid relative min-h-[520px] overflow-hidden rounded-xl border border-monis-line bg-[#fbfcfa] p-3 sm:p-4 lg:min-h-[600px] lg:p-5 2xl:min-h-[660px] 2xl:p-6">
                <div className="absolute inset-x-4 bottom-6 h-20 rounded-[50%] border border-neutral-200 bg-white/70 sm:inset-x-8 sm:bottom-8 sm:h-24" />

                <div className="relative mx-auto grid max-w-5xl gap-3 lg:gap-4 2xl:max-w-6xl">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {(["monitor-left", "monitor-main", "monitor-right"] as const).map((zone) => (
                      <DropZone
                        key={zone}
                        zone={zone}
                        label={accessoryZones.find((item) => item.id === zone)?.label ?? "Monitor"}
                        product={setup.accessories[zone] ? findProduct(setup.accessories[zone] as string) : undefined}
                        active={dragTarget === zone}
                        invalid={invalidDropTarget === zone}
                        onClear={() => clearAccessory(zone)}
                      />
                    ))}
                  </div>

                  <FurnitureDropZone
                    zone="desk"
                    active={dragTarget === "desk"}
                    invalid={invalidDropTarget === "desk"}
                    invalidMessage="Desks only"
                    className="relative mx-auto h-36 w-full max-w-3xl rounded-xl border-2 p-3 transition sm:h-40 lg:h-44 2xl:h-52"
                    idleClassName="border-neutral-300 bg-white"
                  >
                    <div
                      className="absolute inset-x-4 top-7 h-16 rounded-lg border border-neutral-300 shadow-sm sm:inset-x-5 sm:h-20 2xl:h-24"
                      style={{ backgroundColor: desk?.color }}
                    />
                    <div className="absolute bottom-4 left-8 h-16 w-6 rounded-b bg-neutral-300 sm:bottom-5 sm:left-10 sm:h-20 sm:w-8" />
                    <div className="absolute bottom-4 right-8 h-16 w-6 rounded-b bg-neutral-300 sm:bottom-5 sm:right-10 sm:h-20 sm:w-8" />
                    <div className="relative z-10 flex h-full items-end justify-between gap-2 sm:gap-3">
                      <SmallDeskObject product={setup.accessories["decor-left"] ? findProduct(setup.accessories["decor-left"]) : undefined} label="Lamp or plant" />
                      <SmallDeskObject product={setup.accessories.tech ? findProduct(setup.accessories.tech) : undefined} label="Tech" />
                      <SmallDeskObject product={setup.accessories["decor-right"] ? findProduct(setup.accessories["decor-right"]) : undefined} label="Lamp or plant" />
                    </div>
                    <div className="absolute left-3 top-3 max-w-[72%] rounded-full bg-white/90 px-3 py-1 text-xs font-black shadow-sm sm:left-5 sm:top-4">
                      {desk?.name}
                    </div>
                  </FurnitureDropZone>

                  <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,1fr)_280px_minmax(0,1fr)]">
                    <DropZone
                      zone="decor-left"
                      label="Lamp or plant"
                      product={setup.accessories["decor-left"] ? findProduct(setup.accessories["decor-left"]) : undefined}
                      active={dragTarget === "decor-left"}
                      invalid={invalidDropTarget === "decor-left"}
                      onClear={() => clearAccessory("decor-left")}
                    />

                    <FurnitureDropZone
                      zone="chair"
                      active={dragTarget === "chair"}
                      invalid={invalidDropTarget === "chair"}
                      invalidMessage="Chairs only"
                      className="relative flex h-40 items-center justify-center rounded-xl border-2 transition sm:h-44 lg:h-48 2xl:h-56"
                      idleClassName="border-dashed border-neutral-300 bg-white/80"
                    >
                      <div
                        className="h-24 w-24 rounded-t-[36px] rounded-b-xl border border-neutral-300 shadow-sm lg:h-28 lg:w-28 lg:rounded-t-[42px] 2xl:h-32 2xl:w-32"
                        style={{ backgroundColor: chair?.color }}
                      />
                      <div className="absolute bottom-8 h-10 w-14 rounded-full border border-neutral-300 bg-white lg:bottom-9 lg:h-12 lg:w-16" />
                      <div className="absolute bottom-3 h-9 w-3 rounded bg-neutral-400 lg:h-10" />
                      <div className="absolute bottom-1 h-3 w-24 rounded-full bg-neutral-300 lg:w-28" />
                      <span className="absolute left-3 top-3 max-w-[72%] rounded-full bg-white px-3 py-1 text-xs font-black shadow-sm sm:left-4 sm:top-4">
                        {chair?.name}
                      </span>
                    </FurnitureDropZone>

                    <DropZone
                      zone="decor-right"
                      label="Lamp or plant"
                      product={setup.accessories["decor-right"] ? findProduct(setup.accessories["decor-right"]) : undefined}
                      active={dragTarget === "decor-right"}
                      invalid={invalidDropTarget === "decor-right"}
                      onClear={() => clearAccessory("decor-right")}
                    />
                  </div>

                  <DropZone
                    zone="comfort"
                    label="Comfort zone"
                    product={setup.accessories.comfort ? findProduct(setup.accessories.comfort) : undefined}
                    active={dragTarget === "comfort"}
                    invalid={invalidDropTarget === "comfort"}
                    onClear={() => clearAccessory("comfort")}
                  />
                </div>
              </div>
            </div>
          </section>

          <CheckoutPanel
            location={location}
            score={score}
            selectedLineItems={selectedLineItems}
            cycle={cycle}
            total={total}
            bundleSavings={bundleSavings}
            dueToday={dueToday}
            onOpenCheckout={() => setCheckoutOpen(true)}
          />
        </section>

        {checkoutOpen ? (
          <div className="fixed inset-0 z-50 flex items-end bg-ink/40 p-3 backdrop-blur-sm sm:items-center sm:justify-center">
            <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-5 shadow-soft">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-monis-green">Checkout preview</p>
                  <h2 className="text-2xl font-black">Your Monis workspace</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {location || "Bali"} - delivery on {deliveryDate}
                  </p>
                </div>
                <button
                  className="rounded-lg border border-monis-line px-3 py-2 text-sm font-black hover:border-ink"
                  onClick={() => setCheckoutOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {selectedLineItems.map((item) => (
                  <div key={item.key} className="rounded-xl border border-monis-line p-3">
                    <div className="flex gap-3">
                      <ProductMiniature product={item.product} />
                      <div>
                        <p className="font-black">{item.product.name}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">{item.placement}</p>
                        <p className="mt-1 text-sm leading-5 text-neutral-500">{item.product.description}</p>
                        <p className="mt-2 text-sm font-black">
                          {formatPrice(cycle === "weekly" ? item.product.price : item.product.monthlyPrice)}/{cycle === "weekly" ? "week" : "month"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-monis-paper p-4">
                <PriceRow label="Rental cycle" value={cycle} />
                <PriceRow label="Items" value={`${selectedLineItems.length}`} />
                <PriceRow label="Bundle savings" value={`-${formatPrice(bundleSavings)}`} accent />
                <PriceRow label="Delivery estimate" value="$4" />
                <div className="mt-3 flex items-center justify-between border-t border-monis-line pt-3 text-xl font-black">
                  <span>Total</span>
                  <span>{formatPrice(dueToday)}</span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl bg-ink px-4 py-4 font-black text-white">
                Request this setup on WhatsApp
              </button>
            </div>
          </div>
        ) : null}
      </main>
      <DragOverlay zIndex={1000}>
        {activeDragProduct ? (
          <div className="w-[280px] rotate-1 rounded-xl border border-monis-line bg-white p-3 shadow-soft">
            <div className="flex gap-3">
              <ProductMiniature product={activeDragProduct} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black leading-tight">{activeDragProduct.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{activeDragProduct.description}</p>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

const Home = dynamic(() => Promise.resolve(WorkspaceBuilder), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center bg-monis-paper px-4 text-ink">
      <div className="rounded-xl border border-monis-line bg-white p-5 text-center shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-monis-green">monis.rent concept</p>
        <h1 className="mt-2 text-xl font-black">Loading workspace builder</h1>
      </div>
    </main>
  )
});

export default Home;
