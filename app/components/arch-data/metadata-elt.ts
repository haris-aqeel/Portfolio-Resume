import { type ArchitectureDiagram, C, nd, batch, govern } from "./types";

const X4 = [20, 250, 480, 710];
const XC = 270;

export const metadataElt: ArchitectureDiagram = {
  id: "metadata",
  tabLabel: "Metadata-Driven ELT",
  conceptual: true,
  oneLiner:
    "One pipeline framework that ingests hundreds of sources — config, not code.",
  nodes: [
    // Row 1 — Config Store
    nd("md-cfg", 130, 0, "Metadata Control Table", C.amber, "SQL table holding all pipeline parameters — adding a new source is a database row, not a code deployment", {
      type: "wide",
      sublabel: "source · target · load_type · watermark · format · schedule",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 2 — Master Pipeline
    nd("md-master", XC, 180, "Master Pipeline (ADF / Fabric)", C.indigo, "Reads config at runtime and constructs pipeline logic dynamically via Lookup + ForEach activities", {
      sublabel: "Lookup Activity → ForEach Activity → Iterate Sources",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 3 — Handler Branches
    nd("md-rest", X4[0], 350, "REST API Handler", C.cyan, "Token auth → paginated fetch → JSON flatten into Bronze Delta", {
      items: ["Token Auth", "Paginated Fetch", "JSON Flatten"],
      badge: "production",
      logo: "fastapi",
      logoColor: "009688",
    }),
    nd("md-sql", X4[1], 350, "SQL Handler", C.cyan, "Watermark query → incremental Copy Activity → Bronze Delta tables", {
      items: ["Watermark Query", "Copy Activity", "Bronze Delta"],
      badge: "production",
      logo: "microsoftsqlserver",
      logoColor: "CC2927",
    }),
    nd("md-file", X4[2], 350, "File Handler", C.cyan, "SFTP/Blob pickup with automatic schema drift detection at Bronze", {
      items: ["SFTP / Blob", "Schema Drift", "Bronze"],
      badge: "production",
      logo: "microsoftexcel",
      logoColor: "217346",
    }),
    nd("md-cdc", X4[3], 350, "CDC Handler", C.cyan, "Change feed → incremental merge for near-real-time source sync", {
      items: ["Change Feed", "Incremental Merge"],
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 4 — Bronze
    nd("md-brz", 130, 530, "Bronze Layer — Raw Delta Tables", C.bronze, "Per-source, timestamped, immutable — every record traceable to its ingestion batch", {
      type: "wide",
      sublabel: "Per source · Timestamped · Immutable",
      badge: "production",
      logo: "databricks",
      logoColor: "FF3621",
    }),

    // Row 5 — Silver
    nd("md-slv", XC, 680, "Silver Layer — PySpark Transforms", C.silver, "Deduplication, type casting, SCD Type 2, and cross-source joins produce the single source of truth", {
      items: ["Deduplication", "Type Casting", "SCD Type 2", "Cross-source Joins"],
      badge: "production",
      logo: "apachespark",
      logoColor: "E25A1C",
    }),

    // Row 6 — Monitoring
    nd("md-log", 80, 850, "Pipeline Run Log Table", C.green, "Every pipeline run tracked: start time, end time, rows loaded, errors", {
      sublabel: "→ Power BI Pipeline Health Dashboard",
      logo: "azure",
      logoColor: "0078D4",
    }),
    nd("md-drift", 500, 850, "Schema Drift Alert", C.amber, "Detects schema changes at Bronze, logs to audit table, and notifies via Power Automate", {
      sublabel: "→ Power Automate Notification",
      logo: "azure",
      logoColor: "0078D4",
    }),
  ],
  edges: [
    // Config → Master
    batch("mde1", "md-cfg", "md-master"),
    // Master → Handlers
    batch("mde2", "md-master", "md-rest"),
    batch("mde3", "md-master", "md-sql"),
    batch("mde4", "md-master", "md-file"),
    batch("mde5", "md-master", "md-cdc"),
    // Handlers → Bronze
    batch("mde6", "md-rest", "md-brz"),
    batch("mde7", "md-sql", "md-brz"),
    batch("mde8", "md-file", "md-brz"),
    batch("mde9", "md-cdc", "md-brz"),
    // Bronze → Silver
    batch("mde10", "md-brz", "md-slv"),
    // Silver → Monitoring
    batch("mde11", "md-slv", "md-log"),
    // Drift alert (governance style)
    govern("mde12", "md-file", "md-drift", { sourceHandle: "right", targetHandle: "left" }),
  ],
  walkthrough: {
    intro:
      "Hard-coded pipelines are a maintenance trap. Every new data source means a new pipeline. Every schema change breaks something. Metadata-driven architecture inverts this: build one generic pipeline engine, and let a configuration table decide what it ingests, from where, in what format, and with what transformation rules. Adding a new source becomes a database row, not a code deployment.",
    sections: [
      {
        title: "Configuration Store",
        text: "A SQL table (or JSON config in a Lakehouse) holds the pipeline parameters: source system type, connection details, target table name, load type (full vs. incremental), watermark column, partition key, file format, and transformation rules. The pipeline engine reads this config at runtime and constructs its own logic dynamically. In ADF and Fabric Data Pipelines, this is implemented using parameterized datasets, linked services with dynamic expressions, and ForEach activities that iterate over the config rows.",
      },
      {
        title: "Dynamic Ingestion Layer",
        text: "The pipeline constructs Copy Activities at runtime using parameters from the config store. It handles diverse source types: REST APIs with token authentication, SFTP file drops with inconsistent naming conventions, Azure SQL tables with custom watermark columns, and flat files (Excel, CSV) with mismatched schemas across versions. Each source type has a handler template; the config record specifies which template to use.",
      },
      {
        title: "Incremental Load Strategies",
        text: "For database sources, a high-watermark column (e.g., last_modified_at) tracks the last loaded timestamp. Each pipeline run queries for records where the watermark exceeds the stored value, loads only that delta, and updates the watermark. For sources without a reliable watermark, full loads are run on a schedule, and Silver-layer deduplication handles idempotency. For CDC-enabled sources, the metadata config points to the change feed rather than a full table scan.",
      },
      {
        title: "Schema Drift Handling",
        text: "Semi-structured sources (JSON APIs, Excel files) often have unstable schemas. The pipeline detects schema drift at the Bronze layer using ADF\u2019s schema drift feature or Spark\u2019s inferSchema capabilities, logs the drift to an audit table, alerts via Power Automate, and continues ingestion with the new schema rather than failing. Downstream Silver transformations are notified via the audit log and updated through the CI/CD process.",
      },
      {
        title: "Why This Matters",
        text: "When I built ETL for Folio3, we were pulling from multiple Dynamics 365 environments, multiple Azure SQL databases, and file-based sources simultaneously. A metadata-driven approach reduced pipeline code by ~70% compared to individual hard-coded pipelines and made onboarding a new data source a configuration task rather than a development sprint.",
      },
    ],
    decisions: [
      "One generic pipeline engine — new sources are config rows, not code deployments",
      "Parameterized ADF datasets + ForEach iteration for dynamic pipeline construction",
      "High-watermark incremental loads — only pull what changed since last run",
      "Schema drift detection + alerting — pipelines adapt instead of failing",
    ],
  },
};
