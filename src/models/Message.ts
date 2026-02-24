export enum LinkTrackingOptions {
  TextOnly = "TextOnly",
  HtmlOnly = "HtmlOnly",
  HtmlAndText = "HtmlAndText",
  None = "None",
}

export interface Header {
  Name: string;
  Value: string;
}

export interface Attachment {
  Name: string;
  Content: string;
  ContentType: string;
  ContentID?: string | null;
  ContentLength?: number;
  Disposition?: string | null;
}

export interface Hash<T> {
  [key: string]: T;
}

export interface Message {
  From: string;
  To?: string;
  Cc?: string;
  Bcc?: string;
  Subject?: string;
  ReplyTo?: string;
  HtmlBody?: string;
  TextBody?: string;
  Tag?: string;
  MessageStream?: string;
  TrackOpens?: boolean;
  TrackLinks?: LinkTrackingOptions;
  Headers?: Header[];
  Attachments?: Attachment[];
  Metadata?: Hash<string>;
}

export interface TemplatedMessage {
  TemplateId?: number;
  TemplateAlias?: string;
  TemplateModel?: object;
  InlineCss?: boolean;
  From: string;
  To?: string;
  Cc?: string;
  Bcc?: string;
  ReplyTo?: string;
  Tag?: string;
  MessageStream?: string;
  TrackOpens?: boolean;
  TrackLinks?: LinkTrackingOptions;
  Headers?: Header[];
  Attachments?: Attachment[];
  Metadata?: Hash<string>;
}

export interface MessageSendingResponse {
  To: string;
  Cc?: string;
  Bcc?: string;
  SubmittedAt: string;
  MessageID: string;
  ErrorCode: number;
  Message: string;
}
