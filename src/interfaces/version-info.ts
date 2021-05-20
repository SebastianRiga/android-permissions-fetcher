/**
 * Interface describing information about when
 * the permissions was added to android, if
 * it is deprecated and if so, when it
 * was deprecated.
 */
export interface VersionInfo {
  /**
   * Description of the api level,
   * when the permissions was introduced.
   * @readonly
   */
  readonly sinceVersion: string;
  /**
   * Flag indicating whether or not
   * the permissions is deprecated
   * and should not be used for active
   * projects anymore.
   * @readonly
   */
  readonly isDeprecated: boolean;
  /**
   * Description of the api level,
   * when the permissions was deprecated.
   * Null if the permissions has not been
   * deprecated. Check through {@link isDeprecated}
   * flag or use an optional accessor.
   * @readonly
   */
  readonly deprecatedSince: string | null;
}
