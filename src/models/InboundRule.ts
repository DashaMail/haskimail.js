export interface InboundRule {
  ID: number;
  Rule: string;
}

export interface InboundRules {
  TotalCount: number;
  InboundRules: InboundRule[];
}

export interface CreateInboundRuleRequest {
  Rule: string;
}
