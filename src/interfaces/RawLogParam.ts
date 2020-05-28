export default interface RawLogParam {
  api: string;
  mccmnc: number;
  timestamp: Date;
  status?: string;
  client_id?: string;
}
