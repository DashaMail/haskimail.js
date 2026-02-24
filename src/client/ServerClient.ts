import { BaseClient } from "./BaseClient";
import { Configuration } from "../models/ClientOptions";
import { DefaultResponse } from "../models/Filtering";
import {
  Message,
  TemplatedMessage,
  MessageSendingResponse,
} from "../models/Message";
import {
  Bounce,
  Bounces,
  BounceDump,
  BounceActivationResponse,
  BounceFilteringParameters,
  DeliveryStatistics,
} from "../models/Bounce";
import {
  Template,
  Templates,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  TemplateFilteringParameters,
  TemplateValidationOptions,
  TemplateValidation,
} from "../models/Template";
import { Server, UpdateServerRequest } from "../models/Server";
import {
  OutboundMessages,
  OutboundMessageDetails,
  OutboundMessageDump,
  OutboundMessagesFilteringParameters,
  InboundMessages,
  InboundMessageDetails,
  InboundMessagesFilteringParameters,
  OutboundMessageOpens,
  OutboundMessageOpensFilteringParameters,
  OutboundMessageClicks,
  OutboundMessageClicksFilteringParameters,
} from "../models/OutboundMessage";
import {
  StatisticsFilteringParameters,
  OutboundStatistics,
  SentCounts,
  BounceCounts,
  SpamCounts,
  TrackedEmailCounts,
  OpenCounts,
  ClickCounts,
  EmailPlatformUsageCounts,
  EmailClientUsageCounts,
  EmailReadTimesCounts,
  BrowserUsageCounts,
  ClickPlatformUsageCounts,
  ClickLocationCounts,
} from "../models/Stats";
import {
  InboundRule,
  InboundRules,
  CreateInboundRuleRequest,
} from "../models/InboundRule";
import {
  Webhook,
  Webhooks,
  CreateWebhookRequest,
  UpdateWebhookRequest,
  WebhookFilteringParameters,
} from "../models/Webhook";
import {
  MessageStream,
  MessageStreams,
  CreateMessageStreamRequest,
  UpdateMessageStreamRequest,
  MessageStreamArchiveResponse,
  MessageStreamUnarchiveResponse,
  MessageStreamsFilteringParameters,
} from "../models/MessageStream";
import {
  Suppressions,
  SuppressionStatuses,
  CreateSuppressionsRequest,
  DeleteSuppressionsRequest,
  SuppressionFilteringParameters,
} from "../models/Suppression";
import { FilteringParameters } from "../models/Filtering";

const AUTH_HEADER = "X-Haskimail-Server-Token";

export class ServerClient extends BaseClient {
  constructor(serverToken: string, configOptions?: Configuration) {
    super(serverToken, AUTH_HEADER, configOptions);
  }

  // ---- Отправка писем ----

  sendEmail(email: Message): Promise<MessageSendingResponse> {
    return this.processRequestWithBody("POST", "/email", email);
  }

  sendEmailBatch(emails: Message[]): Promise<MessageSendingResponse[]> {
    return this.processRequestWithBody("POST", "/email/batch", emails);
  }

  sendEmailWithTemplate(
    template: TemplatedMessage
  ): Promise<MessageSendingResponse> {
    return this.processRequestWithBody("POST", "/email/withTemplate", template);
  }

  sendEmailBatchWithTemplates(
    templates: TemplatedMessage[]
  ): Promise<MessageSendingResponse[]> {
    return this.processRequestWithBody(
      "POST",
      "/email/batchWithTemplates",
      { Messages: templates }
    );
  }

  // ---- Отказы (bounces) ----

  getDeliveryStatistics(): Promise<DeliveryStatistics> {
    return this.processRequestWithoutBody("GET", "/deliverystats");
  }

