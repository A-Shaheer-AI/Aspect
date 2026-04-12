import { sendGTMEvent } from "@next/third-parties/google";

export const trackFormStart = () => sendGTMEvent({ event: "form_start", form_name: "quote_popup" });
export const trackFormStep2 = (service: string, suburb: string) => sendGTMEvent({ event: 'form_step_2', service, suburb });
export const trackFormCompleted = () => sendGTMEvent({ event: "quote_request_complete" });