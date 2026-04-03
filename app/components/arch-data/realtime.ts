import { type ArchitectureDiagram, C, nd, stream, govern } from "./types";

const X5 = [0, 185, 370, 555, 740];
const X3 = [40, 350, 660];
const XC = 310;

export const realtime: ArchitectureDiagram = {
  id: "realtime",
  tabLabel: "Real-Time Intelligence",
  conceptual: true,
  oneLiner:
    "Sub-second insights from live event streams \u2014 no ETL lag.",
  nodes: [
    // Row 1 — Sources
    nd("rt-s1", X5[0], 0, "Azure Event Hubs", C.cyan, "High-throughput managed event ingestion service", { logo: "azure", logoColor: "0078D4" }),
    nd("rt-s2", X5[1], 0, "Azure IoT Hub", C.cyan, "Device telemetry ingestion for IoT workloads", { logo: "azure", logoColor: "0078D4" }),
    nd("rt-s3", X5[2], 0, "Kafka Topics", C.cyan, "Open-source event streaming from Kafka clusters", { logo: "apachekafka", logoColor: "231F20" }),
    nd("rt-s4", X5[3], 0, "App Webhooks", C.cyan, "Application event callbacks and notifications", { logo: "webhook", logoColor: "ffffff" }),
    nd("rt-s5", X5[4], 0, "CDC Streams", C.cyan, "Change data capture from operational databases", { logo: "azure", logoColor: "0078D4" }),

    // Row 2 — Real-Time Hub
    nd("rt-hub", XC, 170, "Fabric Real-Time Hub", C.indigo, "Tenant-wide catalog for all data in motion \u2014 discover, monitor, and route every active stream", {
      sublabel: "Discover \u00B7 Manage \u00B7 Route",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 3 — Eventstream
    nd("rt-es", XC, 320, "Fabric Eventstream", C.indigo, "Ingestion and routing layer \u2014 filter, project, type-cast, then fan out to multiple destinations", {
      sublabel: "Route \u00B7 Filter \u00B7 Transform",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 4 — Three branches
    nd("rt-hot", X3[0], 490, "Eventhouse (KQL DB)", C.red, "High-performance time-series engine \u2014 millions of events/hour, sub-second KQL queries", {
      items: ["KQL Querysets", "Materialized Views", "Real-Time Dashboard"],
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),
    nd("rt-warm", X3[1], 490, "Fabric Lakehouse", C.teal, "Batch persistence layer for warm-path analytics and historical queries", {
      items: ["Delta Tables", "Spark Notebooks"],
      badge: "production",
      logo: "deltalake",
      logoColor: "003366",
    }),
    nd("rt-cold", X3[2], 490, "OneLake Archive", C.blue, "Long-term cold storage for compliance and deep historical analysis", {
      items: ["Long-term Parquet"],
      logo: "deltalake",
      logoColor: "003366",
    }),

    // Row 5 — Activator
    nd("rt-act", XC, 670, "Fabric Activator", C.amber, "Monitors conditions in real-time streams and triggers automated actions when thresholds are crossed", {
      sublabel: "Anomaly Alerts \u00B7 Pipeline Triggers \u00B7 Power Automate \u00B7 Teams Notifications",
      badge: "production",
      logo: "azure",
      logoColor: "0078D4",
    }),

    // Row 6 — Consumption
    nd("rt-c1", 20, 830, "Real-Time Dashboard", C.green, "Live-updating visuals connected directly to Eventhouse via KQL", { logo: "powerbi", logoColor: "F2C811" }),
    nd("rt-c2", 250, 830, "Power BI Semantic Model", C.green, "Historical trend analysis and executive reporting via Direct Lake", { logo: "powerbi", logoColor: "F2C811" }),
    nd("rt-c3", 480, 830, "KQL Queryset", C.green, "Ad-hoc analytical queries against Eventhouse data", { logo: "azure", logoColor: "0078D4" }),
    nd("rt-c4", 710, 830, "SQL Endpoint", C.green, "T-SQL access to lakehouse tables for BI tools", { logo: "postgresql", logoColor: "4169E1" }),
  ],
  edges: [
    // Sources → Hub
    stream("re1", "rt-s1", "rt-hub"),
    stream("re2", "rt-s2", "rt-hub"),
    stream("re3", "rt-s3", "rt-hub"),
    stream("re4", "rt-s4", "rt-hub"),
    stream("re5", "rt-s5", "rt-hub"),
    // Hub → Eventstream
    stream("re6", "rt-hub", "rt-es"),
    // Eventstream → 3 branches
    stream("re7", "rt-es", "rt-hot"),
    stream("re8", "rt-es", "rt-warm"),
    stream("re9", "rt-es", "rt-cold"),
    // Hot/Warm/Cold → Activator
    stream("re10", "rt-hot", "rt-act"),
    stream("re11", "rt-warm", "rt-act"),
    // Activator → Consumption
    stream("re12", "rt-act", "rt-c1"),
    stream("re13", "rt-act", "rt-c2"),
    stream("re14", "rt-act", "rt-c3"),
    stream("re15", "rt-act", "rt-c4"),
    // Bridge: Eventhouse → Lakehouse (OneLake Availability)
    {
      id: "re-bridge",
      source: "rt-hot",
      target: "rt-warm",
      sourceHandle: "right",
      targetHandle: "left",
      animated: false,
      label: "Delta format, zero copy",
      labelStyle: { fill: "#71717a", fontSize: 9, fontWeight: 600 },
      labelBgStyle: { fill: "#0a0a0a", fillOpacity: 0.9 },
      labelBgPadding: [6, 4] as [number, number],
      labelBgBorderRadius: 4,
      style: { stroke: C.cyan, strokeWidth: 1.5, strokeDasharray: "6 4" },
    },
  ],
  walkthrough: {
    intro:
      "Traditional batch pipelines have a ceiling: they are always showing you the past. Real-time architectures collapse the distance between something happening and someone knowing about it. Microsoft Fabric\u2019s Real-Time Intelligence workload \u2014 built around Eventstreams and Eventhouse \u2014 is how I approach that problem natively within the Fabric ecosystem.",
    sections: [
      {
        title: "Event Sources",
        text: "Streaming data enters from Azure Event Hubs, Azure IoT Hub, Kafka topics, application webhooks, or Fabric\u2019s own OneLake events. The Real-Time Hub in Fabric acts as the tenant-wide catalog for all data in motion \u2014 a single place to discover, monitor, and route every active stream.",
      },
      {
        title: "Eventstream",
        text: "The ingestion and routing layer. Eventstreams receive raw event data and can perform lightweight transformations \u2014 filtering, field projection, type casting \u2014 before routing to one or more destinations. A single Eventstream can fan out simultaneously to an Eventhouse for real-time queries, a Lakehouse for batch persistence, and a custom application endpoint. No data movement, no duplication.",
      },
      {
        title: "Eventhouse (KQL Database)",
        text: "Fabric\u2019s high-performance time-series and event analytics engine \u2014 the evolution of Azure Data Explorer inside Fabric. It handles millions of events per hour and supports querying billions of rows in seconds using KQL (Kusto Query Language). Materialized views pre-aggregate common patterns, and update policies automatically transform incoming data into secondary tables as it arrives.",
      },
      {
        title: "OneLake Availability (KQL \u2192 Delta)",
        text: "A critical bridge pattern. When OneLake Availability is enabled on an Eventhouse table, the KQL data is automatically exposed as Delta Lake format in OneLake \u2014 with no extra storage cost. The same event data can be queried in real time via KQL and also consumed by Spark notebooks, the SQL analytics endpoint, or Power BI Direct Lake mode. One copy, multiple engines.",
      },
      {
        title: "Fabric Activator",
        text: "The automation layer. Activator monitors conditions in real-time data streams and triggers actions when thresholds are crossed \u2014 send a Teams notification when a KPI drops, run a Fabric pipeline when an anomaly is detected, fire a Power Automate flow when an SLA is breached. This closes the loop from data observation to business action without human intervention.",
      },
      {
        title: "Real-Time Dashboard vs. Power BI",
        text: "Real-Time Dashboards connect directly to Eventhouse via KQL and update live \u2014 no refresh schedule, no import latency. They are the right tool for operational monitoring (system health, live transactions, IoT telemetry). Power BI sits above this for historical trend analysis and executive reporting where data is more stable.",
      },
    ],
    decisions: [
      "Eventstream fan-out: one ingestion point, multiple destinations",
      "Eventhouse for hot path; Lakehouse for cold path \u2014 unified via OneLake shortcuts",
      "Activator replaces manual monitoring and alerting workflows",
      "KQL for operational queries; DAX/Power BI for analytical/historical reports",
    ],
  },
};