  getBounces(filter?: BounceFilteringParameters): Promise<Bounces> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/bounces",
      params as Record<string, unknown>
    );
  }

  getBounce(id: number): Promise<Bounce> {
    return this.processRequestWithoutBody("GET", `/bounces/${id}`);
  }

  getBounceDump(id: number): Promise<BounceDump> {
    return this.processRequestWithoutBody("GET", `/bounces/${id}/dump`);
  }

  activateBounce(id: number): Promise<BounceActivationResponse> {
    return this.processRequestWithBody("PUT", `/bounces/${id}/activate`, {});
  }

  // ---- Шаблоны ----

  getTemplates(filter?: TemplateFilteringParameters): Promise<Templates> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/templates",
      params as Record<string, unknown>
    );
  }

  getTemplate(idOrAlias: number | string): Promise<Template> {
    return this.processRequestWithoutBody("GET", `/templates/${idOrAlias}`);
  }

  createTemplate(options: CreateTemplateRequest): Promise<Template> {
    return this.processRequestWithBody("POST", "/templates", options);
  }

  editTemplate(
    idOrAlias: number | string,
    options: UpdateTemplateRequest
  ): Promise<Template> {
    return this.processRequestWithBody(
      "PUT",
      `/templates/${idOrAlias}`,
      options
    );
  }

  deleteTemplate(idOrAlias: number | string): Promise<DefaultResponse> {
    return this.processRequestWithoutBody(
      "DELETE",
      `/templates/${idOrAlias}`
    );
  }

  validateTemplate(
    options: TemplateValidationOptions
  ): Promise<TemplateValidation> {
    return this.processRequestWithBody(
      "POST",
      "/templates/validate",
      options
    );
  }

  // ---- Сервер ----

  getServer(): Promise<Server> {
    return this.processRequestWithoutBody("GET", "/server");
  }

  editServer(options: UpdateServerRequest): Promise<Server> {
    return this.processRequestWithBody("PUT", "/server", options);
  }

  // ---- Исходящие сообщения ----

  getOutboundMessages(
    filter?: OutboundMessagesFilteringParameters
  ): Promise<OutboundMessages> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/messages/outbound",
      params as Record<string, unknown>
    );
  }

  getOutboundMessageDetails(
    messageId: string
  ): Promise<OutboundMessageDetails> {
    return this.processRequestWithoutBody(
      "GET",
      `/messages/outbound/${messageId}/details`
    );
  }

  getOutboundMessageDump(messageId: string): Promise<OutboundMessageDump> {
    return this.processRequestWithoutBody(
      "GET",
      `/messages/outbound/${messageId}/dump`
    );
  }

  // ---- Входящие сообщения ----

  getInboundMessages(
    filter?: InboundMessagesFilteringParameters
  ): Promise<InboundMessages> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/messages/inbound",
      params as Record<string, unknown>
    );
  }

  getInboundMessageDetails(
    messageId: string
  ): Promise<InboundMessageDetails> {
    return this.processRequestWithoutBody(
      "GET",
      `/messages/inbound/${messageId}/details`
    );
  }

  bypassBlockedInboundMessage(messageId: string): Promise<DefaultResponse> {
    return this.processRequestWithBody(
      "PUT",
      `/messages/inbound/${messageId}/bypass`,
      {}
    );
  }

  retryInboundHookForMessage(messageId: string): Promise<DefaultResponse> {
    return this.processRequestWithBody(
      "PUT",
      `/messages/inbound/${messageId}/retry`,
      {}
    );
  }

  // ---- Открытия и клики ----

  getMessageOpens(
    filter?: OutboundMessageOpensFilteringParameters
  ): Promise<OutboundMessageOpens> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/messages/outbound/opens",
      params as Record<string, unknown>
    );
  }

  getMessageOpensForSingleMessage(
    messageId: string,
    filter?: OutboundMessageOpensFilteringParameters
  ): Promise<OutboundMessageOpens> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      `/messages/outbound/opens/${messageId}`,
      params as Record<string, unknown>
    );
  }

  getMessageClicks(
    filter?: OutboundMessageClicksFilteringParameters
  ): Promise<OutboundMessageClicks> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/messages/outbound/clicks",
      params as Record<string, unknown>
    );
  }

  getMessageClicksForSingleMessage(
    messageId: string,
    filter?: OutboundMessageClicksFilteringParameters
  ): Promise<OutboundMessageClicks> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      `/messages/outbound/clicks/${messageId}`,
      params as Record<string, unknown>
    );
  }

  // ---- Статистика ----

  getOutboundOverview(
    filter?: StatisticsFilteringParameters
  ): Promise<OutboundStatistics> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound",
      filter as Record<string, unknown>
    );
  }

  getSentCounts(filter?: StatisticsFilteringParameters): Promise<SentCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/sends",
      filter as Record<string, unknown>
    );
  }

  getBounceCounts(
    filter?: StatisticsFilteringParameters
  ): Promise<BounceCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/bounces",
      filter as Record<string, unknown>
    );
  }

  getSpamComplaintsCounts(
    filter?: StatisticsFilteringParameters
  ): Promise<SpamCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/spam",
      filter as Record<string, unknown>
    );
  }

  getTrackedEmailCounts(
    filter?: StatisticsFilteringParameters
  ): Promise<TrackedEmailCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/tracked",
      filter as Record<string, unknown>
    );
  }

  getEmailOpenCounts(
    filter?: StatisticsFilteringParameters
  ): Promise<OpenCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/opens",
      filter as Record<string, unknown>
    );
  }

  getEmailOpenPlatformUsage(
    filter?: StatisticsFilteringParameters
  ): Promise<EmailPlatformUsageCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/opens/platforms",
      filter as Record<string, unknown>
    );
  }

  getEmailOpenClientUsage(
    filter?: StatisticsFilteringParameters
  ): Promise<EmailClientUsageCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/opens/emailclients",
      filter as Record<string, unknown>
    );
  }

  getEmailOpenReadTimes(
    filter?: StatisticsFilteringParameters
  ): Promise<EmailReadTimesCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/opens/readtimes",
      filter as Record<string, unknown>
    );
  }

  getClickCounts(
    filter?: StatisticsFilteringParameters
  ): Promise<ClickCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/clicks",
      filter as Record<string, unknown>
    );
  }

  getClickBrowserUsage(
    filter?: StatisticsFilteringParameters
  ): Promise<BrowserUsageCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/clicks/browserfamilies",
      filter as Record<string, unknown>
    );
  }

  getClickPlatformUsage(
    filter?: StatisticsFilteringParameters
  ): Promise<ClickPlatformUsageCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/clicks/platforms",
      filter as Record<string, unknown>
    );
  }

  getClickLocation(
    filter?: StatisticsFilteringParameters
  ): Promise<ClickLocationCounts> {
    return this.processRequestWithoutBody(
      "GET",
      "/stats/outbound/clicks/location",
      filter as Record<string, unknown>
    );
  }

  // ---- Правила входящих ----

  getInboundRuleTriggers(
    filter?: FilteringParameters
  ): Promise<InboundRules> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/triggers/inboundrules",
      params as Record<string, unknown>
    );
  }

  createInboundRuleTrigger(
    options: CreateInboundRuleRequest
  ): Promise<InboundRule> {
    return this.processRequestWithBody(
      "POST",
      "/triggers/inboundrules",
      options
    );
  }

  deleteInboundRuleTrigger(id: number): Promise<DefaultResponse> {
    return this.processRequestWithoutBody(
      "DELETE",
      `/triggers/inboundrules/${id}`
    );
  }

  // ---- Вебхуки ----

  getWebhooks(filter?: WebhookFilteringParameters): Promise<Webhooks> {
    return this.processRequestWithoutBody(
      "GET",
      "/webhooks",
      filter as Record<string, unknown>
    );
  }

  getWebhook(id: number): Promise<Webhook> {
    return this.processRequestWithoutBody("GET", `/webhooks/${id}`);
  }

  createWebhook(options: CreateWebhookRequest): Promise<Webhook> {
    return this.processRequestWithBody("POST", "/webhooks", options);
  }

  editWebhook(id: number, options: UpdateWebhookRequest): Promise<Webhook> {
    return this.processRequestWithBody("PUT", `/webhooks/${id}`, options);
  }

  deleteWebhook(id: number): Promise<DefaultResponse> {
    return this.processRequestWithoutBody("DELETE", `/webhooks/${id}`);
  }

  // ---- Каналы сообщений ----

  getMessageStreams(
    filter?: MessageStreamsFilteringParameters
  ): Promise<MessageStreams> {
    return this.processRequestWithoutBody(
      "GET",
      "/message-streams",
      filter as Record<string, unknown>
    );
  }

  getMessageStream(id: string): Promise<MessageStream> {
    return this.processRequestWithoutBody("GET", `/message-streams/${id}`);
  }

  createMessageStream(
    options: CreateMessageStreamRequest
  ): Promise<MessageStream> {
    return this.processRequestWithBody("POST", "/message-streams", options);
  }

  editMessageStream(
    id: string,
    options: UpdateMessageStreamRequest
  ): Promise<MessageStream> {
    return this.processRequestWithBody(
      "PATCH",
      `/message-streams/${id}`,
      options
    );
  }

  archiveMessageStream(
    id: string
  ): Promise<MessageStreamArchiveResponse> {
    return this.processRequestWithBody(
      "POST",
      `/message-streams/${id}/archive`,
      {}
    );
  }

  unarchiveMessageStream(
    id: string
  ): Promise<MessageStreamUnarchiveResponse> {
    return this.processRequestWithBody(
      "POST",
      `/message-streams/${id}/unarchive`,
      {}
    );
  }

  // ---- Стоп-списки (suppressions) ----

  getSuppressions(
    messageStream: string,
    filter?: SuppressionFilteringParameters
  ): Promise<Suppressions> {
    return this.processRequestWithoutBody(
      "GET",
      `/message-streams/${messageStream}/suppressions/dump`,
      filter as Record<string, unknown>
    );
  }

  createSuppressions(
    messageStream: string,
    options: CreateSuppressionsRequest
  ): Promise<SuppressionStatuses> {
    return this.processRequestWithBody(
      "POST",
      `/message-streams/${messageStream}/suppressions`,
      options
    );
  }

  deleteSuppressions(
    messageStream: string,
    options: DeleteSuppressionsRequest
  ): Promise<SuppressionStatuses> {
    return this.processRequestWithBody(
      "POST",
      `/message-streams/${messageStream}/suppressions/delete`,
      options
    );
  }
}
