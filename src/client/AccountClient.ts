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
import { DomainDetails, Domains, CreateDomainRequest } from "../models/Domain";
import {
  TemplatesPushRequest,
  TemplatesPush,
} from "../models/Template";

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

  verifyDomainSPF(id: number): Promise<DomainDetails> {
    return this.processRequestWithBody(
      "PUT",
      `/domains/${id}/verifyspf`,
      {}
    );
  }

  // ---- Шаблоны ----

  pushTemplates(options: TemplatesPushRequest): Promise<TemplatesPush> {
    return this.processRequestWithBody("PUT", "/templates/push", options);
  }
}
