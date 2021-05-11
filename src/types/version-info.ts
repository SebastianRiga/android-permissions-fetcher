export default interface VersionInfo {
  sinceVersion: string;
  isDeprecated: boolean;
  deprecatedSince: string | null;
}
