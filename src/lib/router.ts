import { useEffect, useState } from "react";

const NAV_EVT = "portfolio-navigate";
const scrollMap = new Map<string, number>();

const norm = (p: string) => (!p || p === "/" ? "/" : p.replace(/\/$/, ""));

function scrollToTarget(hash?: string) {
  const el = hash ? document.getElementById(hash.replace(/^#/, "")) : null;
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, left: 0 });
}

export interface LocationState { path: string; hash: string; search: string }
export interface NavigateOptions { replace?: boolean }

/** Reads and returns the current normalized location state. */
export function getCurrentLocation(): LocationState {
  return { path: norm(window.location.pathname), hash: window.location.hash, search: window.location.search };
}

/** Programmatically navigates to a relative path or external URL. */
export function navigateTo(href: string, opts: NavigateOptions = {}): void {
  if (!href) return;
  if (/^(https?:\/\/|mailto:|tel:)/.test(href)) { window.location.href = href; return; }

  const curr = getCurrentLocation();
  const target = new URL(href, window.location.origin);
  const targetPath = norm(target.pathname);

  scrollMap.set(curr.path + curr.search, window.scrollY);
  if (opts.replace) window.history.replaceState(null, "", href);
  else window.history.pushState(null, "", href);
  window.dispatchEvent(new CustomEvent(NAV_EVT, { detail: { isPop: false } }));

  if (targetPath === curr.path) scrollToTarget(target.hash);
  else requestAnimationFrame(() => scrollToTarget(target.hash));
}

/** React hook returning active LocationState and handling popstate scroll restoration. */
export function useLocation(): LocationState {
  const [loc, setLoc] = useState(getCurrentLocation);

  useEffect(() => {
    const handle = (e?: Event) => {
      const isPop = (e as CustomEvent<{ isPop?: boolean }> | undefined)?.detail?.isPop ?? true;
      const next = getCurrentLocation();
      setLoc(next);
      if (isPop && !next.hash) {
        const y = scrollMap.get(next.path + next.search);
        requestAnimationFrame(() => window.scrollTo({ top: typeof y === "number" ? y : 0, left: 0 }));
      }
    };
    const onPop = () => handle();
    window.addEventListener("popstate", onPop);
    window.addEventListener(NAV_EVT, handle);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener(NAV_EVT, handle);
    };
  }, []);

  return loc;
}

/** Intercepts internal link clicks for single-page application navigation. */
export function useLinkInterception(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      const href = a?.getAttribute("href");
      if (a && href && (href.startsWith("/") || href.startsWith("#")) && a.target !== "_blank" && !a.hasAttribute("download")) {
        e.preventDefault();
        navigateTo(href);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
