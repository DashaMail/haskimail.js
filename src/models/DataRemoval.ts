export interface DataRemovalRequest {
  RequestedBy: string;
  RequestedFor: string;
  NotifyWhenCompleted?: boolean;
}

export interface DataRemovalStatus {
  ID: number;
  Status: string;
}
