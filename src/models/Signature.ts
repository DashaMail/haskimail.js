export interface Signature {
  ID: number;
  Domain: string;
  EmailAddress: string;
  Name: string;
  ReplyToEmailAddress?: string;
  Confirmed: boolean;
}

export interface SignatureDetails extends Signature {
  SPFVerified: boolean;
  SPFHost?: string;
  SPFTextValue?: string;
  DKIMVerified: boolean;
  WeakDKIM: boolean;
  DKIMHost?: string;
  DKIMTextValue?: string;
  DKIMPendingHost?: string;
  DKIMPendingTextValue?: string;
  DKIMRevokedHost?: string;
  DKIMRevokedTextValue?: string;
  DKIMUpdateStatus?: string;
  ReturnPathDomain?: string;
  ReturnPathDomainVerified: boolean;
  ReturnPathDomainCNAMEValue?: string;
  SafeToRemoveRevokedKeyFromDNS?: boolean;
  ConfirmationPersonalNote?: string;
}

export interface Signatures {
  TotalCount: number;
  SenderSignatures: SignatureDetails[];
}

export interface CreateSignatureRequest {
  FromEmail: string;
  Name: string;
  ReplyToEmail?: string;
  ReturnPathDomain?: string;
  ConfirmationPersonalNote?: string;
}

export interface UpdateSignatureRequest {
  Name?: string;
  ReplyToEmail?: string;
  ReturnPathDomain?: string;
  ConfirmationPersonalNote?: string;
}
