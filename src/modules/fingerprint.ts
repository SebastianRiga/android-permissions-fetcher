/*
 * ############################
 * # Imports
 * ############################
 */

/// Hashing function for the permissions array
import objectHash from 'object-hash';

/// Types
import { FingerprintInfo } from '../interfaces/fingerprint-info';
import { AndroidPermission } from '../interfaces/android-permission';

/*
 * ############################
 * # Business Logic
 * ############################
 */

/**
 * Creates a unique fingerprint for the passed Android permissions array. The hash produced from the array
 * can be used to check if a newly fetched response has an updated version of known permissions
 * or if nothing has changed.
 * @param permissions The array of Android permissions for which the fingerprint should be created.
 * @returns Fingerprint object containing the creation timestamp and a unique hash of the passed Android
 * permissions array.
 */
export const createFingerprint = (permissions: AndroidPermission[]): FingerprintInfo => ({
  timestamp: new Date().toLocaleString(),
  hash: objectHash(permissions),
});
