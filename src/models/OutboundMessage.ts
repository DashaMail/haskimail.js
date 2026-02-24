import { Header, Attachment } from "./Message";

export interface OutboundMessageDetails {
  TextBody?: string;
  HtmlBody?: string;
  Body?: string;
  Tag?: string;
  MessageID: string;
  To?: OutboundMessageRecipient[];
  Cc?: OutboundMessageRecipient[];
  Bcc?: OutboundMessageRecipient[];
  Recipients?: string[];
  ReceivedAt?: string;
  From?: string;
  Subject?: string;
  Attachments?: Attachment[];
  Status?: string;
  TrackOpens?: boolean;
  TrackLinks?: string;
  Metadata?: Record<string, string>;
  Sandboxed?: boolean;
  MessageStream?: string;
  MessageEvents?: MessageEvent[];
}

export interface OutboundMessageRecipient {
  Email: string;
  Name?: string;
}

export interface OutboundMessages {
  TotalCount: number;
  Messages: OutboundMessageDetails[];
}

export interface OutboundMessageDump {
  Body: string;
}

export interface InboundMessageDetails {
  From: string;
  FromName?: string;
  FromFull?: { Email: string; Name: string };
  To: string;
  ToFull?: Array<{ Email: string; Name: string }>;
  Cc?: string;
  CcFull?: Array<{ Email: string; Name: string }>;
  Bcc?: string;
  BccFull?: Array<{ Email: string; Name: string }>;
  ReplyTo?: string;
  Subject?: string;
  Date?: string;
  MailboxHash?: string;
  TextBody?: string;
  HtmlBody?: string;
  Tag?: string;
  Headers?: Header[];
  Attachments?: Attachment[];
  MessageID: string;
  Status?: string;
  MessageStream?: string;
}

export interface InboundMessages {
  TotalCount: number;
  InboundMessages: InboundMessageDetails[];
}

export interface MessageEvent {
  Recipient?: string;
  Type?: string;
  ReceivedAt?: string;
  Details?: Record<string, unknown>;
}

export interface OutboundMessagesFilteringParameters {
  count?: number;
  offset?: number;
  recipient?: string;
  fromemail?: string;
  tag?: string;
  status?: string;
  fromdate?: string;
  todate?: string;
  metadata_?: Record<string, string>;
  messagestream?: string;
}

export interface InboundMessagesFilteringParameters {
  count?: number;
  offset?: number;
  mailboxhash?: string;
  recipient?: string;
  fromemail?: string;
  tag?: string;
  status?: string;
  fromdate?: string;
  todate?: string;
}

export interface OutboundMessageOpens {
  TotalCount: number;
  Opens: MessageOpen[];
}

export interface MessageOpen {
  FirstOpen: boolean;
  Client?: MessageClient;
  OS?: MessageOS;
  Platform?: string;
  UserAgent?: string;
  ReadSeconds?: number;
  Geo?: MessageGeo;
  MessageID?: string;
  ReceivedAt?: string;
  Tag?: string;
  Recipient?: string;
}

export interface MessageClient {
  Name?: string;
  Company?: string;
  Family?: string;
}

export interface MessageOS {
  Name?: string;
  Company?: string;
  Family?: string;
}

export interface MessageGeo {
  CountryISOCode?: string;
  Country?: string;
  RegionISOCode?: string;
  Region?: string;
  City?: string;
  Zip?: string;
  Coords?: string;
  IP?: string;
}

export interface OutboundMessageClicks {
  TotalCount: number;
  Clicks: MessageClick[];
}

export interface MessageClick {
  ClickLocation?: string;
  OriginalLink?: string;
  Client?: MessageClient;
  OS?: MessageOS;
  Platform?: string;
  UserAgent?: string;
  Geo?: MessageGeo;
  MessageID?: string;
  ReceivedAt?: string;
  Tag?: string;
  Recipient?: string;
}

export interface OutboundMessageOpensFilteringParameters {
  count?: number;
  offset?: number;
  recipient?: string;
  tag?: string;
  client_name?: string;
  client_company?: string;
  client_family?: string;
  os_name?: string;
  os_company?: string;
  os_family?: string;
  platform?: string;
  country?: string;
  region?: string;
  city?: string;
}

export interface OutboundMessageClicksFilteringParameters {
  count?: number;
  offset?: number;
  recipient?: string;
  tag?: string;
  client_name?: string;
  client_company?: string;
  client_family?: string;
  os_name?: string;
  os_company?: string;
  os_family?: string;
  platform?: string;
  country?: string;
  region?: string;
  city?: string;
}
