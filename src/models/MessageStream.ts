export interface MessageStream {
  ID: string;
  ServerID: number;
  Name: string;
  Description?: string;
  MessageStreamType: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  ArchivedAt?: string | null;
  ExpectedPurgeDate?: string | null;
  SubscriptionManagementConfiguration?: SubscriptionManagementConfiguration;
}

export interface SubscriptionManagementConfiguration {
  UnsubscribeHandlingType?: string;
}

export interface MessageStreams {
  TotalCount: number;
  MessageStreams: MessageStream[];
}

export interface CreateMessageStreamRequest {
  ID: string;
  Name: string;
  Description?: string;
  MessageStreamType: string;
  SubscriptionManagementConfiguration?: SubscriptionManagementConfiguration;
}

export interface UpdateMessageStreamRequest {
  Name?: string;
  Description?: string;
  SubscriptionManagementConfiguration?: SubscriptionManagementConfiguration;
}

export interface MessageStreamArchiveResponse {
  ID: string;
  ServerID: number;
  ExpectedPurgeDate: string;
}

export interface MessageStreamUnarchiveResponse {
  ID: string;
  ServerID: number;
  Name: string;
  MessageStreamType: string;
}

export interface MessageStreamsFilteringParameters {
  messageStreamType?: string;
  includeArchivedStreams?: boolean;
}
