/*
 * ############################
 * # Imports
 * ############################
 */

/// HTML Parser
import parse, { HTMLElement, Options } from 'node-html-parser';

/// Protection level parser
import { getProtectionLevelsFromString } from './protection-levels';

/// Interfaces
import { VersionInfo } from '../interfaces/version-info';
import { AndroidPermission } from '../interfaces/android-permission';

/*
 * ############################
 * # Configuration
 * ############################
 */

const deprecationDelimiter: string = 'Deprecated';

const permissionsSelector: string = 'div[data-version-added]';
const permissionNameSelector: string = 'h3.api-name';
const permissionApiVersionSelector: string = 'div.api-level';
const permissionSourceCodeRepresentationSelector: string = 'pre.api-signature';

const constantValuePattern: RegExp = /^'?Constant value:'?/i;
const protectionLevelPattern: RegExp = /^'?Protection level:'?/i;
const forbiddenLevelPattern: RegExp = /(^'?Not for use by third-party applications)|(^'?Should only be requested by the System)/i;

const stringSanitizer: RegExp = /\s\s+/g;

const parserOptions: Options = {
  lowerCaseTagName: false,
  comment: false,
  blockTextElements: {
    stript: false,
    noscript: false,
    style: false,
    pre: true,
  },
};

/*
 * ############################
 * # Convenience functions
 * ############################
 */

/**
 *
 * @param text
 */
const descriptionFilter = (text: string) =>
  !protectionLevelPattern.test(text) && !forbiddenLevelPattern.test(text) && !constantValuePattern.test(text);

const protectionLevelFinder = (text: string) => protectionLevelPattern.test(text) || forbiddenLevelPattern.test(text);

const constantValueFinder = (text: string) => constantValuePattern.test(text);

const sanitizeString = (content: string): string => content.replace(stringSanitizer, ' ').trim();

/*
 * ############################
 * # Business Logic
 * ############################
 */

/**
 * Parses the name of the Android permission.
 * @param {HTMLElement} element
 * @returns {string} The name of the Android permission.
 */
const parseName = (element: HTMLElement): string => {
  const selection = element.querySelector(permissionNameSelector);
  return sanitizeString(selection.textContent);
};

/**
 * Parses the api version information of the Android permission. This includes
 * the api version when it was introduced into the platform and the api version,
 * in which it was deprecated if present. Additionally a flag is appended, which
 * indicates the deprecation status of the permission.
 * @param element
 * @returns An object containing the api version information
 */
const parseApiVersionInfo = (element: HTMLElement): VersionInfo => {
  const selection = element.querySelector(permissionApiVersionSelector);
  const versionInfo = selection.textContent.split(deprecationDelimiter);

  if (!versionInfo.length) {
    return { sinceVersion: '', isDeprecated: false, deprecatedSince: null };
  }

  const sinceVersion = sanitizeString(versionInfo[0]!);

  if (versionInfo.length === 2) {
    const deprecationMessage = sanitizeString(versionInfo[1]!);
    const deprecatedSince = `${deprecationDelimiter} ${deprecationMessage}`;
    return { sinceVersion, isDeprecated: true, deprecatedSince };
  }

  return { sinceVersion, isDeprecated: false, deprecatedSince: null };
};

/**
 * Parses the source code representation of the Android permission and strips any excessive
 * information like tags and line breaks from it.
 * @param element
 * @returns The source code representation of the Android permission.
 */
const parseCodeRepresentation = (element: HTMLElement) => {
  const selection = element.querySelector(permissionSourceCodeRepresentationSelector);

  const sourceCodeRepresentationRaw = selection.textContent;
  const sourceCodeRepresentationElements = parse(sourceCodeRepresentationRaw).childNodes;
  const sourceCodeRepresentationParts = sourceCodeRepresentationElements.map((part) => part.textContent);

  const sourceCodeRepresentation = sourceCodeRepresentationParts.join('');

  return sanitizeString(sourceCodeRepresentation);
};

/**
 *
 * @param element
 */
const parseTextContent = (element: HTMLElement) => {
  const selection = element.querySelectorAll('p');
  const paragraphList = selection.map((paragraph) => sanitizeString(paragraph.textContent));

  const descriptionParts = paragraphList.filter(descriptionFilter);
  const protectionLevelParagraph = paragraphList.find(protectionLevelFinder);
  const constantValueParagraph = paragraphList.find(constantValueFinder);

  const description = descriptionParts.join('\n');

  const protectionLevelRaw = protectionLevelParagraph?.replace(protectionLevelPattern, '');
  const protectionLevelInfo = getProtectionLevelsFromString(protectionLevelRaw);

  const constantValue = constantValueParagraph ? constantValueParagraph.replace(constantValuePattern, '') : 'Unknown';

  return { description, protectionLevelInfo, constantValue };
};

/**
 * Transforms the passed HTMLElement into an AndroidPermission object.
 * @param  element The HTML element containing the permission information
 * in its various child nodes.
 * @returns The parsed AndroidPermission object.
 * @see HTMLElement
 * @see AndroidPermission
 */
const transformHtmlElement = (element: HTMLElement): AndroidPermission => {
  const name = parseName(element);
  const versionInfo = parseApiVersionInfo(element);
  const sourceCodeRepresentation = parseCodeRepresentation(element);

  const textContent = parseTextContent(element);
  const description = textContent.description;
  const protectionLevel = textContent.protectionLevelInfo;
  const constantValue = textContent.constantValue;

  return {
    name,
    versionInfo,
    sourceCodeRepresentation,
    description,
    protectionLevel,
    constantValue,
  };
};

export const serialize = (html: string): AndroidPermission[] =>
  parse(html, parserOptions)
    .querySelectorAll(permissionsSelector)
    .map((element) => transformHtmlElement(element));
