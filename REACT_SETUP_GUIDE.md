# React, Tailwind CSS, TypeScript & shadcn UI Setup Guide

This guide provides step-by-step instructions on how to integrate the React `ExpandableGallery` and `Demo` components into a React codebase. Since the current active site is built on vanilla HTML, CSS, and JS (for speed, ease of deployment, and light weight), follow these steps to bootstrap and set up a modern React/Next.js codebase supporting shadcn UI, Tailwind, and TypeScript.

---

## 🚀 Step 1: Bootstrap a Modern Next.js Project

The easiest and most premium way to run shadcn UI components is within a Next.js App Router setup. 

Run the following command in your terminal:
```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app --src-dir --eslint --import-alias "@/*"
```
During the prompt, select the following options:
- **Would you like to use TypeScript?** Yes
- **Would you like to use ESLint?** Yes
- **Would you like to use Tailwind CSS?** Yes
- **Would you like to use `src/` directory?** Yes
- **Would you like to use App Router? (recommended)** Yes
- **Would you like to customize the default import alias (@/*)?** Yes (Press Enter for `@/*`)

---

## 🛠️ Step 2: Initialize shadcn UI via CLI

shadcn UI is not an NPM package; it is a design system generator that puts copy-pasteable primitives directly into your codebase.

Navigate into your project folder and run the shadcn initializer:
```bash
cd my-portfolio
npx shadcn@latest init
```
Select the following configuration settings:
- **Style**: Default
- **Base color**: Zinc (or Slate)
- **CSS variables for colors**: Yes
- **Where is your global CSS file?** `src/app/globals.css`
- **Do you want to use CSS variables for colors?** Yes
- **Where is your tailwind.config.js located?** `tailwind.config.js`
- **Configure the import alias for components:** `@/components`
- **Configure the import alias for utils:** `@/lib/utils`
- **Are you using React Server Components?** Yes

### 💡 Why is the `/components/ui/` directory important?
- **Separation of Concerns**: `/components/ui/` is shadcn's default installation path for atomic components (like `button.tsx`, `dialog.tsx`, `input.tsx`).
- **Automation**: By keeping these in a dedicated `/ui/` folder, the `npx shadcn add` CLI can automatically download, install, and update these primitives without altering or overwriting your custom page components (which you will keep under `/components/` or `/app/`).
- **Path Resolution**: Ensures that imports like `import { Button } from "@/components/ui/button"` resolve cleanly.

---

## 📦 Step 3: Install Core Dependencies

The `ExpandableGallery` component utilizes Framer Motion (`motion`), Hugeicons, and standard shadcn utilities. Install the required NPM packages by running:
```bash
npm install clsx motion tailwind-merge @hugeicons/react @radix-ui/react-slot class-variance-authority @hugeicons/core-free-icons
```

---

## 📂 Step 4: Add the Components

### 1. The shadcn Button Primitive
Generate shadcn's base button component:
```bash
npx shadcn@latest add button
```
This automatically creates the standard button file inside `src/components/ui/button.tsx`.

### 2. Copy the Gallery Components
Copy your newly created components into their respective folders:
- Move `expandable-gallery.tsx` into `src/components/ui/expandable-gallery.tsx`
- Move `demo.tsx` into `src/components/demo.tsx` (or `src/app/demo/page.tsx` to view it as a dedicated page!)

### 3. Create the `useOutsideClick` Hook
The gallery component imports `useOutsideClick` from `@/hooks/use-outside-click` to collapse the gallery when clicking outside the container. Create the file `src/hooks/use-outside-click.ts` and paste the following utility:
```typescript
import { useEffect, RefObject } from "react";

export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
```

---

## 🎨 Step 5: Match the Monochrome + Orange Theme

Ensure your Tailwind variables match our premium portfolio theme. Open `src/app/globals.css` and configure the theme values:
```css
@layer base {
  :root {
    --background: 240 10% 3.9%; /* #0A0A0A */
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%; /* #151515 */
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 24 100% 50%; /* #FF7A00 - Premium Orange */
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%; /* #A1A1AA - Light Grey */
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 15%; /* #2A2A2A - Soft Grey */
    --input: 240 5.9% 15%;
    --ring: 24 100% 50%; /* #FF7A00 - Accent Glow */
  }
}
```

---

## 🏃‍♂️ Step 6: Run the Server
Launch your Next.js local development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view your premium monochrome developer portfolio with the expandable shadcn component!
