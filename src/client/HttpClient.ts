import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { Configuration, DefaultConfiguration } from "../models/ClientOptions";
import { ErrorHandler } from "../errors/ErrorHandler";

const PACKAGE_VERSION = "1.2.0";

export class HttpClient {
  private client: AxiosInstance;
  private configuration: Required<Configuration>;
  private authHeader: string;
  private token: string;

  constructor(
    token: string,
    authHeader: string,
    configOptions?: Configuration
  ) {
    this.token = token;
    this.authHeader = authHeader;
    this.configuration = { ...DefaultConfiguration, ...configOptions };
    this.client = this.buildClient();
  }

  getBaseUrl(): string {
    const protocol = this.configuration.useHttps ? "https" : "http";
    return `${protocol}://${this.configuration.requestHost}`;
  }

  getConfiguration(): Required<Configuration> {
    return { ...this.configuration };
  }

  setConfiguration(configOptions: Configuration): void {
    this.configuration = { ...this.configuration, ...configOptions };
    this.client = this.buildClient();
  }

  async request<T>(
    method: Method,
    path: string,
    body?: object,
    queryParameters?: Record<string, unknown>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      params: queryParameters,
    };

    if (body) {
      config.data = body;
    }

    try {
      const response = await this.client.request<T>(config);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw ErrorHandler.buildError(error);
      }
      throw error;
    }
  }

  private buildClient(): AxiosInstance {
    return axios.create({
      baseURL: this.getBaseUrl(),
      timeout: this.configuration.timeout * 1000,
      headers: {
        [this.authHeader]: this.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": `Haskimail.JS-${PACKAGE_VERSION}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }
}
