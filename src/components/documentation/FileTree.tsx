import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface FileTreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
  comment?: string;
  active?: boolean;
}

interface FileTreeItemProps {
  node: FileTreeNode;
  depth?: number;
  onSelect?: (node: FileTreeNode) => void;
  selectedId?: string;
}

function FileTreeItem({
  node,
  depth = 0,
  onSelect,
  selectedId,
}: FileTreeItemProps): ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";
  const isSelected = selectedId === node.id || node.active;

  return (
    <div className="font-mono text-xs">
      <button
        type="button"
        onClick={() => {
          if (isFolder) {
            setIsOpen((prev) => !prev);
          }
          if (onSelect) {
            onSelect(node);
          }
        }}
        style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
        className={cn(
          "w-full text-left py-1.5 pr-3 flex items-center justify-between gap-3 border-l-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
          isSelected
            ? "border-accent text-ink bg-accent/10 font-semibold"
            : "border-transparent text-muted-foreground hover:text-ink hover:bg-canvas/60",
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <span aria-hidden="true" className="text-accent font-bold">
            {isFolder ? (isOpen ? "📂" : "📁") : "📄"}
          </span>
          <span className="truncate">{node.name}</span>
        </div>

        {node.comment ? (
          <span className="text-[0.6875rem] text-muted-foreground/80 truncate border-l border-border/40 pl-2">
            // {node.comment}
          </span>
        ) : null}
      </button>

      {isFolder && isOpen && node.children && node.children.length > 0 ? (
        <div className="border-l border-border/40 ml-3">
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface FileTreeProps {
  data: FileTreeNode[];
  title?: string;
  className?: string;
}

export function FileTree({ data, title, className }: FileTreeProps): ReactElement {
  const [selectedNode, setSelectedNode] = useState<FileTreeNode | null>(null);

  return (
    <div
      className={cn(
        "border border-border bg-paper rounded-panel overflow-hidden shadow-sm",
        className,
      )}
    >
      <div className="border-b border-border bg-canvas/80 px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
          {title || "Project Structure"}
        </span>
        <span className="font-mono text-[0.625rem] text-muted-foreground uppercase font-semibold">
          Directory Tree
        </span>
      </div>

      <div className="py-2 overflow-x-auto max-h-96">
        {data.map((node) => (
          <FileTreeItem
            key={node.id}
            node={node}
            onSelect={setSelectedNode}
            selectedId={selectedNode?.id}
          />
        ))}
      </div>
    </div>
  );
}
