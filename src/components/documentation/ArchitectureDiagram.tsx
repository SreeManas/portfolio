import { useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  category?: "client" | "service" | "database" | "cache" | "ai" | "gateway";
  description?: string;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
  type?: "sync" | "async" | "bidirectional";
}

export interface ArchitectureGroup {
  id: string;
  label: string;
  nodeIds: string[];
}

export interface ArchitectureDiagramData {
  title?: string;
  description?: string;
  groups?: ArchitectureGroup[];
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

interface ArchitectureDiagramProps {
  data: ArchitectureDiagramData;
  className?: string;
}

function getNodeCategoryBadge(category?: ArchitectureNode["category"]): string {
  switch (category) {
    case "client":
      return "border-blue-600/30 text-blue-700 bg-blue-500/10";
    case "service":
      return "border-emerald-600/30 text-emerald-700 bg-emerald-500/10";
    case "database":
      return "border-amber-600/30 text-amber-700 bg-amber-500/10";
    case "cache":
      return "border-purple-600/30 text-purple-700 bg-purple-500/10";
    case "ai":
      return "border-accent/40 text-accent bg-accent/10";
    case "gateway":
      return "border-pink-600/30 text-pink-700 bg-pink-500/10";
    default:
      return "border-border text-muted-foreground bg-canvas";
  }
}

export function ArchitectureDiagram({ data, className }: ArchitectureDiagramProps): ReactElement {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(data.nodes[0]?.id ?? null);
  const selectedNode = data.nodes.find((n) => n.id === selectedNodeId);

  return (
    <figure
      aria-label={data.title || "System Architecture Diagram"}
      className={cn("border border-border bg-paper p-6 md:p-8 rounded-panel shadow-sm", className)}
    >
      {data.title ? (
        <figcaption className="border-b border-border pb-5 mb-6">
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
            Architecture Map
          </span>
          <h3 className="mt-2.5 text-xl font-semibold text-ink">{data.title}</h3>
          {data.description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{data.description}</p>
          ) : null}
        </figcaption>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        {/* Visual Diagram View */}
        <div className="space-y-6">
          {data.groups && data.groups.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {data.groups.map((group) => {
                const groupNodes = data.nodes.filter((node) => group.nodeIds.includes(node.id));
                return (
                  <div
                    key={group.id}
                    className="border border-border/80 bg-canvas/60 p-5 rounded-control"
                  >
                    <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </span>
                    <div className="mt-3.5 grid gap-3">
                      {groupNodes.map((node) => {
                        const isSelected = node.id === selectedNodeId;
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            className={cn(
                              "w-full text-left p-3.5 border transition-all duration-200 rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                              isSelected
                                ? "border-accent bg-accent/5 shadow-sm"
                                : "border-border bg-paper hover:border-accent/40",
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-sm text-ink">{node.label}</span>
                              {node.category ? (
                                <span
                                  className={cn(
                                    "font-mono text-[0.625rem] font-semibold uppercase tracking-wider px-1.5 py-0.5 border rounded-none",
                                    getNodeCategoryBadge(node.category),
                                  )}
                                >
                                  {node.category}
                                </span>
                              ) : null}
                            </div>
                            {node.sublabel ? (
                              <p className="mt-1 font-mono text-xs text-muted-foreground">
                                {node.sublabel}
                              </p>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={cn(
                      "w-full text-left p-4 border transition-all duration-200 rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                      isSelected
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-border bg-paper hover:border-accent/40",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-ink">{node.label}</span>
                      {node.category ? (
                        <span
                          className={cn(
                            "font-mono text-[0.625rem] font-semibold uppercase tracking-wider px-1.5 py-0.5 border rounded-none",
                            getNodeCategoryBadge(node.category),
                          )}
                        >
                          {node.category}
                        </span>
                      ) : null}
                    </div>
                    {node.sublabel ? (
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {node.sublabel}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}

          {/* Connections List / Flow Map */}
          {data.connections.length > 0 ? (
            <div className="border-t border-border pt-4">
              <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Data Connections & Communications
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.connections.map((conn, idx) => {
                  const fromNode = data.nodes.find((n) => n.id === conn.from);
                  const toNode = data.nodes.find((n) => n.id === conn.to);
                  const isRelated =
                    selectedNodeId === conn.from || selectedNodeId === conn.to;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs rounded-control transition-colors",
                        isRelated
                          ? "border-accent text-accent bg-accent/5 font-medium"
                          : "border-border text-muted-foreground bg-canvas/40",
                      )}
                    >
                      <span>{fromNode?.label || conn.from}</span>
                      <span className="text-accent font-bold">
                        {conn.type === "bidirectional" ? "↔" : "→"}
                      </span>
                      <span>{toNode?.label || conn.to}</span>
                      {conn.label ? (
                        <span className="text-[0.6875rem] text-muted-foreground border-l border-border pl-2">
                          {conn.label}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Detail Inspector Sidebar */}
        <aside
          aria-label="Node Inspector"
          className="border border-border bg-canvas/60 p-5 rounded-control flex flex-col justify-between"
        >
          {selectedNode ? (
            <div>
              <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
                Component Inspector
              </span>
              <h4 className="mt-3 text-lg font-semibold text-ink">{selectedNode.label}</h4>
              {selectedNode.sublabel ? (
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  {selectedNode.sublabel}
                </p>
              ) : null}

              {selectedNode.description ? (
                <p className="mt-4 text-xs leading-6 text-ink border-t border-border pt-3">
                  {selectedNode.description}
                </p>
              ) : (
                <p className="mt-4 text-xs text-muted-foreground italic border-t border-border pt-3">
                  Select architectural nodes to inspect system specifications and roles.
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Click a component node to view details.
            </p>
          )}

          <div className="mt-6 border-t border-border pt-3 font-mono text-[0.625rem] text-muted-foreground uppercase">
            Click nodes to highlight communication paths
          </div>
        </aside>
      </div>
    </figure>
  );
}
