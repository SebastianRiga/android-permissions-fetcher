/**
 * Interface describing the fingerprint
 * that is added to all api responses.
 * Holds a timestamp when the response
 * was created and a hash over the
 * array of the fetched Android permissions,
 * which can be used to check if the
 * permissions have been changed by google.
 */
export interface FingerprintInfo {
  /**
   * Timestamp from when the response
   * was created.
   * @readonly
   */
  readonly timestamp: string;
  /**
   * Hash over the array of fetched Android
   * permissions, which can be used to check
   * if the permissions have been changed by
   * google.
   * @readonly
   */
  readonly hash: string;
}
