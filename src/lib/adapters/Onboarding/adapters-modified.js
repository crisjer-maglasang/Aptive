import { repKeyMap } from '.';
import onboardingConstants from '../../constants/onboarding';
import { formatCurrencyStringToNumber } from '@/lib/utils';
import { onboardingDataValues } from '../../constants/onboarding-data-values';

const {
  PASSPORT_PICTURE,
  DRIVER_LICENSE_PICTURE,
  SOCIAL_SECURITY_CARD_PICTURE,
  ROOMMATE_REQUEST,
  FACEBOOK_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  INSTAGRAM_LINK,
  ADDRESS_ZIP,
  CURRENT_ADDRESS_ZIP,
  FEET,
  INCHES,
  ADDRESS_COUNTRY,
  CURRENT_ADDRESS_COUNTRY,
  RENT_DEDUCTION_NAME,
  UPFRONT_PAY_NAME,
  UNIFORM_DEDUCTION_NAME,
  DRIVER_LICENSE_COUNTRY_ISSUED,
  VEHICLE_REGISTRATION_COUNTRY,
  COUNTRY_OF_BIRTH,
  ACTUAL_START_DATE,
  ACTUAL_END_DATE,
  DIRECT_DEPOSIT_ROUTING_NUMBER,
  DIRECT_DEPOSIT_ACCOUNT_NUMBER,
  DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
  REP_EXPERIENCES_DATA_NAME,
  COMPANY_ACCOUNT_NUMBERS,
  COMPANY_NAME,
  LAST_INDUSTRY_NAME,
  COMPANY_YEARS_SOLD,
  LAST_INDUSTRY_OTHER_NAME,
  CURRENT_SITUATION_NAME,
  SOURCE_OF_DISCOVERY_NAME,
  CUSTOMER_FACING_PHONE_NUMBER_NAME,
  SOCIAL_SECURITY_NUMBER,
} = onboardingConstants;

const { LAST_INDUSTRY_OTHER_VALUE } = onboardingDataValues;

class Height {

  feet;
  inches;

  toString() {
    return this.feet && this.inches
      ? `${this.feet}' ${this.inches}"`
      : '';
  }

}

// TODO: repId and userId are never passed to this function as of now.
const combinedDataAdapter = (data, repId, userId) => {
  const newData = {};
  const height = new Height();

  if (data.employmentData) {
    newData['employment'] = data.employmentData.map(
      ({ setId, id, employerName, employerStartDate, employerEndDate }) => {
        return {
          setId,
          id,
          [repKeyMap['employerName']]: employerName,
          [repKeyMap['employerStartDate']]: employerStartDate,
          [repKeyMap['employerEndDate']]: employerEndDate,
        };
      },
    );
  }

  if (data.referenceData) {
    newData['references'] = data.referenceData.map(
      ({ setId, id, referenceName, referenceRelation, referencePhoneNumber }) => {
        return {
          setId,
          id,
          [repKeyMap['referenceName']]: referenceName,
          [repKeyMap['referenceRelation']]: referenceRelation,
          [repKeyMap['referencePhoneNumber']]: referencePhoneNumber,
        };
      },
    );
  }

  if (data[REP_EXPERIENCES_DATA_NAME]) {
    newData['experiences'] = data[REP_EXPERIENCES_DATA_NAME].map(({
      setId,
      id,
      [COMPANY_ACCOUNT_NUMBERS]: numberOfAccounts,
      [COMPANY_YEARS_SOLD]: companyYearsSold,
      [COMPANY_NAME]: companyName,
      [LAST_INDUSTRY_NAME]: lastIndustry,
      [LAST_INDUSTRY_OTHER_NAME]: lastIndustryOther,
    }) => {
      return {
        setId,
        id,
        [repKeyMap[COMPANY_ACCOUNT_NUMBERS]]: numberOfAccounts,
        [repKeyMap[COMPANY_YEARS_SOLD]]: companyYearsSold,
        [repKeyMap[COMPANY_NAME]]: companyName,
        [repKeyMap[LAST_INDUSTRY_NAME]]: lastIndustry,
        ...((lastIndustry === LAST_INDUSTRY_OTHER_VALUE ? lastIndustryOther : null) && {[repKeyMap[LAST_INDUSTRY_OTHER_NAME]]: lastIndustryOther}),
      };
    });
  }

  Object.entries(data).forEach(([key, value]) => {
    const allowedEmptyFields = [
      PASSPORT_PICTURE,
      DRIVER_LICENSE_PICTURE,
      SOCIAL_SECURITY_CARD_PICTURE,
      ROOMMATE_REQUEST,
      FACEBOOK_LINK,
      LINKEDIN_LINK,
      TWITTER_LINK,
      INSTAGRAM_LINK,
      ACTUAL_START_DATE,
      ACTUAL_END_DATE,
      CURRENT_SITUATION_NAME,
      SOURCE_OF_DISCOVERY_NAME,
      CUSTOMER_FACING_PHONE_NUMBER_NAME,
    ];

    const countryFields = [
      ADDRESS_COUNTRY,
      CURRENT_ADDRESS_COUNTRY,
      DRIVER_LICENSE_COUNTRY_ISSUED,
      VEHICLE_REGISTRATION_COUNTRY,
      COUNTRY_OF_BIRTH,
    ];

    const paymentFields = [
      RENT_DEDUCTION_NAME,
      UPFRONT_PAY_NAME,
      UNIFORM_DEDUCTION_NAME,
    ];

    const directDepositFields = [
      DIRECT_DEPOSIT_ROUTING_NUMBER,
      DIRECT_DEPOSIT_ACCOUNT_NUMBER,
      DIRECT_DEPOSIT_CONFIRM_ACCOUNT_NUMBER,
    ];

    const newValue = value;
    const newKey = repKeyMap[key];

    switch (true) {
      case key === SOCIAL_SECURITY_NUMBER:
        if (newValue.includes('***-**-') || !newValue) {
          break;
        }
        newData[newKey] = newValue;
        break;
      case paymentFields.includes(key):
        newData[newKey] = formatCurrencyStringToNumber(value);
        break;
      case allowedEmptyFields.includes(key) && value?.length === 0:
        newData[newKey] = newValue;
        break;
      case value?.length === 0 || value === null:
        break;
      case key === ADDRESS_ZIP || key === CURRENT_ADDRESS_ZIP:
        newData[newKey] = value?.replace(/[^0-9]/g, '');
        break;
      case key === FEET || key === INCHES:
        height[key] = value;
        newData.height = height.toString();
        break;
      case directDepositFields.includes(key) && value !== '':
        if (value.includes('*')) {
          break;
        }
        newData[newKey] = value;
        break;
      case typeof newKey === 'undefined':
        break;
      case newKey === 'experience' && value !== '':
        newData[newKey] = +value;
        break;
      case countryFields.includes(key):
        newData[newKey] = +value;
        break;
      default:
        newData[newKey] = newValue;
    }
  });

  newData['repId'] = repId;
  newData['userId'] = userId;

  return newData;
};

const adapterMapModified = {
  combined: combinedDataAdapter,
};

export default adapterMapModified;
