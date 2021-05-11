import objectHash from 'object-hash';

import FingerprintInfo from 'src/types/fingerprint-info';
import AndroidPermission from 'src/types/android-permission';

const createFingerprint = (permissions: AndroidPermission[]): FingerprintInfo => ({
  timestamp: new Date().toLocaleString(),
  hash: objectHash(permissions),
});

export default createFingerprint;
