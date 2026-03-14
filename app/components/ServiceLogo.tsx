"use client";

/**
 * Service logos for architecture diagrams.
 *
 * Simple Icons CDN does NOT have Microsoft products (Azure, Power BI, Excel,
 * Dynamics 365, SQL Server), OpenAI, or several others — they were removed
 * for trademark reasons. For those we use inline colored initials that match
 * each brand's identity color.
 *
 * Slugs confirmed to work on cdn.simpleicons.org (simple-icons v16):
 *   databricks, apachespark, fastapi, postgresql, snowflake, apachekafka,
 *   looker, python, react, files, delta, googlebigquery
 */

/* Slugs that exist in simple-icons v16 */
const VALID_CDN_SLUGS = new Set([
  "databricks",
  "apachespark",
  "fastapi",
  "postgresql",
  "snowflake",
  "apachekafka",
  "looker",
  "python",
  "react",
  "files",
  "delta",
  "googlebigquery",
  "mysql",
  "mongodb",
  "graphql",
  "redux",
  "docker",
  "git",
  "nodedotjs",
  "nextdotjs",
  "typescript",
  "javascript",
  "html5",
  "firebase",
  "sqlalchemy",
  "sqlite",
]);

/* Brand initials + colors for icons not on Simple Icons CDN */
const BRAND_FALLBACKS: Record<string, { initials: string; bg: string; fg: string }> = {
  // Microsoft products
  "azure":              { initials: "Az", bg: "#0078D4", fg: "#fff" },
  "microsoftazure":     { initials: "Az", bg: "#0078D4", fg: "#fff" },
  "powerbi":            { initials: "PB", bg: "#F2C811", fg: "#1B1B1F" },
  "microsoftexcel":     { initials: "Ex", bg: "#217346", fg: "#fff" },
  "microsoftsqlserver": { initials: "SQ", bg: "#CC2927", fg: "#fff" },
  "dynamics365":        { initials: "D3", bg: "#0B53CE", fg: "#fff" },
  // Delta Lake (the "delta" slug on CDN is for Delta Air, not Delta Lake)
  "deltalake":          { initials: "ΔL", bg: "#003366", fg: "#fff" },
  // Other missing
  "openai":             { initials: "AI", bg: "#412991", fg: "#fff" },
  "webhook":            { initials: "Wh", bg: "#6B6B6F", fg: "#fff" },
};

export function ServiceLogo({
  slug,
  color,
  size = 24,
}: {
  slug: string;
  color?: string;
  size?: number;
}) {
  // If slug exists on CDN, use img
  if (VALID_CDN_SLUGS.has(slug)) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color || "ffffff"}`}
        alt=""
        width={size}
        height={size}
        className="inline-block"
        loading="lazy"
      />
    );
  }

  // Brand fallback
  const fb = BRAND_FALLBACKS[slug];
  if (fb) {
    const fs = Math.max(8, Math.round(size * 0.38));
    return (
      <div
        className="inline-flex items-center justify-center rounded-md font-bold"
        style={{
          width: size,
          height: size,
          backgroundColor: fb.bg,
          color: fb.fg,
          fontSize: fs,
          lineHeight: 1,
        }}
      >
        {fb.initials}
      </div>
    );
  }

  // Generic fallback
  return (
    <div
      className="inline-flex items-center justify-center rounded-md font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: `#${color || "6B6B6F"}`,
        color: "#fff",
        fontSize: Math.max(8, Math.round(size * 0.38)),
        lineHeight: 1,
      }}
    >
      {slug.charAt(0).toUpperCase()}
    </div>
  );
}
