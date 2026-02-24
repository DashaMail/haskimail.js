export interface Domain {
  ID: number;
  Name: string;
  SPFVerified: boolean;
  DKIMVerified: boolean;
  WeakDKIM: boolean;
  ReturnPathDomainVerified: boolean;
}

export interface DomainDetails extends Domain {
  SPFHost?: string;
  SPFTextValue?: string;
  DKIMHost?: string;
  DKIMTextValue?: string;
  DKIMPendingHost?: string;
  DKIMPendingTextValue?: string;
  DKIMRevokedHost?: string;
  DKIMRevokedTextValue?: string;
  DKIMUpdateStatus?: string;
  ReturnPathDomain?: string;
  ReturnPathDomainCNAMEValue?: string;
  SafeToRemoveRevokedKeyFromDNS?: boolean;
}

export interface Domains {
  TotalCount: number;
  Domains: Domain[];
}

export interface CreateDomainRequest {
  Name: string;
  ReturnPathDomain?: string;
}

export interface UpdateDomainRequest {
  ReturnPathDomain?: string;
}
