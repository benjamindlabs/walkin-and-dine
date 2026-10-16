# Client Asset Inventory & Media Register

This register inventories all existing assets in the workspace before requesting new ones, per `blueprint/IMAGES.md` and `blueprint/WORKFLOW.md`.

---

## 1. Baseline Workspace Asset Audit

| File Path | Format | Size | Dimensions | Role / Subject | Quality / Usability Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `src/app/favicon.ico` | ICO | 15.0 KB | 32x32 | Next.js default favicon | Framework placeholder; replace with restaurant brand mark when available. |
| `public/file.svg` | SVG | 391 B | Vector | Utility document icon | Framework starter asset; not for restaurant production use. |
| `public/globe.svg` | SVG | 1.0 KB | Vector | Utility globe icon | Framework starter asset; not for restaurant production use. |
| `public/next.svg` | SVG | 1.3 KB | Vector | Next.js logomark | Framework starter asset; not for restaurant production use. |
| `public/vercel.svg` | SVG | 128 B | Vector | Vercel triangle logomark | Framework starter asset; not for restaurant production use. |
| `public/window.svg` | SVG | 385 B | Vector | Utility window icon | Framework starter asset; not for restaurant production use. |

**Audit Result**: **0 client-supplied assets currently exist in the repository.** No restaurant photography, food shots, exterior/interior imagery, menus, or vector brand marks have been provided yet.

---

## 2. Ingestion Register (Populate as Assets Arrive)

Place untouched original files into [`client/assets/raw/`](file:///c:/Users/USER/Desktop/Walkin-website/client/assets/raw) and logos into [`client/assets/brand/`](file:///c:/Users/USER/Desktop/Walkin-website/client/assets/brand). 

| File Name | Format | Dimensions | Aspect Ratio | File Size | Subject / Suggested Placement | Contrast & Crop Notes | License / Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `public/images/hero.jpg` | JPG | 1792x1024 | 16:9 | 790 KB | Candlelit dining room • Hero Section | Deep shadows; high contrast text over dark gradient overlay | Engine Prototype Asset • Replace upon client delivery |
| `public/images/dish.jpg` | JPG | 1408x1056 | 4:3 | 776 KB | Signature dry-aged duck breast • Offerings Feature | Dark slate plate, warm side lighting; excellent focal sharpness | Engine Prototype Asset • Replace upon client delivery |
| `public/images/cocktail.jpg` | JPG | 1024x1365 | 3:4 | 780 KB | Artisanal amber cocktail in crystal coupe • Atmosphere Gallery | Backlit warm amber tones; vertical crop ideal for mobile reflow | Engine Prototype Asset • Replace upon client delivery |
| `public/images/hearth.jpg` | JPG | 1792x1024 | 16:9 | 852 KB | Open brick hearth & chef with cast iron • Philosophy Section | Warm embers, glowing firelight; tactile culinary atmosphere | Engine Prototype Asset • Replace upon client delivery |

---

## 3. Minimum Asset Requirements for Restaurant Launch

To produce a bespoke, Capiche-inspired restaurant experience without relying on generic placeholders:

1. **Hero Anchor Photo**:
   - Ideal: Full-width atmospheric dining room, architectural view, or signature plating.
   - Recommended resolution: $\ge 2400 \times 1600\text{px}$ (landscape, $3:2$ or $16:9$).
   - Focal point: Needs clear breathing room for typography and navigation.
2. **Atmosphere / Interior Gallery (3–5 assets)**:
   - Mix of wide environmental shots, medium dining details (table settings, bar, kitchen pass), and vertical crops for mobile reflow.
   - Minimum resolution: $\ge 1600 \times 1200\text{px}$.
3. **Signature Dishes / Offerings (2–4 assets)**:
   - Plated dishes matching verified items in `client/facts.md`.
   - Sharp detail, natural lighting, consistent color temperature.
4. **Brand Mark / Logo**:
   - Vector SVG preferred (monochrome dark and light variants) or high-res transparent PNG.
