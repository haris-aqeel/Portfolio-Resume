"use client";

import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import type { ArchNodeData } from "./types";

function LogoIcon({ slug, color, size = 28 }: { slug: string; color?: string; size?: number }) {
  const c = color || "ffffff";
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${c}`}
      alt=""
      width={size}
      height={size}
      className="inline-block"
      loading="lazy"
    />
  );
}

/* ── Standard Pipeline Node ── */

function ArchNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-xl bg-[#292929] border border-white/[0.08] text-[10px] text-[#9AA0A6] max-w-[240px] z-50 shadow-2xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="font-semibold text-white mb-0.5">{data.label}</div>
        <div className="leading-relaxed">{data.tooltip}</div>
        {data.badge && (
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold ${
              data.badge === "production"
                ? "bg-[#FFA000]/15 text-[#FFA000]"
                : "bg-[#4285F4]/15 text-[#4285F4]"
            }`}
          >
            {data.badge === "production" ? "\u26A1 Production" : "\uD83D\uDCD0 Architecture"}
          </span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#292929]" />
      </div>

      {/* Badge pill */}
      {data.badge && (
        <div
          className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[7px] font-bold z-10 ${
            data.badge === "production"
              ? "bg-[#FFA000]/15 text-[#FFA000] border border-[#FFA000]/20"
              : "bg-[#4285F4]/15 text-[#4285F4] border border-[#4285F4]/20"
          }`}
        >
          {data.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
        </div>
      )}

      {/* Node body */}
      <div
        className={`relative px-4 py-3.5 rounded-2xl border text-center min-w-[180px] max-w-[260px] transition-all duration-300 hover:shadow-lg ${
          data.dashed ? "border-dashed" : ""
        } ${data.glow ? "shadow-lg shadow-[#AB47BC]/20" : ""}`}
        style={{
          backgroundColor: `${data.color}0D`,
          borderColor: `${data.color}25`,
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-[#6B6B6F] !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        {data.logo && (
          <div className="mb-2 flex justify-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${data.color}15` }}
            >
              <LogoIcon slug={data.logo} color={data.logoColor} size={22} />
            </div>
          </div>
        )}

        <div className="text-xs font-semibold text-white mb-0.5">
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-[10px] text-[#9AA0A6] leading-tight">
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

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-[#6B6B6F] !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

/* ── Wide Node (OneLake, full-width elements) ── */

function WideNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-xl bg-[#292929] border border-white/[0.08] text-[10px] text-[#9AA0A6] max-w-[280px] z-50 shadow-2xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="leading-relaxed">{data.tooltip}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#292929]" />
      </div>

      <div
        className={`relative px-6 py-4 rounded-2xl border text-center transition-all duration-300 hover:shadow-lg ${
          data.glow ? "shadow-lg shadow-[#AB47BC]/20" : ""
        }`}
        style={{
          backgroundColor: `${data.color}0D`,
          borderColor: `${data.color}30`,
          minWidth: "500px",
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-[#6B6B6F] !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        {data.logo && (
          <div className="mb-2 flex justify-center">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${data.color}15` }}
            >
              <LogoIcon slug={data.logo} color={data.logoColor} size={26} />
            </div>
          </div>
        )}

        <div className="text-sm font-bold text-white">{data.label}</div>
        {data.sublabel && (
          <div className="text-[10px] text-[#9AA0A6] mt-1">{data.sublabel}</div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-[#6B6B6F] !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

export const nodeTypes = { arch: ArchNode, wide: WideNode };
