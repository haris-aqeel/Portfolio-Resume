"use client";

import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import type { ArchNodeData } from "./types";

/* ── Standard Pipeline Node ── */

function ArchNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-xl bg-[#1D1D1F] border border-white/[0.06] text-[10px] text-[#86868B] max-w-[240px] z-50 shadow-2xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="font-semibold text-[#F5F5F7] mb-0.5">{data.label}</div>
        <div className="leading-relaxed">{data.tooltip}</div>
        {data.badge && (
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold ${
              data.badge === "production"
                ? "bg-[#FF9F0A]/15 text-[#FF9F0A]"
                : "bg-[#2997FF]/15 text-[#2997FF]"
            }`}
          >
            {data.badge === "production" ? "\u26A1 Production" : "\uD83D\uDCD0 Architecture"}
          </span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1D1D1F]" />
      </div>

      {/* Badge pill */}
      {data.badge && (
        <div
          className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[7px] font-bold z-10 ${
            data.badge === "production"
              ? "bg-[#FF9F0A]/15 text-[#FF9F0A] border border-[#FF9F0A]/20"
              : "bg-[#2997FF]/15 text-[#2997FF] border border-[#2997FF]/20"
          }`}
        >
          {data.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
        </div>
      )}

      {/* Node body */}
      <div
        className={`relative px-4 py-3 rounded-2xl border text-center min-w-[180px] max-w-[260px] transition-all duration-300 hover:shadow-lg ${
          data.dashed ? "border-dashed" : ""
        } ${data.glow ? "shadow-lg shadow-[#BF5AF2]/20" : ""}`}
        style={{
          backgroundColor: `${data.color}0D`,
          borderColor: `${data.color}25`,
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-[#48484A] !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-xs font-semibold text-[#F5F5F7] mb-0.5">
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-[10px] text-[#86868B] leading-tight">
            {data.sublabel}
          </div>
        )}
        {data.items && (
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {data.items.map((item) => (
              <span
                key={item}
                className="px-1.5 py-0.5 rounded-lg text-[9px] font-[family-name:var(--font-jetbrains)]"
                style={{
                  backgroundColor: `${data.color}12`,
                  color: `${data.color}cc`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-[#48484A] !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

/* ── Wide Node (OneLake, full-width elements) ── */

function WideNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-xl bg-[#1D1D1F] border border-white/[0.06] text-[10px] text-[#86868B] max-w-[280px] z-50 shadow-2xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="leading-relaxed">{data.tooltip}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1D1D1F]" />
      </div>

      <div
        className={`relative px-6 py-4 rounded-2xl border text-center transition-all duration-300 hover:shadow-lg ${
          data.glow ? "shadow-lg shadow-[#BF5AF2]/20" : ""
        }`}
        style={{
          backgroundColor: `${data.color}0D`,
          borderColor: `${data.color}30`,
          minWidth: "500px",
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-[#48484A] !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-sm font-bold text-[#F5F5F7]">{data.label}</div>
        {data.sublabel && (
          <div className="text-[10px] text-[#86868B] mt-1">{data.sublabel}</div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-[#48484A] !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

export const nodeTypes = { arch: ArchNode, wide: WideNode };
