import { BaseClient } from "./BaseClient";
import { Configuration } from "../models/ClientOptions";
import { DefaultResponse, FilteringParameters } from "../models/Filtering";
import {
  Server,
  Servers,
  CreateServerRequest,
  UpdateServerRequest,
  ServerFilteringParameters,
} from "../models/Server";
import {
  Domain,
  DomainDetails,
  Domains,
  CreateDomainRequest,
  UpdateDomainRequest,
} from "../models/Domain";
import {
  Signature,
  SignatureDetails,
  Signatures,
  CreateSignatureRequest,
  UpdateSignatureRequest,
} from "../models/Signature";
import {
  TemplatesPushRequest,
  TemplatesPush,
} from "../models/Template";
import {
  DataRemovalRequest,
  DataRemovalStatus,
} from "../models/DataRemoval";

const AUTH_HEADER = "X-Haskimail-Account-Token";

export class AccountClient extends BaseClient {
  constructor(accountToken: string, configOptions?: Configuration) {
    super(accountToken, AUTH_HEADER, configOptions);
  }

  // ---- Серверы ----

  getServers(filter?: ServerFilteringParameters): Promise<Servers> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/servers",
      params as Record<string, unknown>
    );
  }

  getServer(id: number): Promise<Server> {
    return this.processRequestWithoutBody("GET", `/servers/${id}`);
  }

  createServer(options: CreateServerRequest): Promise<Server> {
    return this.processRequestWithBody("POST", "/servers", options);
  }

  editServer(
    id: number,
    options: UpdateServerRequest
  ): Promise<Server> {
    return this.processRequestWithBody("PUT", `/servers/${id}`, options);
  }

  deleteServer(id: number): Promise<DefaultResponse> {
    return this.processRequestWithoutBody("DELETE", `/servers/${id}`);
  }

  // ---- Домены ----

  getDomains(filter?: FilteringParameters): Promise<Domains> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/domains",
      params as Record<string, unknown>
    );
  }

  getDomain(id: number): Promise<DomainDetails> {
    return this.processRequestWithoutBody("GET", `/domains/${id}`);
  }

  createDomain(options: CreateDomainRequest): Promise<DomainDetails> {
    return this.processRequestWithBody("POST", "/domains", options);
  }

  editDomain(
    id: number,
    options: UpdateDomainRequest
  ): Promise<DomainDetails> {
    return this.processRequestWithBody("PUT", `/domains/${id}`, options);
  }

  deleteDomain(id: number): Promise<DefaultResponse> {
    return this.processRequestWithoutBody("DELETE", `/domains/${id}`);
  }

  verifyDomainDKIM(id: number): Promise<DomainDetails> {
    return this.processRequestWithBody(
      "PUT",
      `/domains/${id}/verifyDkim`,
      {}
    );
  }

  verifyDomainReturnPath(id: number): Promise<DomainDetails> {
    return this.processRequestWithBody(
      "PUT",
      `/domains/${id}/verifyReturnPath`,
      {}
    );
  }

  verifyDomainSPF(id: number): Promise<DomainDetails> {
    return this.processRequestWithBody(
      "PUT",
      `/domains/${id}/verifyspf`,
      {}
    );
  }

  rotateDomainDKIM(id: number): Promise<DomainDetails> {
    return this.processRequestWithBody(
      "POST",
      `/domains/${id}/rotatedkim`,
      {}
    );
  }

  // ---- Подписи отправителей ----

  getSenderSignatures(filter?: FilteringParameters): Promise<Signatures> {
    const params = filter || {};
    this.setDefaultPaginationValues(params);
    return this.processRequestWithoutBody(
      "GET",
      "/senders",
      params as Record<string, unknown>
    );
  }

  getSenderSignature(id: number): Promise<SignatureDetails> {
    return this.processRequestWithoutBody("GET", `/senders/${id}`);
  }

  createSenderSignature(
    options: CreateSignatureRequest
  ): Promise<SignatureDetails> {
    return this.processRequestWithBody("POST", "/senders", options);
  }

  editSenderSignature(
    id: number,
    options: UpdateSignatureRequest
  ): Promise<SignatureDetails> {
    return this.processRequestWithBody("PUT", `/senders/${id}`, options);
  }

  deleteSenderSignature(id: number): Promise<DefaultResponse> {
    return this.processRequestWithoutBody("DELETE", `/senders/${id}`);
  }

  resendSenderSignatureConfirmation(id: number): Promise<DefaultResponse> {
    return this.processRequestWithBody(
      "POST",
      `/senders/${id}/resend`,
      {}
    );
  }

  verifySenderSignatureSPF(id: number): Promise<SignatureDetails> {
    return this.processRequestWithBody(
      "POST",
      `/senders/${id}/verifyspf`,
      {}
    );
  }

  requestNewDKIMForSenderSignature(id: number): Promise<SignatureDetails> {
    return this.processRequestWithBody(
      "POST",
      `/senders/${id}/requestnewdkim`,
      {}
    );
  }

  // ---- Шаблоны ----

  pushTemplates(options: TemplatesPushRequest): Promise<TemplatesPush> {
    return this.processRequestWithBody("PUT", "/templates/push", options);
  }

  // ---- Удаление данных ----

  requestDataRemoval(
    options: DataRemovalRequest
  ): Promise<DataRemovalStatus> {
    return this.processRequestWithBody(
      "POST",
      "/data-removals",
      options
    );
  }

  getDataRemovalStatus(id: number): Promise<DataRemovalStatus> {
    return this.processRequestWithoutBody("GET", `/data-removals/${id}`);
  }
}
