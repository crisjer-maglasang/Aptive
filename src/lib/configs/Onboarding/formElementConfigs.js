import { onboardingConstants, onboardingDataValues } from '../../constants';
import { dataKeys } from '@/lib/adapters';

const { TEAM_LEADER, RECRUIT, REGIONAL } = dataKeys;

const {
  PASSPORT_LABEL,
  DRIVER_AND_SOCIAL_LABEL,
} = onboardingConstants;

export const maritalStatusRadioConfig = [
  {
    label: 'Married',
    value: onboardingDataValues.MARRIED_VALUE,
    id: 'maritalStatusMarried',
  },
  { label: 'Single', value: onboardingDataValues.SINGLE_VALUE, id: 'maritalStatusSingle' },
];

export const housingStatusRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.YES_VALUE, id: 'housingStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'housingStatusFalse',
  },
];

export const segwayStatusRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.ONE_VALUE, id: 'segwayStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.ZERO_VALUE,
    id: 'segwayStatusFalse',
  },
];

export const repExperienceRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.ONE_VALUE, id: 'repExperienceTrue' },
  { label: 'No', value: onboardingDataValues.ZERO_VALUE, id: 'repExperienceFalse' },
];

export const vehicleStatusRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.YES_VALUE, id: 'vehicleStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'vehicleStatusFalse',
  },
];

export const citizenStatusRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.YES_VALUE, id: 'citizenStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'citizenStatusFalse',
  },
];

export const visibleMarkingsRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.YES_VALUE, id: 'visibleMarkingsStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'visibleMarkingsStatusFalse',
  },
];

export const convictionStatusRadioConfig = [
  { label: 'Yes', value: onboardingDataValues.YES_VALUE, id: 'convictedOfCrimeStatusTrue' },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'convictedOfCrimeStatusFalse',
  },
];

export const usesPassportRadioConfig = [
  { label: PASSPORT_LABEL, value: onboardingDataValues.PASSPORT_VALUE, id: 'usesPassport' },
  {
    label: DRIVER_AND_SOCIAL_LABEL,
    value: onboardingDataValues.DL_AND_SOCIAL_VALUE,
    id: 'usesDriverLicenseAndSocialSecurityCard',
  },
];

export const addressesRadioConfig = [
  {
    label: 'Yes',
    value: onboardingDataValues.YES_VALUE,
    id: 'addressesDifferYes',
  },
  {
    label: 'No',
    value: onboardingDataValues.NO_VALUE,
    id: 'addressesDifferNo',
  },
];

export const roomSelectOptions = [
  { value: 1, name: '1 Room' },
  { value: 2, name: '2 Rooms' },
  { value: 3, name: '3 Rooms' },
];

export const genderSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { name: 'Male', value: onboardingDataValues.MALE_VALUE },
  { name: 'Female', value: onboardingDataValues.FEMALE_VALUE },
  { name: 'Nonbinary', value: onboardingDataValues.OTHER_VALUE },
  { name: 'Prefer not to disclose', value: onboardingDataValues.NONE_VALUE },
];

export const monthDateSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: 'Jan', name: onboardingDataValues.JAN_VALUE },
  { value: 'Feb', name: onboardingDataValues.FEB_VALUE },
  { value: 'Mar', name: onboardingDataValues.MAR_VALUE },
  { value: 'Apr', name: onboardingDataValues.APR_VALUE },
  { value: 'May', name: onboardingDataValues.MAY_VALUE },
  { value: 'Jun', name: onboardingDataValues.JUN_VALUE },
  { value: 'Jul', name: onboardingDataValues.JUL_VALUE },
  { value: 'Aug', name: onboardingDataValues.AUG_VALUE },
  { value: 'Sep', name: onboardingDataValues.SEP_VALUE },
  { value: 'Oct', name: onboardingDataValues.OCT_VALUE },
  { value: 'Nov', name: onboardingDataValues.NOV_VALUE },
  { value: 'Dec', name: onboardingDataValues.DEC_VALUE },
];

export const vehicleColorSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: 'Beige', name: onboardingDataValues.BEIGE_VALUE },
  { value: 'Black', name: onboardingDataValues.BLACK_VALUE },
  { value: 'Blue', name: onboardingDataValues.BLUE_VALUE },
  { value: 'Brown', name: onboardingDataValues.BROWN_VALUE },
  { value: 'Gold', name: onboardingDataValues.GOLD_VALUE },
  { value: 'Gray', name: onboardingDataValues.GRAY_VALUE },
  { value: 'Green', name: onboardingDataValues.GREEN_VALUE },
  { value: 'Orange', name: onboardingDataValues.ORANGE_VALUE },
  { value: 'Purple', name: onboardingDataValues.PURPLE_VALUE },
  { value: 'Red', name: onboardingDataValues.RED_VALUE },
  { value: 'Silver', name: onboardingDataValues.SILVER_VALUE },
  { value: 'White', name: onboardingDataValues.WHITE_VALUE },
  { value: 'Yellow', name: onboardingDataValues.YELLOW_VALUE },
];

