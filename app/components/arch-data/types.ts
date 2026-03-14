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
  logo?: string;
  logoColor?: string;
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
  cyan: "#4285F4",
  indigo: "#4285F4",
  purple: "#AB47BC",
  gray: "#9AA0A6",
  bronze: "#FF7043",
  silver: "#9AA0A6",
  gold: "#FFA000",
  teal: "#4285F4",
  green: "#34A853",
  amber: "#FFA000",
  red: "#EA4335",
  blue: "#4285F4",
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
