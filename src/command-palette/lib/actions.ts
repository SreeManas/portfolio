import type { CommandAction } from "@/command-palette/types";

interface ExecuteCommandActionOptions {
  onSuccess: (message: string) => void;
}

function scrollToSection(targetId: string): void {
  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openInNewTab(href: string): void {
  window.open(href, "_blank", "noopener,noreferrer");
}

function downloadFile(href: string, filename?: string): void {
  const link = document.createElement("a");
  link.href = href;

  if (filename) {
    link.download = filename;
  }

  document.body.append(link);
  link.click();
  link.remove();
}

async function copyToClipboard(value: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export async function executeCommandAction(
  action: CommandAction,
  options: ExecuteCommandActionOptions,
): Promise<boolean> {
  if (action.type === "disabled") {
    return false;
  }

  if (action.type === "scroll") {
    scrollToSection(action.targetId);
    return true;
  }

  if (action.type === "open") {
    openInNewTab(action.href);
    return true;
  }

  if (action.type === "download") {
    downloadFile(action.href, action.filename);
    return true;
  }

  if (action.type === "mailto") {
    window.location.href = action.href;
    return true;
  }

  await copyToClipboard(action.value);
  options.onSuccess(action.successMessage);
  return true;
}
