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

## Future Improvements

With more time, the next improvements would be:

- Add shareable setup URLs by serializing the selected preset, products, location, and rental cycle into query params.
- Add an availability layer for location and delivery date, including unavailable states and suggested substitutes.
- Improve touch interactions further with a tap-to-select then tap-to-place flow for users who prefer not to drag on tablets.
- Split checkout preview into a dedicated route or modal component with form validation for delivery details.
- Add lightweight unit tests for pricing, bundle savings, zone validation, and preset application logic.
- Add Playwright smoke tests for core flows: select preset, drag item, reject invalid drop, clear accessories, and open checkout.
- Replace mock product glyphs with optimized local product thumbnails using `next/image` while keeping consistent dimensions.
- Persist the current setup in local storage so refreshing the page does not reset the workspace.
- Add analytics-friendly event boundaries for preset selection, catalog add, drag/drop placement, and checkout intent.
- Add loading and empty states around future real catalog or availability APIs.

## Deployment Workflow

Recommended branch flow:

- `main`: production branch. Merges into this branch should trigger the production Vercel deployment.
- `develop`: integration branch for active work.
- Feature branches: branch off `develop`, then open PRs back into `develop`.
- Release PRs: open a PR from `develop` into `main` when the app is ready for production.

Recommended Vercel settings:

- Import the GitHub repository into Vercel.
- Set the Production Branch to `main`.
- Keep automatic deployments enabled.
- Use Vercel Preview Deployments for pull requests and non-production branches.

With this setup, merging a PR into `main` automatically deploys the latest production build.
