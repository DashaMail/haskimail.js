export interface Template {
  TemplateId: number;
  Name: string;
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
  AssociatedServerId: number;
  Active: boolean;
  Alias?: string | null;
  TemplateType?: string;
  LayoutTemplate?: string | null;
}

export interface Templates {
  TotalCount: number;
  Templates: Template[];
}

export interface CreateTemplateRequest {
  Name: string;
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
  Alias?: string;
  TemplateType?: string;
  LayoutTemplate?: string;
  AssociatedServerId?: number;
}

export interface UpdateTemplateRequest {
  Name?: string;
  Subject?: string;
  HtmlBody?: string;
  TextBody?: string;
  Alias?: string;
  TemplateType?: string;
  LayoutTemplate?: string;
}

export interface TemplateValidationOptions {
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
  TestRenderModel?: object;
  TemplateType?: string;
  LayoutTemplate?: string;
  InlineCssForHtmlTestRender?: boolean;
}

export interface TemplateValidation {
  AllContentIsValid: boolean;
  HtmlBody?: TemplateValidationContent;
  TextBody?: TemplateValidationContent;
  Subject?: TemplateValidationContent;
  SuggestedTemplateModel?: object;
}

export interface TemplateValidationContent {
  ContentIsValid: boolean;
  ValidationErrors?: TemplateValidationError[];
  RenderedContent?: string;
}

export interface TemplateValidationError {
  Message: string;
  Line: number;
  CharacterPosition: number;
}

export interface TemplateFilteringParameters {
  count?: number;
  offset?: number;
  templateType?: string;
  layoutTemplate?: string;
}

export interface TemplatesPushRequest {
  SourceServerID: number;
  DestinationServerID: number;
  PerformChanges: boolean;
}

export interface TemplatesPush {
  TotalCount: number;
  Templates: TemplatePushAction[];
}

export interface TemplatePushAction {
  Action: string;
  TemplateId?: number;
  Alias?: string;
  Name?: string;
}
