"use client";

import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import type { ArchNodeData } from "./types";

/* Standard Pipeline Node */

function ArchNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-lg bg-slate-900/95 border border-slate-600 text-[10px] text-slate-300 max-w-[240px] z-50 shadow-xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="font-semibold text-slate-100 mb-0.5">{data.label}</div>
        <div className="leading-relaxed">{data.tooltip}</div>
        {data.badge && (
          <span
            className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold ${
              data.badge === "production"
                ? "bg-primary/20 text-primary"
                : "bg-sky-500/20 text-sky-400"
            }`}
          >
            {data.badge === "production" ? "Production" : "Architecture"}
          </span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-600" />
      </div>

      {/* Badge pill */}
      {data.badge && (
        <div
          className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded text-[7px] font-bold z-10 ${
            data.badge === "production"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-sky-500/20 text-sky-400 border border-sky-500/30"
          }`}
        >
          {data.badge === "production" ? "Prod" : "Arch"}
        </div>
      )}

      {/* Node body */}
      <div
        className={`relative px-4 py-3 rounded-xl border text-center min-w-[180px] max-w-[260px] transition-shadow hover:shadow-md ${
          data.dashed ? "border-dashed" : ""
        } ${data.glow ? "shadow-lg shadow-primary/20" : ""}`}
        style={{
          backgroundColor: `${data.color}10`,
          borderColor: `${data.color}40`,
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-slate-600 !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-xs font-semibold text-slate-100 mb-0.5">
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-[10px] text-slate-500 leading-tight">
            {data.sublabel}
          </div>
        )}
        {data.items && (
          <div className="flex flex-wrap gap-1 mt-2 justify-center">
            {data.items.map((item) => (
              <span
                key={item}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono"
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

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-600 !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

/* Wide Node (OneLake, full-width elements) */

function WideNode({ data }: NodeProps<Node<ArchNodeData>>) {
  return (
    <div className="group/node relative">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-lg bg-slate-900/95 border border-slate-600 text-[10px] text-slate-300 max-w-[280px] z-50 shadow-xl pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
        <div className="leading-relaxed">{data.tooltip}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-600" />
      </div>

      <div
        className={`relative px-6 py-4 rounded-xl border text-center transition-shadow hover:shadow-md ${
          data.glow ? "shadow-lg shadow-primary/25" : ""
        }`}
        style={{
          backgroundColor: `${data.color}10`,
          borderColor: `${data.color}50`,
          minWidth: "500px",
        }}
      >
        <Handle type="target" position={Position.Top} id="top" className="!bg-slate-600 !w-2 !h-2 !border-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !w-1 !h-1 !border-0" />
        <Handle type="target" position={Position.Right} id="right" className="!bg-transparent !w-1 !h-1 !border-0" />

        <div className="text-sm font-bold text-slate-100">{data.label}</div>
        {data.sublabel && (
          <div className="text-[10px] text-slate-400 mt-1">{data.sublabel}</div>
        )}

        <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-600 !w-2 !h-2 !border-0" />
        <Handle type="source" position={Position.Right} id="right-out" className="!bg-transparent !w-1 !h-1 !border-0" />
      </div>
    </div>
  );
}

export const nodeTypes = { arch: ArchNode, wide: WideNode };
