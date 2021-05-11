import VersionInfo from './version-info';

export default interface AndroidPermission {
  name: string;
  versionInfo: VersionInfo;
  sourceCodeRepresentation: string;
  description: string;
  protectionLevel: string;
  constantValue: string;
}
