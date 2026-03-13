export { nodeTypes } from "./nodes";
export type { ArchNodeData, ArchitectureDiagram, WalkthroughSection } from "./types";

export { medallion } from "./medallion";
export { realtime } from "./realtime";
export { cdc } from "./cdc";
export { metadataElt } from "./metadata-elt";
export { aiPlatform } from "./ai-platform";

import { medallion } from "./medallion";
import { realtime } from "./realtime";
import { cdc } from "./cdc";
import { metadataElt } from "./metadata-elt";
import { aiPlatform } from "./ai-platform";

export const architectures = [medallion, realtime, cdc, metadataElt, aiPlatform];
