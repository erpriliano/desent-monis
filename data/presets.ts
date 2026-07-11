import type { Preset, Setup } from "../types/workspace";

export const presets: Preset[] = [
  {
    id: "custom-start",
    name: "Custom Start",
    tag: "Blank",
    description: "Begin with only the desk and chair, then place every accessory yourself.",
    setup: {
      desk: "standing-desk",
      chair: "mesh-chair",
      accessories: {}
    }
  },
  {
    id: "founder-setup",
    name: "Founder Setup",
    tag: "Balanced",
    description: "A clean daily driver with 4K display, ergonomic seat, and core desk tools.",
    setup: {
      desk: "standing-desk",
      chair: "mesh-chair",
      accessories: {
        "monitor-main": "monitor-4k",
        "decor-left": "table-plant",
        "decor-right": "desk-lamp",
        tech: "mx-kit"
      }
    }
  },
  {
    id: "trading-desk",
    name: "Trading Desk",
    tag: "Multi-screen",
    description: "Wide desk, triple displays, and focused lighting for heavy screen work.",
    setup: {
      desk: "studio-desk",
      chair: "mesh-chair",
      accessories: {
        "monitor-left": "monitor-4k",
        "monitor-main": "monitor-wide",
        "decor-right": "gradient-lamp",
        tech: "mx-kit"
      }
    }
  },
  {
    id: "villa-remote",
    name: "Villa Remote",
    tag: "Comfort",
    description: "A relaxed Bali remote-work setup with coffee, greenery, and compact furniture.",
    setup: {
      desk: "standing-desk",
      chair: "focus-chair",
      accessories: {
        "monitor-main": "monitor-4k",
        "decor-left": "floor-plant",
        "decor-right": "desk-lamp",
        comfort: "coffee-machine"
      }
    }
  },
  {
    id: "creator-studio",
    name: "Creator Studio",
    tag: "Video-ready",
    description: "Display, webcam, ambient light, and a wider desk for calls and content work.",
    setup: {
      desk: "studio-desk",
      chair: "mesh-chair",
      accessories: {
        "monitor-main": "monitor-4k",
        "decor-left": "table-plant",
        "decor-right": "gradient-lamp",
        tech: "webcam-kit"
      }
    }
  },
  {
    id: "lean-sprint",
    name: "Lean Sprint",
    tag: "Short stay",
    description: "A lightweight setup for a week of focused work without overbuilding the desk.",
    setup: {
      desk: "studio-desk",
      chair: "focus-chair",
      accessories: {
        "monitor-main": "monitor-4k",
        "decor-right": "desk-lamp",
        tech: "mx-kit"
      }
    }
  }
];

export const initialSetup: Setup = {
  desk: "standing-desk",
  chair: "mesh-chair",
  accessories: {}
};
