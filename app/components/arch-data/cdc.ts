import { type ArchitectureDiagram, C, nd, stream, govern } from "./types";

const X5 = [0, 185, 370, 555, 740];
const X4 = [20, 250, 480, 710];
const XC = 310;

export const cdc: ArchitectureDiagram = {
  id: "cdc",
  tabLabel: "CDC & Mirroring",
  oneLiner:
    "Keep source databases and Fabric always in sync \u2014 no ETL jobs, no bulk loads.",
  nodes: [
    // Row 1 — Source Systems
    nd("c-s1", X5[0], 0, "Azure SQL DB", C.cyan, "Managed Azure relational database with built-in change feed"),
    nd("c-s2", X5[1], 0, "SQL Server (On-Prem)", C.cyan, "On-premises SQL Server with CDC enabled via data gateway"),
    nd("c-s3", X5[2], 0, "Azure Cosmos DB", C.cyan, "NoSQL document database with change feed support"),
    nd("c-s4", X5[3], 0, "PostgreSQL", C.cyan, "Open-source relational database with WAL-based replication"),
    nd("c-s5", X5[4], 0, "Snowflake", C.cyan, "Cloud data warehouse with streams and tasks for CDC"),

    // Row 2 — CDC Layer
    nd("c-log", 80, 160, "Transaction Log / Change Feed / WAL", C.indigo, "Source system\u2019s native change tracking mechanism \u2014 reads only what changed", {
      badge: "architecture",
    }),
    nd("c-mirror", 500, 160, "Fabric Mirroring Engine", C.indigo, "Managed CDC \u2014 continuously replicates inserts, updates, deletes into OneLake as Delta tables", {
      badge: "architecture",
    }),
    nd("c-gw", 80, 90, "On-Premises Data Gateway", C.gray, "Secure bridge for on-prem SQL Server to Fabric mirroring", {
      dashed: true,
    }),

    // Row 3 — OneLake Landing Zone
    nd("c-land", XC, 320, "OneLake Landing Zone", C.purple, "Initial snapshot plus incremental changes land here before Delta conversion", {
      sublabel: "Initial Snapshot + Incremental Changes",
      glow: true,
    }),

    // Row 4 — Delta Conversion
    nd("c-delta", XC, 470, "Delta Conversion Engine", C.purple, "Converts raw change data into analytics-ready Delta Lake format with Parquet + Delta Log", {
      sublabel: "Parquet + Delta Log",
    }),

    // Row 5 — Mirrored Tables
    nd("c-tables", 130, 620, "OneLake \u2014 Mirrored Delta Tables (near-real-time)", C.purple, "Continuously updated Delta tables available across all Fabric engines \u2014 zero ETL code", {
      type: "wide",
      glow: true,
      badge: "architecture",
    }),

    // Row 6 — Consumption
    nd("c-c1", X4[0], 780, "SQL Analytics Endpoint", C.green, "T-SQL queries against mirrored Delta tables"),
    nd("c-c2", X4[1], 780, "Spark Notebooks", C.green, "PySpark transformations on mirrored data"),
    nd("c-c3", X4[2], 780, "Direct Lake Power BI", C.green, "Real-time reporting with no import lag"),
    nd("c-c4", X4[3], 780, "KQL Queryset", C.green, "Kusto queries for time-series analysis"),

    // Governance (side panel)
    nd("c-gov", 850, 470, "Governance", C.amber, "Schema evolution handling, CI/CD deployment pipelines, and Purview lineage tracking", {
      sublabel: "Schema Evolution \u00B7 CI/CD Pipelines \u00B7 Purview Lineage",
      dashed: true,
    }),
  ],
  edges: [
    // Sources → Transaction Log
    stream("ce1", "c-s1", "c-log"),
    stream("ce2", "c-s2", "c-gw"),
    stream("ce3", "c-s3", "c-log"),
    stream("ce4", "c-s4", "c-log"),
    stream("ce5", "c-s5", "c-log"),
    // Gateway → Log
    stream("ce6", "c-gw", "c-log"),
    // Log → Mirroring Engine (horizontal)
    stream("ce7", "c-log", "c-mirror", { sourceHandle: "right", targetHandle: "left" }),
    // Mirroring Engine → Landing Zone
    stream("ce8", "c-mirror", "c-land"),
    // Landing → Delta Conversion
    stream("ce9", "c-land", "c-delta"),
    // Delta → Mirrored Tables
    stream("ce10", "c-delta", "c-tables"),
    // Mirrored Tables → Consumption
    stream("ce11", "c-tables", "c-c1"),
    stream("ce12", "c-tables", "c-c2"),
    stream("ce13", "c-tables", "c-c3"),
    stream("ce14", "c-tables", "c-c4"),
    // Governance
    govern("ce15", "c-gov", "c-delta", { targetHandle: "right" }),
  ],
  walkthrough: {
    intro:
      "One of the most expensive data engineering patterns is the full reload: every night, extract everything from the source system and overwrite the data warehouse. It destroys source performance, consumes unnecessary compute, and always shows you yesterday\u2019s state. Change Data Capture (CDC) is the alternative \u2014 capture only what changed, stream it downstream, and keep everything current. Microsoft Fabric Mirroring is the managed CDC implementation native to Fabric.",
    sections: [
      {
        title: "How It Works",
        text: "Mirroring reads the transaction log of a source database (Azure SQL, SQL Server, Cosmos DB, PostgreSQL, Snowflake) and continuously replicates inserts, updates, and deletes into OneLake as Delta tables \u2014 in near real-time, with no ETL code. The initial snapshot bootstraps the target, and from that point on only incremental changes flow.",
      },
      {
        title: "CDC Isolation (Zero Impact on Source)",
        text: "A key engineering concern is that CDC extraction must not degrade source system performance. The approach: read from read replicas where available, limit WAL retention for peak windows, and use Fabric Mirroring\u2019s managed throttling so ingestion backs off during source peak load. Merge/upsert operations use Delta Lake\u2019s MERGE statement \u2014 idempotent by design, safe for reprocessing.",
      },
      {
        title: "Schema Evolution Handling",
        text: "Source schemas change \u2014 columns get added, renamed, dropped. Fabric Mirroring handles forward-compatible changes (new optional columns) automatically. For breaking schema changes, a governance process is triggered: validate the change in a staging mirror first, update downstream Silver/Gold transformations, then promote via CI/CD deployment pipelines.",
      },
      {
        title: "When Mirroring vs. ADF Pipelines",
        text: "Use Mirroring when you need near-real-time sync, zero ETL code, and the source is a supported system. Use ADF pipelines when you need complex pre-ingestion transformation, multi-hop orchestration, or the source is not supported by Mirroring. In practice, these complement each other: Mirroring for operational databases, ADF for file-based or API-based ingestion.",
      },
    ],
    decisions: [
      "Fabric Mirroring for supported databases \u2014 zero ETL code, near-real-time sync",
      "Delta MERGE for idempotent upserts \u2014 safe for reprocessing and replay",
      "On-Premises Data Gateway bridges on-prem SQL Server to cloud CDC",
      "Schema evolution validated in staging mirrors before production promotion",
    ],
  },
};
