/**
 * @jest-environment node
 */

/*
* ############################
* # Imports
* ############################
*/

/// Core
import fs from 'fs';
import path from 'path';

/// Permissions API
import api from '../src/api';

/*
* ############################
* # Convenience
* ############################
*/

const filePath = path.join(__dirname, 'test.json');

const testPermissions = {
    imprint: expect.any(Object),
    permissions: expect.any(Array)
};

/*
* ############################
* # Setup & Teardown
* ############################
*/

afterAll(() => {
    fs.unlinkSync(filePath);
});

/*
* ############################
* # Tests
* ############################
*/

test('Fetch permissions object', async () => {
    const permissions = await api.fetchPermissions();
    return expect(permissions).toEqual(expect.objectContaining(testPermissions));
});

test('Fetch permissions json', async () => {
    const json = await api.fetchPermissionsJson();
    const permissions = JSON.parse(json);
    return expect(permissions).toEqual(expect.objectContaining(testPermissions));
});

test('Fetch permissions file', async () => {
    await api.fetchPermissionsFile(filePath);
    const json = fs.readFileSync(filePath, 'utf-8');
    const permissions = JSON.parse(json);
    return expect(permissions).toEqual(expect.objectContaining(testPermissions));
});
