/*
 * ############################
 * # Imports
 * ############################
 */

/// Core
import fs from 'fs';

/// Networking
import axios, { AxiosResponse } from 'axios';

/// Internal modules
import serialize from './modules/serializer';
import createVersionImprint from './modules/imprint';
import createFingerprint from './modules/fingerprint';

/// Types
import PermissionsResponse from './types/permissions-response';

/*
 * ############################
 * # Config
 * ############################
 */

/**
 * The base host of the permissions html document.
 */
const host: string = 'https://developer.android.com';

/**
 * The specific endpoint on the host where html document is located.
 */
const endpoint: string = '/reference/android/Manifest.permission.html';

/*
 * ############################
 * # API Implementation
 * ############################
 */

/**
 * Base request that fetches the whole html document
 * and any connected information.
 * @returns Promise of the network request.
 * @see host
 * @see endpoint
 */
const fetch = (): Promise<AxiosResponse<string>> => axios.get<string>(`${host}${endpoint}`);

/**
 * Fetches the permissions data and serializes it into a
 * base js object.
 * @returns The api response containing an imprint and all
 * fetched permissions as base js object.
 * @see fetch
 * @see createVersionImprint
 * @see serialize
 */
const fetchPermissions = (): Promise<PermissionsResponse> =>
  new Promise((resolve, reject) => {
    fetch()
      .then((response) => {
        const imprint = createVersionImprint();
        const permissions = serialize(response.data);
        const fingerprint = createFingerprint(permissions);

        const result = { imprint, fingerprint, permissions };
        resolve(result);
      })
      .catch((error) => reject(error));
  });

/**
 * Fetches the permissions data and returns it as a JSON.
 * @returns JSON representation of the api`s js object.
 * @see fetchPermissions
 */
const fetchPermissionsJson = (): Promise<string> =>
  new Promise((resolve, reject) => {
    fetchPermissions()
      .then((response) => {
        const json = JSON.stringify(response, null, 4);
        resolve(json);
      })
      .catch((error: Error) => reject(error));
  });

/**
 * Fetches the permission data and stores it as a json in the passed file (Format: utf-8).
 * @param filePath The path to the file where the permissions should be written to.
 * @returns Promise of the operation.
 * @see fetchPermissionsJson
 */
const fetchPermissionsFile = (filePath: string): Promise<void> =>
  new Promise((resolve, reject) => {
    fetchPermissionsJson()
      .then((json) => {
        fs.writeFileSync(filePath, json, { encoding: 'utf-8' });
        resolve();
      })
      .catch((error) => reject(error));
  });

/**
 * GET only api that retrieves a list of all available Android permissions
 * and their metadata.
 * @see fetch
 * @see fetchPermissions
 * @see fetchPermissionsJson
 * @see fetchPermissionsFile
 */
const API = {
  fetch,
  fetchPermissions,
  fetchPermissionsJson,
  fetchPermissionsFile,
};

export default API;
