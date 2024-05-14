// TODO: not used anymore as of now.

import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import { repKeyMap } from '.';

const flattenData = (incomingData) => {
  const flattenedData = {};

  flatten(Object.entries(incomingData)).forEach((entry) => (
    typeof entry === 'object' ? merge(flattenedData, entry) : null
  ));

  return flattenedData;
};

const personalDataAdapter = (incomingData, repId, userId) => {
  const flattenedData = flattenData(incomingData);
  const newData = {};

  Object.entries(flattenedData).forEach((entry) => {
    const newValue = flattenedData[entry[0]].value;
    const newKey = repKeyMap[[entry[0]]];
    switch (true) {
      case entry[0] === 'currentAddressExists':
        break;
      case entry[0] === 'profilePicture':
        break;
      default:
        newData[newKey] = newValue;
    }
  });

  newData['repId'] = parseInt(repId);
  newData['userId'] = parseInt(userId);

  return newData;
};

const housingAndVehicleDataAdapter = (incomingData, repId, userId) => {
  const data = merge({}, incomingData);
  const flattenedData = flattenData(incomingData);
  const newData = {};
  let newListItem = {};

  newData['residential'] = Object.entries(data.residentialHistoryData).map(
    ([, value]) => {
      newListItem = {};
      for (const residentialHistoryKey in value) {
        newListItem[residentialHistoryKey] = value[residentialHistoryKey]?.value
          ? value[residentialHistoryKey].value
          : value[residentialHistoryKey];
      }

      return newListItem;
    },
  );

  Object.entries(flattenedData).forEach((entry) => {
    const newValue = flattenedData[entry[0]].value;
    const newKey = repKeyMap[[entry[0]]];
    switch (true) {
      case !isNaN(parseFloat(entry[0])) && isFinite(entry[0]):
        return;
      default:
        newData[newKey] = newValue;
    }
  });

  newData['repId'] = parseInt(repId);
  newData['userId'] = parseInt(userId);

  return newData;
};
const uniformAndSwagDataAdapter = (incomingData, repId, userId) => {
  const flattenedData = flattenData(incomingData);
  const newData = {};

  Object.entries(flattenedData).forEach((entry) => {
    const newValue = flattenedData[entry[0]].value;
    const newKey = repKeyMap[[entry[0]]];
    newData[newKey] = newValue;
  });

  newData['repId'] = parseInt(repId);
  newData['userId'] = parseInt(userId);

  return newData;
};

const licensingDataAdapter = (incomingData, repId, userId) => {
  const data = merge({}, incomingData);
  const flattenedData = flattenData(incomingData);
  const newData = {};
  let newListItem = {};

  newData['employment'] = Object.entries(data.employmentData).map(
    ([, value]) => {
      newListItem = {};
      for (const employerKey in value) {
        newListItem[employerKey] = value[employerKey]?.value
          ? value[employerKey].value
          : value[employerKey];
      }

      return newListItem;
    },
  );

  newData['repExperience'] = Object.entries(data.repExperienceData).map(
    ([, value]) => {
      newListItem = {};
      for (const experienceKey in value) {
        newListItem[experienceKey] = value[experienceKey]?.value
          ? value[experienceKey].value
          : value[experienceKey];
      }

      return newListItem;
    },
  );

  newData['references'] = Object.entries(data.referenceData).map(
    ([, value]) => {
      newListItem = {};
      for (const referenceKey in value) {
        newListItem[referenceKey] = value[referenceKey]?.value
          ? value[referenceKey].value
          : value[referenceKey];
      }

      return newListItem;
    },
  );

  Object.entries(flattenedData).forEach((entry) => {
    const newValue = flattenedData[entry[0]].value;
    const newKey = repKeyMap[[entry[0]]];

    switch (true) {
      case !isNaN(parseFloat(entry[0])) && isFinite(entry[0]):
        return;
      case entry[0] === 'height':
        const feet = entry[1].feet.value;
        const inches = entry[1].inches.value;
        newData[newKey] = `${feet} ${inches}`;
        break;
      default:
        newData[newKey] = newValue;
    }
  });

  newData['repId'] = parseInt(repId);
  newData['userId'] = parseInt(userId);

  return newData;
};

const adapterMap = {
  personalData: personalDataAdapter,
  housingAndVehicleData: housingAndVehicleDataAdapter,
  uniformAndSwagData: uniformAndSwagDataAdapter,
  licensingData: licensingDataAdapter,
};

export default adapterMap;