export const shoeSizeSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: '5', name: '5' },
  { value: '5.5', name: '5.5' },
  { value: '6', name: '6' },
  { value: '6.5', name: '6.5' },
  { value: '7', name: '7' },
  { value: '7.5', name: '7.5' },
  { value: '8', name: '8' },
  { value: '8.5', name: '8.5' },
  { value: '9', name: '9' },
  { value: '9.5', name: '9.5' },
  { value: '10', name: '10' },
  { value: '10.5', name: '10.5' },
  { value: '11', name: '11' },
  { value: '11.5', name: '11.5' },
  { value: '12', name: '12' },
  { value: '12.5', name: '12.5' },
  { value: '13', name: '13' },
  { value: '13.5', name: '13.5' },
  { value: '14', name: '14' },
  { value: '14.5', name: '14.5' },
  { value: '15', name: '15' },
  { value: '15.5', name: '15.5' },
  { value: '16', name: '16' },
  { value: '16.5', name: '16.5' },
  { value: '17', name: '17' },
  { value: '17.5', name: '17.5' },
  { value: '18', name: '18' },
];

export const waistSizeSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: '24', name: '24' },
  { value: '26', name: '26' },
  { value: '28', name: '28' },
  { value: '30', name: '30' },
  { value: '32', name: '32' },
  { value: '34', name: '34' },
  { value: '36', name: '36' },
  { value: '38', name: '38' },
  { value: '40', name: '40' },
  { value: '42', name: '42' },
  { value: '44', name: '44' },
  { value: '46', name: '46' },
  { value: '48', name: '48' },
  { value: '50', name: '50' },
  { value: '52', name: '52' },
];

export const jacketSizeSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: 'XS', name: onboardingDataValues.XS_VALUE },
  { value: 'S', name: onboardingDataValues.S_VALUE },
  { value: 'M', name: onboardingDataValues.M_VALUE },
  { value: 'L', name: onboardingDataValues.L_VALUE },
  { value: 'XL', name: onboardingDataValues.XL_VALUE },
  { value: 'XXL', name: onboardingDataValues.XXL_VALUE },
  { value: 'XXXL', name: onboardingDataValues.XXXL_VALUE },
  { value: 'XXXXL', name: onboardingDataValues.XXXXL_VALUE },
];

export const shirtSizeSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: 'XS', name: onboardingDataValues.XS_VALUE },
  { value: 'S', name: onboardingDataValues.S_VALUE },
  { value: 'M', name: onboardingDataValues.M_VALUE },
  { value: 'L', name: onboardingDataValues.L_VALUE },
  { value: 'XL', name: onboardingDataValues.XL_VALUE },
  { value: 'XXL', name: onboardingDataValues.XXL_VALUE },
  { value: 'XXXL', name: onboardingDataValues.XXXL_VALUE },
  { value: 'XXXXL', name: onboardingDataValues.XXXXL_VALUE },
];

export const hatSizeSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { value: 'S/M', name: onboardingDataValues.S_M_VALUE },
  { value: 'L/XL', name: onboardingDataValues.L_XL_VALUE },
];

export const racialBackgroudSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { name: 'White', value: onboardingDataValues.WHITE_VALUE },
  { name: 'Asian', value: onboardingDataValues.ASIAN_VALUE },
  { name: 'Black or African American', value: onboardingDataValues.BLACK_OR_AFRICAN_VALUE },
  {
    value: onboardingDataValues.NATIVE_AMERICAN_VALUE,
    name: 'Native American or Alaskan Native',
  },
  {
    value: onboardingDataValues.NATIVE_HAWAIIAN_VALUE,
    name: 'Native Hawaiian or Other Pacific Islander',
  },
  { value: onboardingDataValues.HISPANIC_OR_LATINO_VALUE, name: 'Hispanic or Latino' },
  { value: onboardingDataValues.TWO_OR_MORE_RACES_VALUE, name: 'Two or more races' },
  { value: onboardingDataValues.PREFER_NOT_TO_DISCLOSE_VALUE, name: onboardingDataValues.PREFER_NOT_TO_DISCLOSE_VALUE },
  { value: onboardingDataValues.OTHER_VALUE, name: onboardingDataValues.OTHER_VALUE },
];

export const hairColorSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { name: 'Blonde', value: onboardingDataValues.BLONDE_VALUE },
  { name: 'Black', value: onboardingDataValues.BLACK_VALUE },
  { name: 'Brown', value: onboardingDataValues.BROWN_VALUE },
  { name: 'Red', value: onboardingDataValues.RED_VALUE },
  { name: 'Other', value: onboardingDataValues.OTHER_VALUE },
];

export const eyeColorSelectOptions = [
  { value: '', name: onboardingDataValues.SELECT_VALUE },
  { name: 'Blue', value: onboardingDataValues.BLUE_VALUE },
  { name: 'Brown', value: onboardingDataValues.BROWN_VALUE },
  { name: 'Green', value: onboardingDataValues.GREEN_VALUE },
  { name: 'Hazel', value: onboardingDataValues.HAZEL_VALUE },
];

export const treeSearchRegionalOptions = [
  { value: TEAM_LEADER, label: 'Team Lead' },
  { value: RECRUIT, label: 'Recruit' },
];

export const treeSearchAdminOptions = [
  { value: REGIONAL, label: 'Regional' },
  { value: TEAM_LEADER, label: 'Team Lead' },
  { value: RECRUIT, label: 'Recruit' },
];

export const saveButton = 'Save';

export const cancelButton = 'Cancel';

export const defaultSelectOption = [
  { value: '', name: '-- Select --' },
];
