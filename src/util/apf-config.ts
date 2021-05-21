/**
 * Configuration object containing the host and path to the raw Android permissions document by Google. This config builds the base for all
 * network requests.
 */
export const apfConfig = {
  /** The host of the Android permissions html document. */
  host: 'https://developer.android.com',
  /** The exact path to the Android permissions html document. */
  path: '/reference/android/Manifest.permission.html',
  /**
   * Builds the absolute path from {@link host} and {@link path}.
   *
   * @returns The absolute path to the Android permissions html document.
   */
  absoluteUrl: (): string => `${apfConfig.host}${apfConfig.path}`,
};
