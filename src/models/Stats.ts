export interface StatisticsFilteringParameters {
  tag?: string;
  fromdate?: string;
  todate?: string;
  messagestream?: string;
}

export interface OutboundStatistics {
  Sent: number;
  Bounced: number;
  SMTPApiErrors: number;
  BounceRate: number;
  SpamComplaints: number;
  SpamComplaintsRate: number;
  Opens: number;
  UniqueOpens: number;
  Tracked: number;
  WithClientRecorded: number;
  WithPlatformRecorded: number;
  WithReadTimeRecorded: number;
  TotalClicks: number;
  UniqueLinksClicked: number;
  TotalTrackedLinksSent: number;
  Subscribed: number;
}

export interface SentCounts {
  Days: DatedCount[];
  Sent: number;
}

export interface BounceCounts {
  Days: DatedBounceCount[];
  HardBounce: number;
  SoftBounce: number;
  SMTPApiError: number;
  Transient: number;
}

export interface SpamCounts {
  Days: DatedCount[];
  SpamComplaint: number;
}

export interface TrackedEmailCounts {
  Days: DatedCount[];
  Tracked: number;
}

export interface OpenCounts {
  Days: DatedOpenCount[];
  Opens: number;
  Unique: number;
}

export interface ClickCounts {
  Days: DatedClickCount[];
  Clicks: number;
  Unique: number;
}

export interface EmailPlatformUsageCounts {
  Days: DatedPlatformCount[];
  Desktop: number;
  Mobile: number;
  Unknown: number;
  WebMail: number;
}

export interface EmailClientUsageCounts {
  Days: DatedEmailClientCount[];
}

export interface EmailReadTimesCounts {
  Days: DatedReadTimeCount[];
}

export interface BrowserUsageCounts {
  Days: DatedBrowserCount[];
}

export interface ClickPlatformUsageCounts {
  Days: DatedPlatformCount[];
  Desktop: number;
  Mobile: number;
  Unknown: number;
}

export interface ClickLocationCounts {
  Days: DatedClickLocationCount[];
  HTML: number;
  Text: number;
}

export interface DatedCount {
  Date: string;
  Count?: number;
}

export interface DatedBounceCount extends DatedCount {
  HardBounce?: number;
  SoftBounce?: number;
  SMTPApiError?: number;
  Transient?: number;
}

export interface DatedOpenCount extends DatedCount {
  Opens?: number;
  Unique?: number;
}

export interface DatedClickCount extends DatedCount {
  Clicks?: number;
  Unique?: number;
}

export interface DatedPlatformCount extends DatedCount {
  Desktop?: number;
  Mobile?: number;
  Unknown?: number;
  WebMail?: number;
}

export interface DatedEmailClientCount extends DatedCount {
  [clientName: string]: string | number | undefined;
}

export interface DatedReadTimeCount extends DatedCount {
  [readTime: string]: string | number | undefined;
}

export interface DatedBrowserCount extends DatedCount {
  [browserName: string]: string | number | undefined;
}

export interface DatedClickLocationCount extends DatedCount {
  HTML?: number;
  Text?: number;
}
