/*
 * ############################
 * # Imports
 * ############################
 */

import protectionLevelBase from '../../res/protection-levels-base.json';
import protectionLevelExtra from '../../res/protection-levels-extra.json';
import protectionLevelAdditions from '../../res/protection-levels-additions.json';

/// Types
import { ProtectionLevel } from '../interfaces/protection-level';
import { ProtectionLevelInfo } from '../interfaces/protection-level-info';

/*
 * ############################
 * # Properties
 * ############################
 */

/**
 * Array of the base protection levels a permission can have.
 * Consisting of the actual base permissions and the extra permissions,
 * like the restriction to the system or to vendors.
 */
const standardProtectionLevels: ProtectionLevel[] = [...protectionLevelBase, ...protectionLevelExtra];

/**
 * List of all protection levels that can be used in tandem with the
 * base protection levels.
 */
const additionalProtectionLevels: ProtectionLevel[] = protectionLevelAdditions;

/**
 * Regex for splitting the raw protection level string.
 */
const protectionLevelSplitter: RegExp = /(?!=signature)\|(?!privileged)/i;

/*
 * ############################
 * # Convenience
 * ############################
 */

/**
 * Fallback object for unknown or not defined protection levels.
 * @exports
 */
const protectionLevelUnassigned: ProtectionLevelInfo = {
  level: {
    name: 'Unassigned',
    value: null,
    description:
      'This permissions has no official protection level assigned. This is a strong indicator for permissions, that are reserved for the system, added by a vendor through a signature specification or are deprecated! Please check the description of the permissions and proceed with caution!',
  },
  hasAdditions: false,
  additions: [],
};

/**
 * Reducer function that iterates over all additional parts of a raw protection level string and maps them to their
 * appropriate addition representation.
 * @param collector Array in which all recognized additional protection levels are stored and subsequently returned.
 * @param currentElement The current raw protection level addition string.
 * @returns An array containing additional protection levels.
 */
const protectionLevelAdditionsReducer = (collector: ProtectionLevel[], currentElement: string): ProtectionLevel[] => {
  const protectionLevel = additionalProtectionLevels.find((level) => currentElement.trim().includes(level.name));

  /** Check if the {@link currentElement} belongs to a known protection level. */
  if (protectionLevel) {
    collector.push(protectionLevel);
  }

  return collector;
};

/*
 * ############################
 * # Business Logic
 * ############################
 */

/**
 * Parses a raw string that represents the protection levels of an Android permissions and maps them
 * into an object.
 * @param rawProtectionLevels String containing the raw protection levels belonging to an Android Permission.
 * E.g. 'normal', 'signature|privileged', 'normal|installer'.
 * @returns Object containing the base protection level and possible additional protection levels.
 * @exports
 */
export const getProtectionLevelsFromString = (rawProtectionLevels: string | undefined): ProtectionLevelInfo => {
  if (!rawProtectionLevels) {
    return protectionLevelUnassigned;
  }

  const protectionLevelParts = rawProtectionLevels.split(protectionLevelSplitter);

  /** If the no parts are found, the protection level is unknown, returning {@link protectionLevelUnassigned}. */
  if (!protectionLevelParts.length) {
    return protectionLevelUnassigned;
  }

  /** Find the base protection level, one of: 'normal', 'dangerous', 'signature', 'signature|privileged' */
  const plBaseRaw = protectionLevelParts[0]!.trim();
  const plBase = standardProtectionLevels.find((level) => plBaseRaw.trim().includes(level.name));

  /** Base does not exist and it is not a restricted permission, return {@link protectionLevelUnassigned} */
  if (!plBase) {
    return protectionLevelUnassigned;
  }

  /** Parse additional protection levels like 'development', 'installer' and 'verifier'. */
  let additions: ProtectionLevel[] = [];

  /** Check if additional protection levels exist  */
  if (protectionLevelParts.length > 1) {
    additions = protectionLevelParts.slice(1).reduce(protectionLevelAdditionsReducer, []);
  }

  /** Get boolean flag for additions shorthand check */
  const hasAdditions = additions.length !== 0;

  /** Return finished {@link ProtectionLevelInfo} object. */
  return {
    level: plBase!, /// Force unwrap allowed, because of previous null check.
    hasAdditions,
    additions,
  };
};
