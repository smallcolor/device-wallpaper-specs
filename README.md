# 2026–2027 Device Wallpaper Specs & Safe-Zone SVG Templates

An open reference dataset, Figma-ready safe-zone SVG template pack, and zero-dependency crop-fit checker for modern phones, foldables, tablets, and 5K/6K desktop displays — maintained by **[InCosmos Art](https://incosmos.art)**.

Standard `9:16` wallpapers often clip or blur when stretched across wide inner foldable panels (`2670×1878`, `2448×1848`), tall `9:21` cover screens, or `1:1.11` FlexWindows. This repository provides exact native pixel dimensions, aspect ratios, UI safe zones, and a deterministic fit calculator.

---

## Quick Reference: 2026–2027 Screen Resolutions

| Device | Screen | Native Resolution | Orientation | Aspect Ratio | Curated Gallery |
|---|---|---|---|---|---|
| **iPhone Duo** | Inner Foldable (7.8") | `2670 × 1878` | Landscape | `1.42:1` | [iPhone Duo Wallpapers](https://incosmos.art/collections/iphone-duo-wallpapers) · [Guide](https://incosmos.art/pages/iphone-duo) |
| **iPhone Duo** | Outer Cover (5.5") | `1398 × 2034` | Portrait | `1:1.45` | [iPhone Duo Wallpapers](https://incosmos.art/collections/iphone-duo-wallpapers) |
| **iPhone 18 Pro Max** | Super Retina XDR (6.9") | `1320 × 2868` | Portrait | `9:19.5` | [iPhone 18 Wallpapers](https://incosmos.art/collections/iphone-18-wallpapers) · [Guide](https://incosmos.art/pages/iphone-18) |
| **iPhone 18 Pro** | Super Retina XDR (6.3") | `1206 × 2622` | Portrait | `9:19.5` | [iPhone 18 Wallpapers](https://incosmos.art/collections/iphone-18-wallpapers) |
| **Galaxy Z Fold8** | Main Wide Display (7.6") | `2448 × 1848` | Landscape | `4:3` | [Galaxy Z Fold8 Wallpapers](https://incosmos.art/collections/galaxy-z-fold8-wallpapers) · [Guide](https://incosmos.art/pages/galaxy-z-fold8) |
| **Galaxy Z Fold8** | Cover Display (5.5") | `1248 × 1972` | Portrait | `10:16` | [Galaxy Z Fold8 Wallpapers](https://incosmos.art/collections/galaxy-z-fold8-wallpapers) |
| **Galaxy Z Fold8 Ultra** | Main Display (8.0") | `2504 × 2256` | Landscape | `1.11:1` | [Galaxy Z Flip8 & Fold8 Ultra](https://incosmos.art/collections/galaxy-z-flip8-wallpapers) |
| **Galaxy Z Flip8** | Main Display (6.9") | `1080 × 2520` | Portrait | `9:21` | [Galaxy Z Flip8 Wallpapers](https://incosmos.art/collections/galaxy-z-flip8-wallpapers) · [Guide](https://incosmos.art/pages/galaxy-z-flip8) |
| **Galaxy Z Flip8** | FlexWindow Cover (4.1") | `948 × 1048` | Portrait | `1:1.11` | [Galaxy Z Flip8 Wallpapers](https://incosmos.art/collections/galaxy-z-flip8-wallpapers) |
| **iPad Pro 13"** | Ultra Retina XDR | `2752 × 2064` | Landscape | `4:3` | [iPad Wallpapers](https://incosmos.art/collections/ipad-wallpapers) |
| **iPad Pro 11"** | Ultra Retina XDR | `2420 × 1668` | Landscape | `1.45:1` | [iPad Wallpapers](https://incosmos.art/collections/ipad-wallpapers) |
| **MacBook Pro 16"** | Liquid Retina XDR | `3456 × 2234` | Landscape | `1.55:1` | [Mac 5K Wallpapers](https://incosmos.art/collections/mac-wallpapers) |
| **MacBook Pro 14"** | Liquid Retina XDR | `3024 × 1964` | Landscape | `1.54:1` | [Mac 5K Wallpapers](https://incosmos.art/collections/mac-wallpapers) |
| **Apple Studio Display** | 5K Retina (27") | `5120 × 2880` | Landscape | `16:9` | [Mac 5K Wallpapers](https://incosmos.art/collections/mac-wallpapers) |
| **Pro Display XDR** | 6K Retina (32") | `6016 × 3384` | Landscape | `16:9` | [Mac 5K Wallpapers](https://incosmos.art/collections/mac-wallpapers) |
| **4K UHD Desktop** | Standard 16:9 Monitor | `3840 × 2160` | Landscape | `16:9` | [Mac 5K Wallpapers](https://incosmos.art/collections/mac-wallpapers) |

Machine-readable datasets:
- [`data/devices-2026-2027.json`](./data/devices-2026-2027.json)
- [`data/devices-2026-2027.csv`](./data/devices-2026-2027.csv)

---

## Safe-Zone SVG Templates (Figma / Illustrator Ready)

Drop any of the vector overlays in [`templates/`](./templates) directly onto your artboard to preview lock-screen clocks, Dynamic Island, fold hinge seams, FlexWindow camera cutouts, and macOS menu bars:

- [`templates/iphone-duo-inner-2670x1878.svg`](./templates/iphone-duo-inner-2670x1878.svg)
- [`templates/iphone-duo-outer-1398x2034.svg`](./templates/iphone-duo-outer-1398x2034.svg)
- [`templates/iphone-18-pro-max-1320x2868.svg`](./templates/iphone-18-pro-max-1320x2868.svg)
- [`templates/galaxy-z-fold8-main-2448x1848.svg`](./templates/galaxy-z-fold8-main-2448x1848.svg)
- [`templates/galaxy-z-flip8-cover-948x1048.svg`](./templates/galaxy-z-flip8-cover-948x1048.svg)
- [`templates/mac-5k-studio-display-5120x2880.svg`](./templates/mac-5k-studio-display-5120x2880.svg)

---

## Crop-Fit Checker CLI (`check-fit.mjs`)

Requires Node.js 18+ (zero external dependencies):

```bash
node scripts/check-fit.mjs --width 2670 --height 1878
node scripts/check-fit.mjs --width 5120 --height 2880 --json
```

Classification thresholds:
- `exact_fit`: `<= 10%` aspect-ratio crop loss and native pixel coverage (`imgW >= scrW && imgH >= scrH`)
- `compatible`: `<= 22%` aspect-ratio crop loss and native pixel coverage
- `mismatch`: exceeds 22% crop or requires upscaling

Run tests:

```bash
node --test
```

---

## Free Artist-Made Wallpapers & Companion App

Looking for uncompressed 4K–10K master artworks calibrated for these exact displays?
- **[12 Free Artist-Made Wallpapers](https://incosmos.art/collections/free)** — instant free digital downloads
- **[InCosmos Art Wallpaper Magazine](https://incosmos.art)** — curated editions for iPhone, iPad, Mac & foldables
- **[InCosmos Art App](https://app.incosmos.art/)** — iOS & Android companion app ([App Store](https://apps.apple.com/us/app/incosmos-art-wallpapers/id6753931849?pt=128109455&ct=github-device-specs&mt=8) · [Google Play](https://play.google.com/store/apps/details?id=art.incosmos.wallpaper&referrer=utm_source%3Dgithub%26utm_medium%3Dreferral%26utm_campaign%3Ddevice_specs))

---

## License

- Code (`scripts/`, `test/`) and SVG templates (`templates/`): **MIT License** (see [`LICENSE`](./LICENSE)).
- Resolution dataset (`data/devices-2026-2027.*`): **CC BY 4.0** — free to share and adapt with attribution to [InCosmos Art](https://incosmos.art).
