export interface Suppression {
  EmailAddress: string;
  SuppressionReason: string;
  Origin: string;
  CreatedAt: string;
}

export interface Suppressions {
  Suppressions: Suppression[];
}

export interface SuppressionStatus {
  EmailAddress: string;
  Status: string;
  Message?: string;
}

export interface SuppressionStatuses {
  Suppressions: SuppressionStatus[];
}

export interface CreateSuppressionsRequest {
  Suppressions: Array<{ EmailAddress: string }>;
}

export interface DeleteSuppressionsRequest {
  Suppressions: Array<{ EmailAddress: string }>;
}

export interface SuppressionFilteringParameters {
  SuppressionReason?: string;
  Origin?: string;
  EmailAddress?: string;
  fromdate?: string;
  todate?: string;
}
