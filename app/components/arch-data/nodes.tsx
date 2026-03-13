"use client";

import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import type { ArchNodeData } from "./types";

/* ── Standard Pipeline Node ── */

function ArchNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-lg bg-zinc-900/95 border border-zinc-700 text-[10px] text-zinc-300 max-w-[240px] z-50 shadow-xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="font-semibold text-zinc-100 mb-0.5">{data.label}</div>
        <div className="leading-relaxed">{data.tooltip}</div>
        {data.badge && (
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold ${
              data.badge === "production"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {data.badge === "production" ? "\u26A1 Production" : "\uD83D\uDCD0 Architecture"}
          </span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-700" />
      </div>

      {/* Badge pill */}
      {data.badge && (
        <div
          className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[7px] font-bold z-10 ${
            data.badge === "production"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}
        >
          {data.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
        </div>
      )}

      {/* Node body */}
      <div
        className={`relative px-4 py-3 rounded-xl border text-center min-w-[180px] max-w-[260px] transition-shadow hover:shadow-md ${
          data.dashed ? "border-dashed" : ""
        } ${data.glow ? "shadow-lg shadow-purple-500/20" : ""}`}
        style={{
          backgroundColor: `${data.color}10`,
          borderColor: `${data.color}40`,
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-zinc-700 !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-xs font-semibold text-zinc-100 mb-0.5">
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-[10px] text-zinc-500 leading-tight">
            {data.sublabel}
          </div>
        )}
        {data.items && (
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {data.items.map((item) => (
              <span
                key={item}
                className="px-1.5 py-0.5 rounded text-[9px] font-[family-name:var(--font-jetbrains)]"
                style={{
                  backgroundColor: `${data.color}15`,
                  color: `${data.color}cc`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-zinc-700 !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

/* ── Wide Node (OneLake, full-width elements) ── */

function WideNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-lg bg-zinc-900/95 border border-zinc-700 text-[10px] text-zinc-300 max-w-[280px] z-50 shadow-xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="leading-relaxed">{data.tooltip}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-700" />
      </div>

      <div
        className={`relative px-6 py-4 rounded-xl border text-center transition-shadow hover:shadow-md ${
          data.glow ? "shadow-lg shadow-purple-500/25" : ""
        }`}
        style={{
          backgroundColor: `${data.color}10`,
          borderColor: `${data.color}50`,
          minWidth: "500px",
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-zinc-700 !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-sm font-bold text-zinc-100">{data.label}</div>
        {data.sublabel && (
          <div className="text-[10px] text-zinc-400 mt-1">{data.sublabel}</div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-zinc-700 !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

export const nodeTypes = { arch: ArchNode, wide: WideNode };
