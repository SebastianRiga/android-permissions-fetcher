/**
 * Interface describing the projects
 * informational imprint that is added
 * to all api response.
 */
export interface Imprint {
  /**
   * Name of the api.
   * @readonly
   */
  readonly createdWith: string;
  /**
   * Current api version.
   * @readonly
   */
  readonly version: string;
  /**
   * Package author.
   * @readonly
   */
  readonly author: string;
  /**
   * Package license.
   * @readonly
   */
  readonly license: string;
}
