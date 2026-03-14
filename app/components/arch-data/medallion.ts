import { type ArchitectureDiagram, C, nd, batch, govern } from "./types";

/* ── 4-column X positions ── */
const X4 = [20, 250, 480, 710];
const XC = 270; // centered single node

export const medallion: ArchitectureDiagram = {
  id: "medallion",
  tabLabel: "Medallion Lakehouse",
  oneLiner:
    "The core pattern behind every Fabric data platform I build.",
  nodes: [
    // Row 1 — Source Systems (cyan)
    nd("m-s1", X4[0], 0, "Dynamics 365 F&O", C.cyan, "ERP source for finance & operations data", { badge: "production", logo: "dynamics365", logoColor: "0B53CE" }),
    nd("m-s2", X4[1], 0, "SQL Server / Azure SQL", C.cyan, "Relational databases — transactional source systems", { badge: "production", logo: "microsoftsqlserver", logoColor: "CC2927" }),
    nd("m-s3", X4[2], 0, "REST APIs", C.cyan, "Third-party and internal API data sources", { logo: "fastapi", logoColor: "009688" }),
    nd("m-s4", X4[3], 0, "CSV / SFTP / Excel", C.cyan, "File-based data drops and manual uploads", { logo: "microsoftexcel", logoColor: "217346" }),

    // Row 2 — Ingestion (indigo)
    nd("m-ing", XC, 170, "Azure Data Factory / Fabric Pipelines", C.indigo, "Orchestrates all data movement into the lakehouse", {
      sublabel: "Copy Activities \u00B7 Linked Services \u00B7 Parameterized Templates",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 3 — OneLake (purple, wide, glow)
    nd("m-lake", 130, 330, "OneLake \u2014 Unified Storage (Delta Lake / Parquet)", C.purple, "Single storage layer for all Fabric workloads \u2014 zero data duplication", {
      type: "wide",
      glow: true,
      badge: "production",
      logo: "deltalake",
      logoColor: "003366",
    }),

    // Row 4 — Medallion Layers (color-coded, horizontal flow)
    nd("m-raw", X4[0], 500, "RAW \u2014 Landing Zone", C.gray, "Immutable landing zone \u2014 data arrives exactly as-is", { badge: "production", logo: "files", logoColor: "9AA0A6" }),
    nd("m-brz", X4[1], 500, "BRONZE \u2014 Delta Tables", C.bronze, "Schema-enforced, queryable for the first time via Spark or SQL", { badge: "production", logo: "databricks", logoColor: "FF3621" }),
    nd("m-slv", X4[2], 500, "SILVER \u2014 PySpark Cleaned", C.silver, "Deduplicated, joined, conformed \u2014 single source of truth", { badge: "production", logo: "apachespark", logoColor: "E25A1C" }),
    nd("m-gld", X4[3], 500, "GOLD \u2014 Dimensional Model", C.gold, "Business-ready fact tables and pre-aggregated summaries", { badge: "production", logo: "databricks", logoColor: "FF3621" }),

    // Row 5 — Semantic Layer (teal)
    nd("m-sem", XC, 670, "Power BI Semantic Model \u2014 Direct Lake", C.teal, "DAX measures on top of Gold tables \u2014 near-real-time, no import lag", {
      sublabel: "DAX Measures \u00B7 RLS/OLS Security \u00B7 Shared Semantic Model",
      badge: "production",
      logo: "powerbi",
      logoColor: "F2C811",
    }),

    // Row 6 — Consumption (green)
    nd("m-c1", X4[0], 840, "Power BI Reports", C.green, "Interactive dashboards for business users", { logo: "powerbi", logoColor: "F2C811" }),
    nd("m-c2", X4[1], 840, "Excel", C.green, "Connected Excel workbooks for ad-hoc analysis", { logo: "microsoftexcel", logoColor: "217346" }),
    nd("m-c3", X4[2], 840, "Looker Studio", C.green, "Cross-platform reporting for non-Microsoft stakeholders", { logo: "looker", logoColor: "4285F4" }),
    nd("m-c4", X4[3], 840, "SQL Analytics Endpoint", C.green, "T-SQL access to lakehouse tables", { logo: "postgresql", logoColor: "4169E1" }),

    // Governance (side panel, amber, dashed)
    nd("m-gov", 880, 330, "Microsoft Purview", C.amber, "Data lineage, sensitivity labels, and DLP policies", {
      sublabel: "Lineage \u00B7 Sensitivity Labels \u00B7 DLP Policies",
      dashed: true,
      logo: "azure",
      logoColor: "0078D4",
    }),
  ],
  edges: [
    // Sources → Ingestion
    batch("me1", "m-s1", "m-ing"),
    batch("me2", "m-s2", "m-ing"),
    batch("me3", "m-s3", "m-ing"),
    batch("me4", "m-s4", "m-ing"),
    // Ingestion → OneLake
    batch("me5", "m-ing", "m-lake"),
    // OneLake → RAW
    batch("me6", "m-lake", "m-raw"),
    // RAW → BRONZE → SILVER → GOLD (horizontal)
    batch("me7", "m-raw", "m-brz", { sourceHandle: "right", targetHandle: "left" }),
    batch("me8", "m-brz", "m-slv", { sourceHandle: "right", targetHandle: "left" }),
    batch("me9", "m-slv", "m-gld", { sourceHandle: "right", targetHandle: "left" }),
    // GOLD → Semantic
    batch("me10", "m-gld", "m-sem"),
    // Semantic → Consumption
    batch("me11", "m-sem", "m-c1"),
    batch("me12", "m-sem", "m-c2"),
    batch("me13", "m-sem", "m-c3"),
    batch("me14", "m-sem", "m-c4"),
    // Governance → OneLake (dashed amber)
    govern("me15", "m-gov", "m-lake", { targetHandle: "right" }),
  ],
  walkthrough: {
    intro:
      "The Medallion Architecture is the backbone of how data moves from raw ingestion to business consumption inside Microsoft Fabric\u2019s lakehouse. The entire pipeline runs over OneLake \u2014 Fabric\u2019s unified storage layer built on Azure Data Lake Storage Gen2 \u2014 which means every layer shares the same physical storage with zero data duplication.",
    sections: [
      {
        title: "Raw Layer (Landing Zone)",
        text: "Data lands here exactly as it arrives \u2014 unmodified, unvalidated, immutable. This is the safety net. Whether the source is Dynamics 365 Finance & Operations, a REST API, an SFTP drop, or a bulk CSV upload, everything is written to OneLake as Parquet files via Azure Data Factory pipelines or Fabric Data Pipelines. This layer supports full replay \u2014 if anything downstream breaks, we can re-process from source truth.",
      },
      {
        title: "Bronze Layer (Ingested, Unvalidated)",
        text: "Delta Tables are created here from the raw files. Data is typed and schema-enforced but not yet cleaned. The value of Bronze is that it makes data queryable for the first time \u2014 via Spark notebooks or the SQL analytics endpoint \u2014 without any business logic applied. We use Delta Lake\u2019s transaction log here to support time travel, meaning we can query what the data looked like at any historical point.",
      },
      {
        title: "Silver Layer (Cleaned, Joined, Conformed)",
        text: "This is where PySpark does the heavy lifting. Deduplication, null handling, type casting, business key resolution, SCD Type 2 for slowly changing dimensions, and cross-source joins all happen here. Silver is the single source of truth for the data team. It\u2019s not opinionated about how the business will use it \u2014 it\u2019s just accurate, consistent, and complete. Z-ordering and file compaction (OPTIMIZE + VACUUM) are run on a schedule to maintain query performance as data volumes grow.",
      },
      {
        title: "Gold Layer (Business-Ready, Aggregated)",
        text: "Dimensional models, fact tables, and pre-aggregated summary tables live here. Gold tables are the direct input to Power BI semantic models using Direct Lake mode \u2014 meaning Power BI reads Parquet files directly from OneLake rather than importing a cached copy, giving near-real-time performance without refresh lag. DAX measures are defined at the semantic model layer on top of Gold, keeping business logic consolidated and reusable across reports.",
      },
      {
        title: "Consumption Layer",
        text: "Power BI reports, Excel, Looker Studio, and the SQL analytics endpoint all consume from Gold. Deployment pipelines in Fabric manage promotion from Dev \u2192 Test \u2192 Prod workspaces with Git-based version control.",
      },
    ],
    decisions: [
      "Delta Lake format everywhere: transactional consistency, time travel, schema evolution",
      "OneLake shortcuts: multiple Fabric items access the same data without copying it",
      "Direct Lake mode: eliminates the performance penalty of DirectQuery without data duplication",
      "Workspace isolation: Dev/Test/Prod with separate capacities and CI/CD gates",
    ],
  },
};
