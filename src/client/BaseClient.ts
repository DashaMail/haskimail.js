import { Configuration } from "../models/ClientOptions";
import { FilteringParameters } from "../models/Filtering";
import { HttpClient } from "./HttpClient";

export abstract class BaseClient {
  public clientVersion: string = "1.2.0";
  public httpClient: HttpClient;

  protected constructor(
    token: string,
    authHeader: string,
    configOptions?: Configuration
  ) {
    this.httpClient = new HttpClient(token, authHeader, configOptions);
  }

  setClientOptions(configOptions: Configuration): void {
    this.httpClient.setConfiguration(configOptions);
  }

  getClientOptions(): Configuration {
    return this.httpClient.getConfiguration();
  }

  protected processRequestWithBody<T>(
    method: "POST" | "PUT" | "PATCH",
    path: string,
    body: object
  ): Promise<T> {
    return this.httpClient.request<T>(method, path, body);
  }

  protected processRequestWithoutBody<T>(
    method: "GET" | "DELETE",
    path: string,
    queryParameters?: Record<string, unknown>
  ): Promise<T> {
    return this.httpClient.request<T>(method, path, undefined, queryParameters);
  }

  protected setDefaultPaginationValues(filter: FilteringParameters): void {
    filter.count = filter.count || 100;
    filter.offset = filter.offset || 0;
  }
}
