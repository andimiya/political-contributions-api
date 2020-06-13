export default interface QueryLogParam {
  client_id: string;
  api?: string;
  mccmnc?: string;
  carrier?: string;
  success?: string;
  flow?: string;
  acr_value?: string;
  sdk_version?: string;
  starts_at?: string;
  ends_at?: string;
}
