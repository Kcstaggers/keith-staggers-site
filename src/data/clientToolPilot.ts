import { formEndpoint } from "./forms";

// Founding pilot intake switch. Keep true only while the three complimentary
// slots are open. Production changes require Keith's direct release approval.
export const CLIENT_TOOL_PILOT_FORM_ENABLED = true;

export const CLIENT_TOOL_PILOT_SUBJECT = "[KS Client Tool Pilot] {{ email }}";
export const CLIENT_TOOL_PILOT_FORM_TYPE = "Interactive Client Tool Pilot";
export const CLIENT_TOOL_PILOT_INQUIRY_MARKER = "ks-client-tool-pilot-v1";
export const CLIENT_TOOL_PILOT_SOURCE_PAGE = "/client-tool-pilot/";
export const CLIENT_TOOL_PILOT_OFFER_VERSION = "founding-wave1-v1";
export const CLIENT_TOOL_PILOT_PRODUCTION_HOST = "www.keithstaggers.com";

export const clientToolPilotFormEndpoint = CLIENT_TOOL_PILOT_FORM_ENABLED
  ? formEndpoint
  : "";

export const clientToolPilotFormConfigured = Boolean(
  clientToolPilotFormEndpoint,
);
