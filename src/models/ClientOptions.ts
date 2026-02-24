export interface Configuration {
  useHttps?: boolean;
  requestHost?: string;
  timeout?: number;
}

export const DefaultConfiguration: Required<Configuration> = {
  useHttps: true,
  requestHost: "api.haskimail.ru",
  timeout: 180,
};
