import isEmpty from 'lodash/isEmpty';
import { formConstants } from '../constants';
import {
  onboardingOnChangeFieldLevelValidationSchemas,
  onboardingOnBlurFieldLevelValidationSchemas,
  formValidationMap,
} from '.';
import { onboardingConstants } from '..';
import { removeNewLinesAndTrailingSpaces } from '@/lib/utils';
import { removeTrailingSpaces } from '@/lib/utils';
const {
  FIRST_LEVEL_PROPERTY,
  SECOND_LEVEL_PROPERTY,
  THIRD_LEVEL_PROPERTY,
  FOURTH_LEVEL_PROPERTY,
} = formConstants;
const { HR_DATA } = onboardingConstants;

export const validateFieldOnChange = async (
  name,
  parentName,
  value,
  allErrors,
  setError
) => {
  const hasParentName =
    onboardingOnChangeFieldLevelValidationSchemas[parentName] &&
    onboardingOnChangeFieldLevelValidationSchemas[parentName][name];
  const hasName =
    onboardingOnChangeFieldLevelValidationSchemas[name] &&
    onboardingOnChangeFieldLevelValidationSchemas[name];
  const schemaType = typeof parentName === 'string' ? hasParentName : hasName;
  try {
    schemaType &&
      (await schemaType.validate({
        [name]: value,
      }));
    setError(allErrors.slice(1));
  } catch ({ message }) {
    setError([message, ...allErrors]);
  }
};

export const validateFieldOnBlur = async (
  name,
  parentName,
  value,
  allErrors,
  setError
) => {
  const hasParentName =
    onboardingOnBlurFieldLevelValidationSchemas[parentName] &&
    onboardingOnBlurFieldLevelValidationSchemas[parentName][name];
  const hasName =
    onboardingOnBlurFieldLevelValidationSchemas[name] &&
    onboardingOnBlurFieldLevelValidationSchemas[name];
  const schemaType = typeof parentName === 'string' ? hasParentName : hasName;
  try {
    schemaType &&
      (await schemaType.validate({
        [name]: value,
      }));
    setError(allErrors.slice(1));
  } catch ({ message }) {
    setError([message, ...allErrors]);
  }
};

const validateImageUploads = (imageUploadNames, dispatch, data) => {
  const fileUploadErrors = {};
  const uploadIgnoreMap = {
    driverLicenseAndSocial: ['passportPicture', 'passportExpirationDate'],
    passport: ['driverLicense', 'socialSecurityCard'],
  };
  if (imageUploadNames && imageUploadNames.length > 0) {
    imageUploadNames.forEach(({ parent, child, field }) => {
      const errorsDispatch = dispatch(
        THIRD_LEVEL_PROPERTY,
        parent,
        child,
        field
      );
      if (
        data?.usesType &&
        uploadIgnoreMap[data.usesType.value].includes(field)
      ) {
        /*
          NOTE: these dispatches could easily be moved to the validateForm function.
          this was not apparent until after I'd written the final validation logic for
          onSubmit errors

          removes errors in case user switches upload types after error creation
        */
        errorsDispatch(data?.[child][field].value, []);
      } else if (data?.[child][field].value.length < 1) {
        // adds error if field value is empty string
        errorsDispatch('', ['This field is required']);
      } else {
        // removes error if field value exists
        errorsDispatch(data?.[child][field].value, []);
      }
    });
  }
  return { fileUploadErrors };
};

const validateForm = async (formData, formName, dispatch, imageUploadNames) => {
  const { fileUploadErrors } = validateImageUploads(
    imageUploadNames,
    dispatch,
    formData
  );
  const levels = [
    FIRST_LEVEL_PROPERTY,
    SECOND_LEVEL_PROPERTY,
    THIRD_LEVEL_PROPERTY,
    FOURTH_LEVEL_PROPERTY,
  ];
  const listOfItemsErrorsMap = [
    { field: 'residentialHistoryData', section: 'housingAndVehicleData' },
    { field: 'employmentData', section: 'licensingData' },
    { field: 'employmentSection', section: 'licensingData' },
    { field: 'referenceData', section: 'licensingData' },
  ];
  const listOfItemsErrorsFields = [];
  const errors = {};
  if (formName !== HR_DATA) {
    /*
      formName !== HR_DATA cancels further validation if user is on final page of wizard
      this should be removed if the HR data page becomes more complex
    */
    try {
      await formValidationMap[formName].validate(formData, {
        abortEarly: false,
        context: {
          hasVehicleRef: formData?.vehicleData?.hasVehicle?.value === '1',
        },
      });
      return true;
    } catch (ValidationError) {
      Object.values(ValidationError.inner).forEach((val) => {
        // builds a number of variables necessary to construct error state values
        const entry = Array.isArray(val) ? val : Object.entries(val);
        const { originalValue, path } = entry[4][1];
        const message = entry[7][1];
        const entityPathSplit = path.split('.');
        const entityPathDepth = entityPathSplit.length - 1;
        const args = [
          levels[entityPathDepth],
          formName,
          entityPathSplit[0],
          entityPathSplit[1],
        ];
        if (entityPathSplit[2] && entityPathSplit[2] !== 'value') {
          args.push(entityPathSplit[2]);
        }
        // updates error state within execution context and within form state
        if (!errors[path]) {
          // adds the first field level error to errors object within execution context
          errors[path] = { errors: [message], originalValue };
          if (path.split('.').length === 1) {
            /*
              adds the first list of items error to form state

              NOTE: we treat list of items errors differently than field level errors because they describe errors for
              a list of inputs. instead of living on the list item, they live within form state adjacently to the array
              of list items as a sibling property
            */
            listOfItemsErrorsFields.push(entityPathSplit[0]);
            dispatch(
              SECOND_LEVEL_PROPERTY,
              formName,
              `${entityPathSplit[0]}Errors`
            )([message], false);
          } else {
            // adds the first field level error to form state
            dispatch(...args)(originalValue, [message]);
          }
        } else {
          // adds the nth standard field level error to errors object within execution context
          errors[path].errors = [message, ...errors[path].errors];
          // adds the nth standard field level error to form state
          dispatch(...args)(originalValue, [message, ...errors[path].errors]);
        }
        // removes list of items errors from form state
        if (!listOfItemsErrorsFields.includes(entityPathSplit[0])) {
          listOfItemsErrorsMap.forEach(({ field, section }) => {
            if (!listOfItemsErrorsFields.includes(field)) {
              dispatch(
                SECOND_LEVEL_PROPERTY,
                section,
                `${field}Errors`
              )([], false);
            }
          });
        }
      });
      return false;
    }
  }
  return isEmpty(fileUploadErrors);
};

export const validateFormSubmission = async (
  formData,
  formName,
  dispatch,
  imageUploadNames
) => {
  return await validateForm(formData, formName, dispatch, imageUploadNames);
};

export const validateFileUpload = (fileType, file) => {
  switch (fileType) {
    case 'image':
      if (!file.size || file.size > 5242880) {
        return 'size';
      }
      if (!file.type || !file.type.startsWith('image/')) {
        return 'invalidType';
      }
      return true;
    default:
      return true;
  }
};

export const validateStringLength = (value, limit, limitType) => {
  let isValid = true;

  if (limitType === 'min') {
    if (value.length && removeNewLinesAndTrailingSpaces(value).length < limit) {
      isValid = false;
    }
  } else if (limitType === 'max') {
    if (value.length && removeNewLinesAndTrailingSpaces(value).length > limit) {
      isValid = false;
    }
  }

  return isValid;
};
