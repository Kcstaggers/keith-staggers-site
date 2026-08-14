import { formEndpoint } from "./forms";

// The local product and intake can be built and tested while this stays false.
// Activate only with the matching intake-control update, end-to-end proof, and
// explicit release approval.
export const CLIENT_TOOL_PILOT_FORM_ENABLED = false;

export const clientToolPilotFormEndpoint = CLIENT_TOOL_PILOT_FORM_ENABLED
  ? formEndpoint
  : "";

export const clientToolPilotFormConfigured = Boolean(
  clientToolPilotFormEndpoint,
);
