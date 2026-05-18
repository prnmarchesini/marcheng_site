---
name: Solar Institutional Precision
colors:
  surface: '#0e131e'
  surface-dim: '#0e131e'
  surface-bright: '#343946'
  surface-container-lowest: '#090e19'
  surface-container-low: '#171b27'
  surface-container: '#1b1f2b'
  surface-container-high: '#252a36'
  surface-container-highest: '#303541'
  on-surface: '#dee2f2'
  on-surface-variant: '#c2c7d0'
  inverse-surface: '#dee2f2'
  inverse-on-surface: '#2b303c'
  outline: '#8c919a'
  outline-variant: '#42474f'
  surface-tint: '#9ecaff'
  primary: '#9ecaff'
  on-primary: '#003258'
  primary-container: '#2f6192'
  on-primary-container: '#bfdbff'
  inverse-primary: '#2f6192'
  secondary: '#efc04a'
  on-secondary: '#3e2e00'
  secondary-container: '#b38b13'
  on-secondary-container: '#362800'
  tertiary: '#f1be66'
  on-tertiary: '#422c00'
  tertiary-container: '#7d5701'
  on-tertiary-container: '#ffd185'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9ecaff'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#0d4979'
  secondary-fixed: '#ffdf98'
  secondary-fixed-dim: '#efc04a'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#ffdeab'
  tertiary-fixed-dim: '#f1be66'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#0e131e'
  on-background: '#dee2f2'
  surface-variant: '#303541'
  bg-deep: '#0a0f1a'
  bg-surface: '#0d1420'
  text-primary: '#e5e7eb'
  text-secondary: '#9ca3af'
  divider: rgba(255, 255, 255, 0.06)
  accent-gold-muted: rgba(225, 180, 63, 0.15)
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
This design system establishes a high-end engineering aesthetic for a solar energy leader. The visual narrative balances **Institutional Minimalism** with **Corporate Modernism**, drawing inspiration from high-growth technology platforms like Stripe and Linear. 

The personality is sober, technical, and authoritative. It evokes trust through geometric precision, expansive use of negative space, and a refined dark-mode environment. Visual communication relies on structured layouts and a premium "solar-tech" atmosphere rather than decorative elements. Emojis are strictly avoided to maintain institutional gravity, replaced by discrete, thin-stroke linear iconography.

**Design Pillars:**
- **Technical Excellence:** Precision-aligned grids and consistent stroke weights.
- **Reliability:** A deep, stable color palette that feels established and solid.
- **Modern Innovation:** Subtle glassmorphism and thin borders to signify cutting-edge engineering.

## Colors
The palette is centered on a **Premium Dark Mode** experience. The background utilizes a subtle, deep-sea gradient between `#0a0f1a` and `#0d1420` to provide depth without distracting from the content. 

- **Primary Blue (#2F6192):** Used for institutional branding, primary actions, and key technical highlights.
- **Accent Gold (#E1B43F):** Reserved for high-importance call-to-actions, status indicators, or subtle ornamental accents that signify "premium" value.
- **Neutral/Surface:** Secondary surfaces and cards use `#0d1420`. Dividers and borders are extremely subtle, using a low-opacity white `rgba(255,255,255,0.06)` to create "ghost" containers that feel light despite the dark theme.
- **Typography:** Primary text is off-white for high legibility with reduced eye strain; secondary text is a muted gray to maintain clear information hierarchy.

## Typography
The typography strategy pairings reflect a mix of technical precision and institutional strength.

- **Headlines:** Using **Manrope** (as a high-quality substitute for Bronova's presence) at heavy weights (700-800). It offers a geometric, modern, and engineering-forward feel. Headlines feature tight letter-spacing to appear more "designed" and impactful.
- **Body & Labels:** **Hanken Grotesk** (selected for its similarity to Gill Sans MT's clean humanist/geometric hybrid nature) provides excellent readability in technical contexts. Body text is set with generous line height (1.6) to ensure clarity in engineering documentation.
- **Labels:** Small labels use a semi-bold weight with increased letter spacing and uppercase styling to denote metadata or category markers.

## Layout & Spacing
This design system follows a **Fixed-Fluid Hybrid Grid**. Content is centered within a 1200px container on desktop, while margins and gutters adapt fluidly on smaller screens.

- **Grid:** A 12-column grid is used for desktop, collapsing to 6 columns for tablet and 2 columns for mobile.
- **Spacing Rhythm:** An 8px base unit (linear scaling) governs all padding and margins. 
- **Density:** The layout is "Airy/Executive." Large vertical margins (80px - 120px) separate major sections to emphasize a premium, non-cluttered experience.
- **Alignment:** Strict left-alignment for text blocks to maintain a structured, technical look.

## Elevation & Depth
In this dark-mode environment, depth is communicated through **Tonal Layering** and **Subtle Glassmorphism** rather than heavy shadows.

- **Surfaces:** The base background is the darkest layer. Cards and containers use a slightly lighter fill (`#0d1420`).
- **Glow Effects:** High-importance elements may use a very soft, large-radius outer glow in Primary Blue or Accent Gold (opacity < 10%) to simulate the "radiance" of solar energy.
- **Borders:** Containers are defined by thin `1px` borders in `rgba(255,255,255,0.06)`. This "Low-Contrast Outline" approach keeps the UI looking sharp and technical.
- **Backdrop Blur:** Modals and navigation bars use a 12px backdrop blur with a semi-transparent dark fill to maintain context while focusing user attention.

## Shapes
The shape language is **Soft (0.25rem)**. This subtle rounding maintains the rigid, serious feel of an engineering firm while providing just enough modern refinement to avoid looking dated or "brutalist."

- **Buttons & Inputs:** Use the standard `rounded` (4px) or `rounded-md` (6px) setting.
- **Cards:** Use `rounded-lg` (8px) for a slightly softer container feel.
- **Icons:** Use Lucide-style linear icons with a 1.5px or 2px stroke width. Icons should always be monochromatic (text-secondary) unless they are active.

## Components
- **Buttons:** 
  - *Primary:* Solid Primary Blue with White text. Sharp corners (4px).
  - *Secondary:* Ghost style with Primary Blue border and text.
  - *Accent:* Solid Gold with Deep Navy text (for highest priority CTAs).
- **Inputs:** Dark background (`#0a0f1a`), 1px subtle border. On focus, the border transitions to Primary Blue with a very faint outer glow.
- **Cards:** No shadow. Instead, use the 1px border (`rgba(255,255,255,0.06)`) and a background of `#0d1420`.
- **Chips/Badges:** Small, uppercase text. Use `accent-gold-muted` background with gold text for status indicators.
- **Lists:** Clean rows separated by the institutional divider. No bullets; use thin horizontal lines to create a ledger-like technical feel.
- **Progress Bars:** For solar metrics, use thin (4px) bars with a Primary Blue fill and a subtle glow.