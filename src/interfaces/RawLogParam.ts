export default interface RawLogParam {
  api: string;
  mccmnc: number;
  timestamp: Date;
  status?: string;
  client_id?: string;
  flow?: string;
  scopes?: string;
  redirect_uri?: string;
  correlation_id?: string;
  error?: string;
  error_description?: string;
  sub?: string;
  context?: string;
  acr_value?: string;
  sdk_version?: string;
  event?: string;
  usertrait?: string;
}
