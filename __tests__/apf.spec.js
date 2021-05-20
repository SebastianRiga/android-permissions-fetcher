/**
 * @jest-environment node
 */

/*
* ############################
* # Imports
* ############################
*/

/// Core
const fs = require('fs');
const path = require('path');

/// Permissions API
const apf = require('../src/android-permissions-fetcher').default;

/*
* ############################
* # Convenience
* ############################
*/

const filePath = path.join(__dirname, 'test.json');

const cleanTestOutput = () => {
    const testJsonExists = fs.existsSync(filePath);

    if (testJsonExists) {
        fs.unlinkSync(filePath);
    }
}

const mockResponse = {
    imprint: expect.objectContaining({
        author: expect.any(String),
        createdWith: expect.any(String),
        license: expect.any(String),
        version: expect.any(String),
    }),
    fingerprint: expect.objectContaining({
        timestamp: expect.any(String),
        hash: expect.any(String),
    }),
    permissions: expect.arrayContaining([{
        constantValue: expect.any(String),
        description: expect.any(String),
        name: expect.any(String),
        protectionLevel: expect.any(Object),
        sourceCodeRepresentation: expect.any(String),
        versionInfo: expect.any(Object)
    }])
}

/*
* ############################
* # Setup & Teardown
* ############################
*/

beforeAll(cleanTestOutput);

afterAll(cleanTestOutput);

/*
* ############################
* # Tests
* ############################
*/

test('Fetch permissions object', async () => {
    const permissions = await apf.fetchPermissions();
    return expect(permissions).toEqual(expect.objectContaining(mockResponse));
});

test('Fetch permissions json', async () => {
    const json = await apf.fetchPermissionsJson();
    const permissions = JSON.parse(json);
    return expect(permissions).toEqual(expect.objectContaining(mockResponse));
});

test('Fetch permissions file', async () => {
    await apf.fetchPermissionsFile(filePath);
    const json = fs.readFileSync(filePath, 'utf-8');
    const permissions = JSON.parse(json);
    return expect(permissions).toEqual(expect.objectContaining(mockResponse));
});
