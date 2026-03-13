import { type ArchitectureDiagram, C, nd, batch, govern } from "./types";

const X4 = [20, 250, 480, 710];
const XC = 270;

export const aiPlatform: ArchitectureDiagram = {
  id: "ai",
  tabLabel: "AI-Ready Platform",
  oneLiner:
    "Wiring the data platform so AI can actually use it \u2014 governance first, AI second.",
  nodes: [
    // Row 1 — Collapsed Medallion
    nd("ai-src", 50, 0, "Operational DBs + Files + APIs", C.cyan, "All operational data sources feeding the lakehouse"),
    nd("ai-med", 500, 0, "Medallion Lakehouse", C.purple, "Bronze/Silver/Gold layers producing clean, governed, business-ready data", {
      sublabel: "Bronze / Silver / Gold",
      glow: true,
    }),

    // Row 2 — Semantic Layer (wide)
    nd("ai-sem", 130, 160, "Power BI Semantic Model \u2014 Direct Lake", C.teal, "Curated semantic layer designed to be AI-readable, not just analyst-readable", {
      type: "wide",
      sublabel: "Column Descriptions \u00B7 Glossary Terms \u00B7 RLS/OLS \u00B7 Hidden Columns \u00B7 Grounding Text",
      badge: "architecture",
    }),

    // Row 3 — AI Consumption (4 paths)
    nd("ai-copilot", X4[0], 340, "Fabric Copilot", C.gold, "Natural language queries against the semantic model via NL2SQL", {
      sublabel: "NL2SQL on Semantic Model",
      badge: "architecture",
    }),
    nd("ai-agent", X4[1], 340, "Fabric Data Agent", C.gold, "Natural language queries directly on Warehouse and Lakehouse tables", {
      sublabel: "NL2SQL on Warehouse/Lakehouse",
      badge: "architecture",
    }),
    nd("ai-func", X4[2], 340, "AI Functions in Notebooks", C.gold, "LLM-powered Spark transformations: classify, extract, summarize OneLake data", {
      sublabel: "LLM transforms on OneLake",
      badge: "architecture",
    }),
    nd("ai-openai", X4[3], 340, "Azure OpenAI / Foundry", C.gold, "Custom models trained on Gold tables \u2014 inference results written back to Fabric", {
      sublabel: "Custom models on Gold tables",
      badge: "architecture",
    }),

    // Row 4 — AI Outputs Written Back
    nd("ai-out1", 120, 520, "Inference Results \u2192 Gold Layer", C.purple, "Model predictions and scores written back alongside historical actuals"),
    nd("ai-out2", 530, 520, "Enriched Text \u2192 Silver Layer", C.silver, "LLM-classified, entity-extracted, and summarized text columns"),

    // Row 5 — Consumption
    nd("ai-c1", 20, 680, "Power BI Reports", C.green, "Unified dashboards showing predictions alongside historical actuals"),
    nd("ai-c2", 300, 680, "Teams / Outlook Insights", C.green, "AI-generated insights embedded in everyday collaboration tools"),
    nd("ai-c3", 580, 680, "Custom Apps via REST", C.green, "Application endpoints consuming model predictions and enriched data"),

    // Governance (side panel)
    nd("ai-gov1", 850, 160, "Microsoft Purview", C.amber, "Lineage across data \u2192 model \u2192 prediction tracked end-to-end", {
      sublabel: "Lineage \u00B7 Sensitivity Labels \u00B7 DLP \u00B7 Data Catalog",
      dashed: true,
    }),
    nd("ai-gov2", 850, 340, "OneLake Security", C.amber, "Row-level, column-level, and ReadWrite access controls ensure AI only touches authorized data", {
      sublabel: "Row-Level \u00B7 Column-Level \u00B7 ReadWrite ACLs",
      dashed: true,
    }),
  ],
  edges: [
    // Sources → Medallion (horizontal)
    batch("aie1", "ai-src", "ai-med", { sourceHandle: "right", targetHandle: "left" }),
    // Medallion → Semantic
    batch("aie2", "ai-med", "ai-sem"),
    // Semantic → AI Consumption
    batch("aie3", "ai-sem", "ai-copilot"),
    batch("aie4", "ai-sem", "ai-agent"),
    batch("aie5", "ai-sem", "ai-func"),
    batch("aie6", "ai-sem", "ai-openai"),
    // AI → Outputs
    batch("aie7", "ai-func", "ai-out2"),
    batch("aie8", "ai-openai", "ai-out1"),
    // Outputs → Consumption
    batch("aie9", "ai-out1", "ai-c1"),
    batch("aie10", "ai-out1", "ai-c2"),
    batch("aie11", "ai-out2", "ai-c3"),
    // Governance
    govern("aie12", "ai-gov1", "ai-sem", { targetHandle: "right" }),
    govern("aie13", "ai-gov2", "ai-func", { targetHandle: "right" }),
  ],
  walkthrough: {
    intro:
      "The promise of AI in enterprise data is real, but it only works if the underlying data platform is trustworthy, governed, and semantically enriched. An AI-ready data architecture is not about adding AI on top of a broken pipeline \u2014 it\u2019s about building the foundation that makes AI reliable.",
    sections: [
      {
        title: "Semantic Enrichment at the Gold Layer",
        text: "AI models \u2014 whether Copilot querying a semantic model or a custom model training on Gold tables \u2014 need data with clear meaning. This means: business-friendly column names (not \u201Ccust_ref_cd\u201D but \u201Ccustomer_id\u201D), column descriptions in the metadata catalog, glossary terms mapped to columns in Microsoft Purview, and sensitivity labels applied to PII fields. The Gold layer is designed to be AI-readable, not just analyst-readable.",
      },
      {
        title: "Fabric Data Agent (NL2SQL)",
        text: "Fabric\u2019s Data Agent connects to Lakehouses, Warehouses, and mirrored databases and translates natural language questions into SQL queries. For this to work well, the semantic layer needs to be curated: columns Copilot shouldn\u2019t see are hidden, business-critical measures are described with grounding text, and the semantic model reflects business concepts rather than raw database structure.",
      },
      {
        title: "AI Functions in Fabric Notebooks",
        text: "Fabric notebooks support AI functions that apply LLM-powered transformations directly to OneLake data. Use cases include: classifying unstructured text in a Silver table column, extracting entities from customer notes, summarizing incident logs, and tagging records with inferred categories. These run as Spark transformations and write enriched output back to a new Gold or specialized AI table.",
      },
      {
        title: "Azure OpenAI / Microsoft Foundry Integration",
        text: "For custom AI use cases beyond Copilot, the Gold layer feeds Azure OpenAI endpoints and models deployed via Microsoft Foundry (Azure ML). The data pipeline delivers clean, versioned training datasets; model outputs are written back to a Fabric Lakehouse as inference results; Power BI surfaces predictions alongside historical actuals in unified dashboards. Lineage across data \u2192 model \u2192 prediction is tracked in Purview.",
      },
      {
        title: "Governance as the AI Safety Layer",
        text: "Every AI use case that touches data needs governance guardrails. OneLake security (row-level, column-level, and ReadWrite access controls) ensures AI models only access data they\u2019re authorized for. Microsoft Purview DLP policies automatically flag PII moving through pipelines. Sensitivity labels follow data from ingestion to consumption \u2014 if a column is labeled \u201CConfidential - PII,\u201D that label is inherited by every report, notebook, and AI model that reads it.",
      },
      {
        title: "The Shift This Enables",
        text: "Teams stop asking \u201Ccan you build me a dashboard for this?\u201D and start asking \u201Cwhy did this metric drop last Tuesday?\u201D The platform answers both \u2014 dashboards for the former, AI-powered root cause analysis (via Copilot on the semantic model) for the latter.",
      },
    ],
    decisions: [
      "Semantic curation is a first-class engineering concern, not an afterthought",
      "AI Functions for inline LLM transforms; Azure OpenAI for custom model training",
      "Purview lineage tracks data \u2192 model \u2192 prediction end-to-end",
      "Sensitivity labels follow data across every engine and consumption layer",
    ],
  },
};
