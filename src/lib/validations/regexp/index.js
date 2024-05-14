/**
 * Disallow start with 000, or 666, or digit of 9:
 *   000-xx-xxxx ❌
 *   666-xx-xxxx ❌
 *   9xx-xx-xxxx ❌
 *
 * Disallow double zero in the second segment:
 *   xxx-00-xxxx ❌
 *
 * Allow trailing four zeros:
 *   xxx-xx-0000 ☑️
 */
export const SSN_REGEX = /^(?!000|666)[0-8]\d{2}-(?!00)\d{2}-\d{4}$/;
export const SSN_MASKED_REGEX = /^((?!000|666)[0-8]\d{2}|\*{3})-((?!00)\d{2}|\*{2})-\d{4}$/;

export const LAST_FOUR_SSN_REGEX = /^\d{4}$/;

// Any number (including starting with 0's)
export const NUMBERS_ONLY = /^[0-9]*$/gm;

// excluding 0
export const NUMBERS_REGEX = /^[1-9][0-9]*$/gm;

// 1900 - 2099
export const YEAR_REGEX = /^((?:19|20)[0-9]{2})$/;

// Feet 1 - 99
export const FEET_REGEX = /^[1-9][0-9]?$/;

// Inches 1 - 12
export const INCHES_REGEX = /(^0?[1-9]$)|(^1[0-2]$)/;

// Weight 0 - 660
export const WEIGHT_REGEX = /^([1-9]|[1-9][0-9]|[1-5][0-9]{2}|6[0-5][0-9]|660)$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const PHONE_REGEX = /^\([1-9]\d{2}\) \d{3}-\d{4}$/;

export const POSTAL_CODE_REGEX = /^\d{5}(?:-\d{1,4})?$/;

export const DRIVER_LICENSE_NUMBER_REGEX = /^\S{2,20}$/;

// Bank account number (Assuming it's a US bank account which typically has a range from 1 to 17 digits)
export const ACCOUNT_NUMBER_REGEX = /^((\*{13}\d{4})|(\d{1,17}))$/;

export const ACCOUNT_NUMBER_SCHEMA_REGEX = /^\d{1,17}$/;

// Bank routing number (US standard is a 9 digit number)
export const ROUTING_NUMBER_REGEX = /^((\*{5}\d{4})|(\d{9}))$/;

/* Leger Form */
// Currency Format -$999,999.99 - $999,999.99
export const LEDGER_CURRENCY_REGEX = /^-?(0|\$[0-9]{1,3}(?:,[0-9]{3})?(?:\.[0-9]{1,2})?)$/;

// Ledger Vendor number
export const LEDGER_VENDOR_REGEX = /\b\d{2,5}\b/;
