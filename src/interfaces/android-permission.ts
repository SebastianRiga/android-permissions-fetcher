/*
 * ############################
 * # Imports
 * ############################
 */

/// Connected interfaces

import { VersionInfo } from './version-info';
import { ProtectionLevelInfo } from './protection-level-info';

/*
 * ############################
 * # Implementation
 * ############################
 */

/**
 * Interface describing a single Android Permissions.
 *
 * From the Android developer documentation:
 *
 * App permissions help support user privacy by protecting access to the following:
 *
 * - Restricted data, such as system state and a user's contact information.
 * - Restricted actions, such as connecting to a paired device and recording audio
 *
 * @see {@link https://developer.android.com/guide/topics/permissions/overview}
 */
export interface AndroidPermission {
  /**
   * The name of the permission.
   *
   * @readonly
   */
  readonly name: string;
  /**
   * Object containing information about when the permissions was added to android, if it is deprecated and if so, when it was deprecated.
   *
   * @readonly
   * @see VersionInfo
   */
  readonly versionInfo: VersionInfo;
  /**
   * String describing the form in which the permissions is represented in Java source code.
   *
   * @readonly
   */
  readonly sourceCodeRepresentation: string;
  /**
   * Description of the functionality and usage of the permissions.
   *
   * @readonly
   */
  readonly description: string;
  /**
   * Object containing the consolidated information about all protection level related data of the Android permission.
   *
   * This includes the base permissions and any additional permissions as an array.
   *
   * @readonly
   * @see ProtectionLevelInfo
   */
  readonly protectionLevel: ProtectionLevelInfo;
  /**
   * String representing the value used to request and declare this permission in the manifest of an Android app.
   *
   * @readonly
   */
  readonly constantValue: string;
}
