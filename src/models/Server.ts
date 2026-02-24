export interface Server {
  ID: number;
  Name: string;
  ApiTokens?: string[];
  Color?: string;
  SmtpApiActivated?: boolean;
  RawEmailEnabled?: boolean;
  DeliveryType?: string;
  InboundAddress?: string;
  InboundHookUrl?: string;
  BounceHookUrl?: string;
  OpenHookUrl?: string;
  PostFirstOpenOnly?: boolean;
  TrackOpens?: boolean;
  TrackLinks?: string;
  ClickHookUrl?: string;
  DeliveryHookUrl?: string;
  InboundDomain?: string;
  InboundHash?: string;
  InboundSpamThreshold?: number;
  EnableSmtpApiErrorHooks?: boolean;
}

export interface Servers {
  TotalCount: number;
  Servers: Server[];
}

export interface CreateServerRequest {
  Name: string;
  Color?: string;
  SmtpApiActivated?: boolean;
  RawEmailEnabled?: boolean;
  DeliveryType?: string;
  InboundHookUrl?: string;
  BounceHookUrl?: string;
  OpenHookUrl?: string;
  PostFirstOpenOnly?: boolean;
  TrackOpens?: boolean;
  TrackLinks?: string;
  ClickHookUrl?: string;
  DeliveryHookUrl?: string;
  InboundSpamThreshold?: number;
  EnableSmtpApiErrorHooks?: boolean;
}

export interface UpdateServerRequest {
  Name?: string;
  Color?: string;
  SmtpApiActivated?: boolean;
  RawEmailEnabled?: boolean;
  DeliveryType?: string;
  InboundHookUrl?: string;
  BounceHookUrl?: string;
  OpenHookUrl?: string;
  PostFirstOpenOnly?: boolean;
  TrackOpens?: boolean;
  TrackLinks?: string;
  ClickHookUrl?: string;
  DeliveryHookUrl?: string;
  InboundSpamThreshold?: number;
  EnableSmtpApiErrorHooks?: boolean;
}

export interface ServerFilteringParameters {
  count?: number;
  offset?: number;
  name?: string;
}
