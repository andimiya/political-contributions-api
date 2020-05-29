import RawLogParam from './RawLogParam';

export default interface InvalidRawLogResponse {
  reason: string;
  record: RawLogParam;
}
