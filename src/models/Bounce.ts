export interface Bounce {
  ID?: number;
  Type: string;
  TypeCode: number;
  Name?: string;
  Tag?: string;
  MessageID: string;
  ServerID?: number;
  MessageStream?: string;
  Description?: string;
  Details?: string;
  Email: string;
  From?: string;
  BouncedAt: string;
  DumpAvailable?: boolean;
  Inactive?: boolean;
  CanActivate?: boolean;
  Subject?: string;
  Content?: string;
  RecordType?: string;
}

export interface Bounces {
  TotalCount: number;
  Bounces: Bounce[];
}

export interface BounceDump {
  Body: string;
}

export interface BounceActivationResponse {
  Message: string;
  Bounce: Bounce;
}

export interface DeliveryStatistics {
  InactiveMails: number;
  Bounces: BounceCountByType[];
}

export interface BounceCountByType {
  Type?: string;
  Name: string;
  Count: number;
}

export interface BounceFilteringParameters {
  count?: number;
  offset?: number;
  type?: string;
  inactive?: boolean;
  emailFilter?: string;
  tag?: string;
  messageID?: string;
  fromdate?: string;
  todate?: string;
  messagestream?: string;
}
