/*
 * ############################
 * # Imports
 * ############################
 */

/// Connected interfaces
import { Imprint } from './imprint';
import { FingerprintInfo } from './fingerprint-info';
import { AndroidPermission } from './android-permission';

/*
 * ############################
 * # Implementation
 * ############################
 */

/**
 * Interface describing a complete response returned
 * by the api. It contains the imprint, fingerprint,
 * and an array of all available Android permissions.
 * @see Imprint
 * @see FingerprintInfo
 * @see AndroidPermission
 */
export interface PermissionsResponse {
  /**
   * Object containing the projects
   * informational imprint.
   * @readonly
   */
  readonly imprint: Imprint;
  /**
   * Object containing the fingerprint
   * of the responses.
   *
   * Holds a timestamp from when the response
   * was created and a hash over the
   * array of the fetched Android permissions,
   * which can be used to check if the
   * permissions have been changed by google.
   * @readonly
   */
  readonly fingerprint: FingerprintInfo;
  /**
   * Array containing all manifest permissions,
   * which are currently available on Android.
   * @readonly
   */
  readonly permissions: AndroidPermission[];
}
