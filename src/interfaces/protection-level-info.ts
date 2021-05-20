import { ProtectionLevel } from './protection-level';

/**
 * Interface describing the consolidated information
 * about all protection level related data for a single
 * Android permission.
 * @see ProtectionLevel
 * @see AndroidPermission
 */
export interface ProtectionLevelInfo {
  /**
   * The base permission level given
   * to the Android permission, e.g.
   * 'normal', 'dangerous', 'signature'
   * and 'signature|privileged'.
   * @readonly
   */
  readonly level: ProtectionLevel;
  /**
   * Flag that indicates wether or not the
   * permissions has defined additional
   * protection levels.
   * @readonly
   */
  readonly hasAdditions: boolean;
  /**
   * List of all additional protection levels
   * like 'development', 'installer' and
   * 'verifier'.
   * @readonly
   */
  readonly additions: ProtectionLevel[];
}
