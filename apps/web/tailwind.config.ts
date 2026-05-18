import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          primary: "#2F6192",
          accent: "#E1B43F",
        },
        // Surfaces (do DESIGN.md)
        surface: "#0e131e",
        "surface-dim": "#0e131e",
        "surface-bright": "#343946",
        "surface-container-lowest": "#090e19",
        "surface-container-low": "#171b27",
        "surface-container": "#1b1f2b",
        "surface-container-high": "#252a36",
        "surface-container-highest": "#303541",
        "surface-variant": "#303541",
        "surface-tint": "#9ecaff",
        // Background
        background: "#0e131e",
        "bg-deep": "#0a0f1a",
        "bg-surface": "#0d1420",
        // Text
        "text-primary": "#e5e7eb",
        "text-secondary": "#9ca3af",
        "on-surface": "#dee2f2",
        "on-surface-variant": "#c2c7d0",
        "on-background": "#dee2f2",
        // Primary
        primary: "#9ecaff",
        "on-primary": "#003258",
        "primary-container": "#2f6192",
        "on-primary-container": "#bfdbff",
        "inverse-primary": "#2f6192",
        // Secondary (dourado)
        secondary: "#efc04a",
        "on-secondary": "#3e2e00",
        "secondary-container": "#b38b13",
        "on-secondary-container": "#362800",
        // Tertiary
        tertiary: "#f1be66",
        "on-tertiary": "#422c00",
        "tertiary-container": "#7d5701",
        "on-tertiary-container": "#ffd185",
        // Error
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        // Lines
        outline: "#8c919a",
        "outline-variant": "#42474f",
        divider: "rgba(255, 255, 255, 0.06)",
        "accent-gold-muted": "rgba(225, 180, 63, 0.15)",
        // Inverse
        "inverse-surface": "#dee2f2",
        "inverse-on-surface": "#2b303c",
      },
      fontFamily: {
        heading: ["bronova", "Manrope", "system-ui", "sans-serif"],
        body: ["gill-sans-nova", "Gill Sans MT", "Hanken Grotesk", "system-ui", "sans-serif"],
        // Aliases do DESIGN.md (Stitch)
        manrope: ["Manrope", "system-ui", "sans-serif"],
        hanken: ["Hanken Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        "headline-xl": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": [
          "12px",
          { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" },
        ],
      },
      spacing: {
        unit: "8px",
        gutter: "24px",
        "container-max": "1200px",
        "margin-mobile": "16px",
        "margin-desktop": "40px",
      },
      maxWidth: {
        "container-max": "1200px",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at 50% 50%, rgba(239, 192, 74, 0.05) 0%, transparent 50%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
        "page-gradient": "linear-gradient(180deg, #0a0f1a 0%, #0d1420 100%)",
      },
      backgroundSize: {
        "grid-40": "100% 100%, 40px 40px, 40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
