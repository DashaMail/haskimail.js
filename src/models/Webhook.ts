export interface WebhookTrigger {
  Enabled: boolean;
}

export interface WebhookTriggers {
  Open?: WebhookTrigger;
  Click?: WebhookTrigger;
  Delivery?: WebhookTrigger;
  Bounce?: WebhookTrigger;
  SpamComplaint?: WebhookTrigger;
  SubscriptionChange?: WebhookTrigger;
}

export interface Webhook {
  ID: number;
  Url: string;
  MessageStream?: string;
  HttpAuth?: WebhookHttpAuth;
  HttpHeaders?: WebhookHttpHeader[];
  Triggers: WebhookTriggers;
}

export interface Webhooks {
  Webhooks: Webhook[];
}

export interface WebhookHttpAuth {
  Username: string;
  Password: string;
}

export interface WebhookHttpHeader {
  Name: string;
  Value: string;
}

export interface CreateWebhookRequest {
  Url: string;
  MessageStream?: string;
  HttpAuth?: WebhookHttpAuth;
  HttpHeaders?: WebhookHttpHeader[];
  Triggers?: WebhookTriggers;
}

export interface UpdateWebhookRequest {
  Url?: string;
  HttpAuth?: WebhookHttpAuth;
  HttpHeaders?: WebhookHttpHeader[];
  Triggers?: WebhookTriggers;
}

export interface WebhookFilteringParameters {
  MessageStream?: string;
}
