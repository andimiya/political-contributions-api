import InvalidRawLogResponse from './InvalidRawLogResponse';

export default interface RawLogResponse {
  record_count: number;
  errors: InvalidRawLogResponse[];
}
