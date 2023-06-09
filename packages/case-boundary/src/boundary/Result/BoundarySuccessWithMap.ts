import { BoundaryResult } from './BoundaryResult';
import { RESULT_SUCCESS_HAS_MAP_PAYLOAD } from './BoundaryResultTypeConstants';

export class BoundarySuccessWithMap extends BoundaryResult {
  readonly resultType: typeof RESULT_SUCCESS_HAS_MAP_PAYLOAD;

  readonly payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    super(RESULT_SUCCESS_HAS_MAP_PAYLOAD);
    this.resultType = RESULT_SUCCESS_HAS_MAP_PAYLOAD;
    this.payload = payload;
  }
}
