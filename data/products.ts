import type { Category, Product } from "../types/workspace";

export const products: Product[] = [
  {
    id: "standing-desk",
    name: "Electrical Adjustable Desk",
    category: "desk",
    price: 8,
    monthlyPrice: 26,
    badge: "-50%",
    description: "Quiet sit-stand desk for long focused days.",
    color: "#f3d9a8"
  },
  {
    id: "studio-desk",
    name: "Wide Studio Desk",
    category: "desk",
    price: 6,
    monthlyPrice: 21,
    badge: "Instant",
    description: "Extra surface area for dual screens and creator gear.",
    color: "#c6ddf8"
  },
  {
    id: "compact-desk",
    name: "Compact Laptop Desk",
    category: "desk",
    price: 4,
    monthlyPrice: 14,
    badge: "Lite",
    description: "Small footprint desk for apartments and short stays.",
    color: "#ddd6fe"
  },
  {
    id: "executive-desk",
    name: "Executive Wood Desk",
    category: "desk",
    price: 10,
    monthlyPrice: 34,
    badge: "Premium",
    description: "Solid desk with a warmer executive workspace feel.",
    color: "#f5c99b"
  },
  {
    id: "corner-desk",
    name: "L-Shaped Corner Desk",
    category: "desk",
    price: 11,
    monthlyPrice: 38,
    badge: "Spacious",
    description: "Corner layout for multitasking and larger villas.",
    color: "#bae6fd"
  },
  {
    id: "mesh-chair",
    name: "Ergonomic Mesh Chair",
    category: "chair",
    price: 7,
    monthlyPrice: 24,
    badge: "-50%",
    description: "4D armrests, lumbar support, and reclining back.",
    color: "#cbd5e1"
  },
  {
    id: "focus-chair",
    name: "Compact Focus Chair",
    category: "chair",
    price: 4,
    monthlyPrice: 15,
    badge: "Instant",
    description: "Simple adjustable chair for shorter stays.",
    color: "#d8f3dc"
  },
  {
    id: "premium-chair",
    name: "Premium Ergonomic Chair",
    category: "chair",
    price: 10,
    monthlyPrice: 35,
    badge: "Premium",
    description: "Higher-back support with deeper adjustability.",
    color: "#bfdbfe"
  },
  {
    id: "studio-stool",
    name: "Adjustable Studio Stool",
    category: "chair",
    price: 3,
    monthlyPrice: 11,
    badge: "Studio",
    description: "Fast-moving seat for creator rooms and standing desks.",
    color: "#e9d5ff"
  },
  {
    id: "lounge-task-chair",
    name: "Lounge Task Chair",
    category: "chair",
    price: 6,
    monthlyPrice: 20,
    badge: "Comfort",
    description: "Softer task chair for relaxed home-office setups.",
    color: "#fecaca"
  },
  {
    id: "monitor-4k",
    name: "27 inch 4K USB-C Monitor",
    category: "monitor",
    price: 9,
    monthlyPrice: 32,
    badge: "-25%",
    description: "Sharp 4K display with laptop charging.",
    color: "#dbeafe"
  },
  {
    id: "monitor-wide",
    name: "34 inch Curved Monitor",
    category: "monitor",
    price: 12,
    monthlyPrice: 42,
    badge: "Gaming",
    description: "Ultrawide screen for trading, design, or gaming.",
    color: "#e0e7ff"
  },
  {
    id: "monitor-24",
    name: "24 inch Full HD Monitor",
    category: "monitor",
    price: 5,
    monthlyPrice: 18,
    badge: "Lite",
    description: "Reliable second screen for email, docs, and calls.",
    color: "#bfdbfe"
  },
  {
    id: "monitor-pro",
    name: "32 inch 4K Pro Display",
    category: "monitor",
    price: 14,
    monthlyPrice: 48,
    badge: "Pro",
    description: "Large high-resolution panel for design and review work.",
    color: "#c7d2fe"
  },
  {
    id: "portable-monitor",
    name: "16 inch Portable Monitor",
    category: "monitor",
    price: 6,
    monthlyPrice: 20,
    badge: "Travel",
    description: "Lightweight extra screen for nomads and compact desks.",
    color: "#cffafe"
  },
  {
    id: "desk-lamp",
    name: "Smart LED Desk Lamp",
    category: "lamp",
    price: 3,
    monthlyPrice: 10,
    badge: "Instant",
    description: "Adjustable color temperature and dimming.",
    color: "#fde68a"
  },
  {
    id: "gradient-lamp",
    name: "Hue Gradient Lamp",
    category: "lamp",
    price: 5,
    monthlyPrice: 18,
    badge: "New",
    description: "Ambient color for calls, gaming, and evening work.",
    color: "#fecdd3"
  },
  {
    id: "monitor-light-bar",
    name: "Monitor Light Bar",
    category: "lamp",
    price: 3,
    monthlyPrice: 11,
    badge: "Focus",
    description: "Screen-mounted lighting that keeps the desk clear.",
    color: "#fef3c7"
  },
  {
    id: "floor-lamp",
    name: "Minimal Floor Lamp",
    category: "lamp",
    price: 4,
    monthlyPrice: 15,
    badge: "Warm",
    description: "Soft room lighting for evening work sessions.",
    color: "#fde68a"
  },
  {
    id: "ring-light",
    name: "Creator Ring Light",
    category: "lamp",
    price: 4,
    monthlyPrice: 14,
    badge: "Video",
    description: "Simple face lighting for calls and content.",
    color: "#fbcfe8"
  },
  {
    id: "table-plant",
    name: "Desk Plant",
    category: "plant",
    price: 1,
    monthlyPrice: 4,
    badge: "Fresh",
    description: "Small green detail to make the setup feel lived in.",
    color: "#bbf7d0"
  },
  {
    id: "floor-plant",
    name: "Tall Corner Plant",
    category: "plant",
    price: 2,
    monthlyPrice: 7,
    badge: "Popular",
    description: "A larger plant for villa workspaces and studios.",
    color: "#86efac"
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    category: "plant",
    price: 2,
    monthlyPrice: 8,
    badge: "Low care",
    description: "Structured greenery that fits beside a desk.",
    color: "#a7f3d0"
  },
  {
    id: "bonsai-plant",
    name: "Mini Bonsai",
    category: "plant",
    price: 2,
    monthlyPrice: 7,
    badge: "Desk",
    description: "Compact decorative plant for a calmer work surface.",
    color: "#bbf7d0"
  },
  {
    id: "hanging-plant",
    name: "Hanging Plant",
    category: "plant",
    price: 3,
    monthlyPrice: 9,
    badge: "Villa",
    description: "Trailing greenery for a more styled workspace corner.",
    color: "#d9f99d"
  },
  {
    id: "mx-kit",
    name: "MX Keyboard and Mouse",
    category: "tech",
    price: 4,
    monthlyPrice: 14,
    badge: "-20%",
    description: "Wireless keyboard and ergonomic mouse bundle.",
    color: "#e5e7eb"
  },
  {
    id: "webcam-kit",
    name: "4K Webcam Kit",
    category: "tech",
    price: 5,
    monthlyPrice: 17,
    badge: "Instant",
    description: "Clear video calls with flexible mounting.",
    color: "#d1d5db"
  },
  {
    id: "usb-c-dock",
    name: "USB-C Docking Station",
    category: "tech",
    price: 5,
    monthlyPrice: 18,
    badge: "Useful",
    description: "Connect displays, power, and peripherals with one cable.",
    color: "#e0f2fe"
  },
  {
    id: "podcast-mic",
    name: "USB Podcast Microphone",
    category: "tech",
    price: 6,
    monthlyPrice: 22,
    badge: "Audio",
    description: "Cleaner voice for podcasts, calls, and recordings.",
    color: "#cbd5e1"
  },
  {
    id: "starlink-kit",
    name: "Starlink Internet Kit",
    category: "tech",
    price: 16,
    monthlyPrice: 55,
    badge: "Remote",
    description: "Reliable connectivity option for villas and remote areas.",
    color: "#bfdbfe"
  },
  {
    id: "coffee-machine",
    name: "Nespresso Coffee Machine",
    category: "comfort",
    price: 5,
    monthlyPrice: 18,
    badge: "New",
    description: "Compact coffee station for long work sprints.",
    color: "#fed7aa"
  },
  {
    id: "air-purifier",
    name: "Smart Air Purifier",
    category: "comfort",
    price: 6,
    monthlyPrice: 22,
    badge: "Instant",
    description: "Cleaner air for bedrooms, villas, and studios.",
    color: "#cffafe"
  },
  {
    id: "bean-bag",
    name: "Bean Bag Lounge Seat",
    category: "comfort",
    price: 4,
    monthlyPrice: 14,
    badge: "Relax",
    description: "A casual break spot beside the workstation.",
    color: "#fecdd3"
  },
  {
    id: "footrest",
    name: "Ergonomic Footrest",
    category: "comfort",
    price: 2,
    monthlyPrice: 8,
    badge: "Ergo",
    description: "Small comfort upgrade for better seated posture.",
    color: "#e5e7eb"
  },
  {
    id: "whiteboard",
    name: "Mobile Whiteboard",
    category: "comfort",
    price: 5,
    monthlyPrice: 18,
    badge: "Team",
    description: "Rolling board for planning, workshops, and team villas.",
    color: "#f8fafc"
  }
];

export const categoryLabels: Record<Category, string> = {
  desk: "Desks",
  chair: "Chairs",
  monitor: "Monitors",
  lamp: "Lamps",
  plant: "Plants",
  tech: "Tech",
  comfort: "Comfort"
};

export function findProduct(id: string) {
  return products.find((product) => product.id === id);
}
