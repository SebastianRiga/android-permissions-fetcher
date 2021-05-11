import Imprint from './imprint';
import FingerprintInfo from './fingerprint-info';
import AndroidPermission from './android-permission';

export default interface PermissionsResponse {
  imprint: Imprint;
  fingerprint: FingerprintInfo;
  permissions: AndroidPermission[];
}
