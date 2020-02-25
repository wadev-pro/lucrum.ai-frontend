export interface Event {
  campaignId: string;
  timestamp: string;
  doneBy: string;
}
export interface EventHistory {
  eventName: string;
  event: Event;
  shortEventDescription: string;
  detailedEventDescription: string;
}
