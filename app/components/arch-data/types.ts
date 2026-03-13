import { type Node, type Edge } from "@xyflow/react";

/* ── Shared Types ── */

export interface ArchNodeData {
  label: string;
  sublabel?: string;
  color: string;
  items?: string[];
  tooltip: string;
  badge?: "production" | "architecture";
  glow?: boolean;
  dashed?: boolean;
  [key: string]: unknown;
}

export interface WalkthroughSection {
  title: string;
  text: string;
}

export interface ArchitectureDiagram {
  id: string;
  tabLabel: string;
  oneLiner: string;
  nodes: Node<ArchNodeData>[];
  edges: Edge[];
  walkthrough: {
    intro: string;
    sections: WalkthroughSection[];
    decisions?: string[];
  };
}

/* ── Color Palette ── */

export const C = {
  cyan: "#2997FF",
  indigo: "#0071E3",
  purple: "#BF5AF2",
  gray: "#86868B",
  bronze: "#cd7f32",
  silver: "#86868B",
  gold: "#FF9F0A",
  teal: "#5AC8FA",
  green: "#30D158",
  amber: "#FF9F0A",
  red: "#FF375F",
  blue: "#2997FF",
};

/* ── Node Helper ── */

export function nd(
  id: string,
  x: number,
  y: number,
  label: string,
  color: string,
  tooltip: string,
  opts?: Partial<ArchNodeData> & { type?: string }
): Node<ArchNodeData> {
  const { type, ...dataOpts } = opts || {};
  return {
    id,
    type: type || "arch",
    position: { x, y },
    data: { label, color, tooltip, ...dataOpts },
  };
}

/* ── Edge Helpers ── */

export function batch(
  id: string,
  source: string,
  target: string,
  opts?: Partial<Edge>
): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    style: { stroke: C.indigo, strokeWidth: 2 },
    ...opts,
  };
}

export function stream(
  id: string,
  source: string,
  target: string,
  opts?: Partial<Edge>
): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    style: { stroke: C.cyan, strokeWidth: 2, strokeDasharray: "5 5" },
    ...opts,
  };
}

export function govern(
  id: string,
  source: string,
  target: string,
  opts?: Partial<Edge>
): Edge {
  return {
    id,
    source,
    target,
    style: { stroke: C.amber, strokeWidth: 1.5, strokeDasharray: "8 4" },
    ...opts,
  };
}
