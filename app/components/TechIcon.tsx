"use client";

/* ═══════════════════════════════════════════════════
   Tech logos  → Simple Icons CDN (brand colors)
   Company/Issuer logos → local files in /public/logos/
   ═══════════════════════════════════════════════════ */

/* ── Tech slug + brand color mapping ── */

const techMap: Record<string, { slug: string; color: string }> = {
  // Data Engineering
  "Azure Data Factory": { slug: "microsoftazure", color: "0078D4" },
  "Azure Databricks": { slug: "databricks", color: "FF3621" },
  "PySpark": { slug: "apachespark", color: "E25A1C" },
  "Microsoft Fabric": { slug: "microsoftazure", color: "0078D4" },
  "Delta Lake": { slug: "delta", color: "003366" },
  "Azure SQL Data Warehouse": { slug: "microsoftazure", color: "0078D4" },
  "Google BigQuery": { slug: "googlebigquery", color: "669DF6" },
  "Looker Studio": { slug: "looker", color: "4285F4" },

  // Analytics & BI
  "Power BI": { slug: "powerbi", color: "F2C811" },
  "DAX": { slug: "powerbi", color: "F2C811" },
  "Excel": { slug: "microsoftexcel", color: "217346" },
  "Dynamics 365 F&O": { slug: "dynamics365", color: "002050" },

  // Cloud
  "Microsoft Azure": { slug: "microsoftazure", color: "0078D4" },
  "AWS (Amplify, Lambda, S3, CloudFront, Cognito)": { slug: "amazonaws", color: "FF9900" },
  "AWS": { slug: "amazonaws", color: "FF9900" },
  "Google Cloud Platform": { slug: "googlecloud", color: "4285F4" },
  "Vercel": { slug: "vercel", color: "5eead4" },

  // Full-Stack
  "React.js": { slug: "react", color: "61DAFB" },
  "React": { slug: "react", color: "61DAFB" },
  "React Native": { slug: "react", color: "61DAFB" },
  "Next.js": { slug: "nextdotjs", color: "5eead4" },
  "TypeScript": { slug: "typescript", color: "3178C6" },
  "JavaScript": { slug: "javascript", color: "F7DF1E" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E" },
  "Python": { slug: "python", color: "3776AB" },
  "Express.js": { slug: "express", color: "94a3b8" },
  "MongoDB": { slug: "mongodb", color: "47A248" },
  "MySQL": { slug: "mysql", color: "4479A1" },
  "Firebase": { slug: "firebase", color: "DD2C00" },
  "Redux": { slug: "redux", color: "764ABC" },
  "GraphQL": { slug: "graphql", color: "E10098" },

  // AI
  "OpenAI Integration": { slug: "openai", color: "5eead4" },
  "Microsoft Power Automate": { slug: "microsoftazure", color: "0078D4" },
  "Gemini/Bard Integration": { slug: "google", color: "4285F4" },

  // DevOps
  "AWS CDK": { slug: "amazonaws", color: "FF9900" },
  "Git": { slug: "git", color: "F05032" },
  "Docker (basic)": { slug: "docker", color: "2496ED" },

  // Misc job skills
  "SQL": { slug: "postgresql", color: "4169E1" },
  "MUI": { slug: "mui", color: "007FFF" },
  "Material-UI": { slug: "mui", color: "007FFF" },
  "HTML/CSS": { slug: "html5", color: "E34F26" },
  "JWT": { slug: "jsonwebtokens", color: "5eead4" },
  "Formik": { slug: "react", color: "61DAFB" },
  "Vonage": { slug: "vonage", color: "5eead4" },
  "REST APIs": { slug: "fastapi", color: "009688" },
  "GDPR": { slug: "shieldsdotio", color: "5eead4" },
  "Encryption": { slug: "letsencrypt", color: "003A70" },
};

/* ── Company logos (local files in /public/logos/) ── */

const companyLogos: Record<string, { file: string; bg?: string }> = {
  "Folio3 Software": { file: "/logos/folio3.png" },
  "Connect4Healing, Inc.": { file: "/logos/connect4healing.png" },
  "Upwork / Fiverr": { file: "/logos/upwork.svg" },
};

/* Company fallback initials for companies without logos */
const companyFallback: Record<string, { initials: string; color: string }> = {
  "PrivacyLabs": { initials: "PL", color: "#8b5cf6" },
  "Aciano Technologies": { initials: "AT", color: "#f97316" },
  "Worktrim": { initials: "WT", color: "#22c55e" },
};

/* Cert issuer logos (local files) */
const issuerLogos: Record<string, string> = {
  "Microsoft": "/logos/microsoft.png",
  "IBM": "/logos/ibm.png",
  "Cisco": "/logos/cisco.svg",
  "LinkedIn": "/logos/linkedin.png",
  "Coursera": "/logos/coursera.png",
};

/* ── Tech Icon (colored brand logo from CDN) ── */

export function TechIcon({
  name,
  size = 14,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const entry = techMap[name];
  if (!entry) return null;

  return (
    <img
      src={`https://cdn.simpleicons.org/${entry.slug}/${entry.color}`}
      alt=""
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
      loading="lazy"
    />
  );
}

/* ── Company Logo (local image file, initials fallback) ── */

export function CompanyLogo({
  company,
  size = 40,
}: {
  company: string;
  size?: number;
}) {
  const logo = companyLogos[company];

  if (logo) {
    return (
      <div
        className="rounded-lg overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 p-1.5"
        style={{ width: size, height: size }}
      >
        <img
          src={logo.file}
          alt={company}
          width={size - 8}
          height={size - 8}
          className="object-contain"
        />
      </div>
    );
  }

  const fallback = companyFallback[company];
  if (fallback) {
    return (
      <div
        className="rounded-lg flex items-center justify-center font-bold flex-shrink-0"
        style={{
          width: size,
          height: size,
          backgroundColor: `${fallback.color}15`,
          color: fallback.color,
          fontSize: size * 0.3,
        }}
      >
        {fallback.initials}
      </div>
    );
  }

  return null;
}

/* ── Issuer Logo for certifications (local image file) ── */

export function IssuerIcon({
  issuer,
  size = 22,
}: {
  issuer: string;
  size?: number;
}) {
  const file = issuerLogos[issuer];

  if (file) {
    return (
      <img
        src={file}
        alt={issuer}
        width={size}
        height={size}
        className="inline-block object-contain"
        loading="lazy"
      />
    );
  }

  return null;
}
