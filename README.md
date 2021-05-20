# Android Permissions Fetcher (apf)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Fetches all available [Android permissions](https://developer.android.com/guide/topics/permissions/overview) and their data from the official google page and returns them as an object, formatted json or writes them to a file.

## Table of contents

1. [Installation](#Installation)

2. [Usage](#Usage)

    2.1 [CommonJS](#CommonJS)

    2.2 [Typescript](#Typescript)

    2.3 [Examples](#Examples)

    2.4 [API](#API)

3. [Scripts](#Scripts)

    3.1 [Testing](#Testing)

    3.2 [Building](#Building)

    3.3 [Formatting](#Formatting)

    3.4 [Linting](#Linting)

    3.5 [Coverage](#Coverage)

    3.6 [Documentation](#Documentation)

    3.7 [Cleaning](#Cleaning)

4. [License](#License)

## Installation

Install using npm:

```bash
npm -i android-permissions-fetcher
```

Install using yarn:

```bash
yarn add android-permissions-fetcher
```

## Usage

### CommonJS

Import apf through require and append the 'default' path to gain access to typings and autocompletion:

```js
const apf = require('android-permissions-fetcher').default;
```

### Typescript

Use the default import as follows:

```ts
import apf from 'android-permissions-fetcher';
```

### Examples

Apf exposes 3 functions to fetch Android Permissions in different formats:

```ts
import apf from 'android-permissions-fetcher';

// Fetches all available Android permissions and returns them as an object.
// Usable as a base promise and with async/await.
apf.fetchPermissions()
    .then(response => console.log(response))
    .catch(error => console.error(error));

try {
    const response = await apf.fetchPermissions();
} catch (exception) {
    console.error(exception);
}


// Fetches all available Android permissions and returns them as a json.
// Usable as a base promise and with async/await
apf.fetchPermissionsJson()
    .then(json => console.log(json))
    .catch(error => console.error(error));

try {
    const json = await apf.fetchPermissionsJson();
} catch(exception) {
    console.error(exception);
}

// Fetches all available Android permissions and writes them to a file in json utf-8 format (pretty printed).
// USable as a base promise and with async/await.

const filePath = path.join(__dirname, 'permissions.json');

apf.fetchPermissionsFile(filePath)
    .then(_ => console.log(`Permissions written to file at ${filePath}`))
    .catch(error => console.error(error));


try {
    await apf.fetchPermissionsFile(filePath);
} catch (exception) {
    console.error(exception);
}
```

### API

The fetched data is converted into easy to use objects through interfaces, all of which are explained below.
Starting with the general object response returned by the fetcher and then explaining all connected objects.
At the end of the section an example json excerpt is also provided.

#### PermissionsResponse

Interface describing a complete response returned by the api. It contains the imprint, fingerprint,
and an array of all available Android permissions.

```ts
export interface PermissionsResponse {
  /**
   * Object containing the projects
   * informational imprint.
   * @readonly
   */
  readonly imprint: [Imprint](#Imprint);
  /**
   * Object containing the fingerprint
   * of the responses.
   *
   * Holds a timestamp from when the response
   * was created and a hash over the
   * array of the fetched Android permissions,
   * which can be used to check if the
   * permissions have been changed by google.
   * @readonly
   */
  readonly fingerprint: [FingerprintInfo](#FingerprintInfo);
  /**
   * Array containing all manifest permissions,
   * which are currently available on Android.
   * @readonly
   */
  readonly permissions: [AndroidPermission](#AndroidPermission)[];
```

#### Imprint

Interface describing the projects informational imprint that is added to all api response.

```ts
export interface Imprint {
  /**
   * Name of the api.
   * @readonly
   */
  readonly createdWith: string;
  /**
   * Current api version.
   * @readonly
   */
  readonly version: string;
  /**
   * Package author.
   * @readonly
   */
  readonly author: string;
  /**
   * Package license.
   * @readonly
   */
  readonly license: string;
}
```

#### FingerprintInfo

Interface describing the fingerprint that is added to all api responses. Holds a timestamp from when the response
was created and a hash over the array of the fetched Android permissions, which can be used to check if the
permissions have been changed by google.

```ts
export interface FingerprintInfo {
  /**
   * Timestamp from when the response
   * was created.
   * @readonly
   */
  readonly timestamp: string;
  /**
   * Hash over the array of fetched Android
   * permissions, which can be used to check
   * if the permissions have been changed by
   * google.
   * @readonly
   */
  readonly hash: string;
}
```

#### AndroidPermission

 Interface describing a single Android Permissions.

 From the Android developer documentation:

 App permissions help support user privacy by protecting access to the following:

* Restricted data, such as system state and a user's contact information.

* Restricted actions, such as connecting to a paired device and recording audio

Link: [Android Documentation](https://developer.android.com/guide/topics/permissions/overview)

```ts
export interface AndroidPermission {
  /**
   * The name of the permission.
   * @readonly
   */
  readonly name: string;
  /**
   * Object containing information about when
   * the permissions was added to android, if
   * it is deprecated and if so, when it
   * was deprecated.
   * @readonly
   * @see [VersionInfo](#VersionInfo)
   */
  readonly versionInfo: VersionInfo;
  /**
   * String describing the form in which
   * the permissions is represented in
   * Java source code.
   * @readonly
   */
  readonly sourceCodeRepresentation: string;
  /**
   * Description of the functionality and
   * usage of the permissions.
   * @readonly
   */
  readonly description: string;
  /**
   * Object containing the consolidated information
   * about all protection level related data of the
   * Android permission.
   *
   * This includes the base permissions and any
   * additional permissions as an array.
   * @readonly
   * @see [ProtectionLevelInfo](#ProtectionLevelInfo)
   */
  readonly protectionLevel: ProtectionLevelInfo;
  /**
   * String representing the value used
   * to request and declare this permission
   * in the manifest of an Android app.
   * @readonly
   */
  readonly constantValue: string;
```

#### VersionInfo

Interface describing information about when the permissions was added to android, if
it is deprecated and if so, when it was deprecated.

```ts
export interface VersionInfo {
  /**
   * Description of the api level,
   * when the permissions was introduced.
   * @readonly
   */
  readonly sinceVersion: string;
  /**
   * Flag indicating whether or not
   * the permissions is deprecated
   * and should not be used for active
   * projects anymore.
   * @readonly
   */
  readonly isDeprecated: boolean;
  /**
   * Description of the api level,
   * when the permissions was deprecated.
   * Null if the permissions has not been
   * deprecated. Check through {@link isDeprecated}
   * flag or use an optional accessor.
   * @readonly
   */
  readonly deprecatedSince: string | null;
```

#### ProtectionLevelInfo

Interface describing the consolidated information about all protection level related data for a single
Android permission.

```ts
export interface ProtectionLevelInfo {
  /**
   * The base permission level given
   * to the Android permission, e.g.
   * 'normal', 'dangerous', 'signature'
   * and 'signature|privileged'.
   * @readonly
   */
  readonly level: [ProtectionLevel](#ProtectionLevel);
  /**
   * Flag that indicates wether or not the
   * permissions has defined additional
   * protection levels.
   * @readonly
   */
  readonly hasAdditions: boolean;
  /**
   * List of all additional protection levels
   * like 'development', 'installer' and
   * 'verifier'.
   * @readonly
   */
  readonly additions: [ProtectionLevel](#ProtectionLevel)[];
```

#### ProtectionLevel

Interface describing a single protection level given to a Android permissions.

From the Android developer documentation:

Characterizes the potential risk implied in a permission and
indicates the procedure the system should follow when determining
whether to grant the permission to an application requesting it.

See the the json files in the [res](res) folder for a complete list of all available protection levels.

Link: [Android Developer Documentation](https://developer.android.com/reference/android/R.attr#protectionLevel)

```ts
export interface ProtectionLevel {
  /**
   * The name of the protection level.
   * @readonly
   */
  readonly name: string;
  /**
   * Internal value the protection level has
   * been assigned with on the android platform.
   * @readonly
   */
  readonly value: number | null;
  /**
   * Description of the usage and implications
   * that are connected to the utilization of
   * the permission.
   * @readonly
   */
  readonly description: string;
}
```

#### JSON Response

The following is the json representation of a response, the same format is also written to the file specified for the permissionsFetchFile function.

```json
{
    "imprint": {
        "createdWith": "android-permissions-fetcher",
        "version": "1.1.0",
        "author": "Sebastian Riga <sebastian.riga.development@gmail.com>",
        "license": "MIT"
    },
    "fingerprint": {
        "timestamp": "5/19/2021, 10:01:39 AM",
        "hash": "678217af91e236af4d566e6ee0020815053d33ee"
    },
    "permissions": [
        {
            "name": "ACCEPT_HANDOVER",
            "versionInfo": {
                "sinceVersion": "Added in API level 28",
                "isDeprecated": false,
                "deprecatedSince": null
            },
            "sourceCodeRepresentation": "public static final String ACCEPT_HANDOVER",
            "description": "Allows a calling app to continue a call which was started in another app. An example is a video calling app that wants to continue a voice call on the user's mobile network.\nWhen the handover of a call from one app to another takes place, there are two devices which are involved in the handover; the initiating and receiving devices. The initiating device is where the request to handover the call was started, and the receiving device is where the handover request is confirmed by the other party.\nThis permission protects access to the TelecomManager.acceptHandover(Uri, int, PhoneAccountHandle) which the receiving side of the handover uses to accept a handover.",
            "protectionLevel": {
                "level": {
                    "name": "dangerous",
                    "value": 1,
                    "description": "Base permission type: a higher-risk permission that would give a requesting application access to private user data or control over the device that can negatively impact the user. Because this type of permission introduces potential risk, the system may not automatically grant it to the requesting application. For example, any dangerous permissions requested by an application may be displayed to the user and require confirmation before proceeding, or some other approach may be taken to avoid the user automatically allowing the use of such facilities."
                },
                "hasAdditions": false,
                "additions": []
            },
            "constantValue": " \"android.permission.ACCEPT_HANDOVER\""
        },

    ...

    ]
}
```

## Scripts

Overview of the npm/yarn scripts available in the project, if you decide to clone it directly.

### Testing

Tests are implemented using [jest](https://jestjs.io/), and are located in the [\_\_tests__](__tests__/) folder.
Test files/modules have to contain the 'test' or 'spec' identifier in their name to be recognized by jest, e.g. api.spec.ts.
To change the test configuration, edit the [jestconfig.json](jestconfig.json) file. Use the following command to execute all
tests in the project.

```bash
yarn test
```

### Building

To build the project run:

```bash
yarn build
```

The finished build output will be located in the [dist] folder. To change the build configuration edit the [tsconfig.json](tsconfig.json) file.

### Formatting

To automatically format all source files in accordance with the .prettier config run:

```bash
yarn format
```

### Linting

To run a lint check over all source files, execute:

```bash
yarn lint
```

### Coverage

If you wish to generate a code coverage report from the [jest](https://jestjs.io) tests, run the following command:

```bash
yarn coverage
```

The results will be shown in the console but are also available in web format, located in the coverage folder (available after command
has completed).

### Documentation

To generate the projects documentation, run:

```bash
yarn docs
```

This will create the docs folder, where you can find the complete documentation in web form. I use [typedoc](https://typedoc.org/) to create
the documentation. If you wish to change documentation related settings, edit the [typedoc.json](typedoc.json) file.

### Cleaning

A couple convenience scripts for cleaning various outputs and dependencies of the project are included.
To delete folders/files I use [rimraf](https://github.com/isaacs/rimraf#readme).

Clean build output:

```bash
yarn clean:dist
```

Clean coverage report:

```bash
yarn clean:coverage
```

Clean documentation:

```bash
yarn clean:docs
```

Clean node_modules:

```bash
yarn clean:node_modules
```

Clean auxiliary files (coverage reports and documentation):

```bash
yarn clean:auxiliary
```

Clean the project (dist, docs, coverage, node_modules):

```bash
yarn superclean
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2021 Sebastian Riga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
