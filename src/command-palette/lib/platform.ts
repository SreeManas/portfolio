export type VisitorPlatform = "macos" | "windows" | "linux";

export function getVisitorPlatform(): VisitorPlatform {
  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("mac os")
  ) {
    return "macos";
  }

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }

  return "linux";
}

export function getModifierKey(platform = getVisitorPlatform()): string {
  return platform === "macos" ? "⌘" : "Ctrl";
}

export function formatPlatformShortcut(
  shortcutTemplate: string,
  platform = getVisitorPlatform(),
): string {
  return shortcutTemplate.replace("{modifier}", getModifierKey(platform));
}
