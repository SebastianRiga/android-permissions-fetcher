/*
 * ############################
 * # Imports
 * ############################
 */

/// App Package
import pkg from '../../package.json';

/// Types
import { Imprint } from '../interfaces/imprint';

/*
 * ############################
 * # Business Logic
 * ############################
 */

/**
 * Creates an imprint object with developer and project related information, to be attached to a {@link PermissionsResponse}.
 *
 * @returns Imprint containing developer and project information.
 */
export const createVersionImprint = (): Imprint => ({
  createdWith: pkg.name,
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
});
