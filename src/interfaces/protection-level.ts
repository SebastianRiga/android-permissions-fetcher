/**
 * Interface describing a single protection level given to a Android permissions.
 *
 * From the Android developer documentation:
 *
 * Characterizes the potential risk implied in a permission and indicates the procedure the system should follow when determining whether to
 * grant the permission to an application requesting it.
 *
 * @see {@link https://developer.android.com/reference/android/R.attr#protectionLevel}
 */
export interface ProtectionLevel {
  /**
   * The name of the protection level.
   *
   * @readonly
   */
  readonly name: string;
  /**
   * Internal value the protection level has been assigned with on the android platform.
   *
   * @readonly
   */
  readonly value: number | null;
  /**
   * Description of the usage and implications that are connected to the utilization of the permission.
   *
   * @readonly
   */
  readonly description: string;
}
