# Monis Workspace Builder

Standalone frontend prototype for designing a flexible rental workspace inspired by monis.rent.

## Features

- Select from multiple desks and chairs.
- Add workspace accessories including monitors, lamps, plants, tech, and comfort items.
- Browse 5 products in each catalog category.
- Drag products from the catalog onto visual workspace zones.
- Apply ready-made presets for common rental setups.
- See the workspace preview update as selections change.
- Switch weekly/monthly pricing and review bundle savings.
- Open a checkout-style summary of the selected setup.

## Responsive Targets

The interface is tuned for the screens most relevant to this workspace-design flow:

- `768px+`: standard tablets such as iPad portrait, with catalog and canvas arranged for touch use.
- `1024px+`: iPad landscape and small laptops, with denser workspace controls.
- `1280px+`: normal laptops and desktop monitors, with catalog, canvas, and checkout summary visible together.
- `1536px+`: large desktop displays, with wider catalog and summary columns.

## Tech

- Next.js app router
- React
- Tailwind CSS
- dnd-kit drag and drop
- Local mock product catalog

## Structure

- `app/page.tsx`: main workspace builder orchestration.
- `components/`: reusable catalog, drop zone, checkout, and product visual components.
- `data/`: mock products, presets, locations, and workspace zones.
- `lib/`: workspace helper functions for pricing, dates, validation, and placement.
- `types/`: shared TypeScript types.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run typecheck
npm run build
```
