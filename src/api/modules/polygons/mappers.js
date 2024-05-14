import { toastType } from '@/components/common';

export const getPolygonStatData = (response) => {
  const {
    statistics: {
      percentage,
      total_addresses: totalAddresses,
      total_qualified_addresses: qualifiedAddresses,
      total_reps: totalReps,
    },
    reps,
    pins,
    last_knocks,
  } = response?.data ?? {};

  const repIds = reps?.map((rep) => rep?.rep_id);

  return {
    percentage,
    totalAddresses,
    qualifiedAddresses,
    totalReps,
    reps: repIds,
    pins,
    lastKnocks: last_knocks,
  };
};

export const getUpdatedPolygonStatData = (response) => {
  const {
    statistics: {
      percentage,
      total_addresses: totalAddresses,
      total_qualified_addresses: qualifiedAddresses,
      total_reps: totalReps,
    },
    reps,
    last_knocks,
  } = response?.data?.statistics ?? {};

  const repIds = reps?.map((rep) => rep?.rep_id);

  return {
    percentage,
    totalAddresses,
    qualifiedAddresses,
    totalReps,
    reps: repIds,
    lastKnocks: last_knocks,
  };
};

export const getCreatePolygonToastData = (response) => {
  const { polygon_id } = response?.polygon ?? {};
  const toast = getToast(toastType.SUCCESS, `Polygon #${polygon_id} is created.`);

  return [toast];
};

export const getAssignPolygonToastData = (response) => {
  const { polygon_id } = response?.polygon ?? {};
  const toast = getToast(toastType.SUCCESS, `Polygon #${polygon_id} is assigned.`);

  return [toast];
};

export const getClearOutcomesToastData = () => {
  const toast = getToast(toastType.SUCCESS, 'Outcomes are cleared');

  return [toast];
};

export const getActivatePolygonToastData = (response) => {
  const { polygon_id } = response?.polygon ?? {};
  const toast = getToast(toastType.SUCCESS, `Polygon #${polygon_id} is activated.`);

  return [toast];
};

export const getAssignPolygonData = (response, reps) => {
  return Object.entries(response).map(([key, value]) => {
    if (value?.success) {
      if (value
        ?.polygon
        ?.license_information
        ?.filter((licenseInfo) => !licenseInfo.has_access_to_work).length === reps.length
      ) {
        return getToast(toastType.ERROR, `Polygon #${key}: reps can't be updated.`);
      } else {
        return getToast(toastType.SUCCESS, `Polygon #${key}: reps are updated.`);
      }
    } else {
      const [errorMessage] = value?.errors ?? {};

      return getToast(toastType.ERROR, `Polygon #${key}: reps can't be updated.`, errorMessage);
    }
  });
};

export const getUnassignPolygonData = (response) => {
  return Object.entries(response).map(([key, value]) => {
    if (value?.success) {
      return getToast(toastType.SUCCESS, `Polygon #${key} is unassigned.`);
    } else {
      const [errorMessage] = value?.errors ?? {};

      return getToast(toastType.ERROR, `Polygon #${key} can't be unassigned.`, errorMessage);
    }
  });
};

export const getDeactivatePolygonToastsData = (response) => {
  return Object.entries(response).map(([key, value]) => {
    if (value?.success) {
      return getToast(toastType.SUCCESS, `Polygon #${key} is deactivated.`);
    } else {
      const [errorMessage] = value?.errors ?? {};

      return getToast(toastType.ERROR, `Polygon #${key} can't be deactivated.`, errorMessage);
    }
  });
};

export const getDeletePolygonToastsData = (response) => {
  return Object.entries(response).map(([key, value]) => {
    if (value?.success) {
      return getToast(toastType.SUCCESS, `Polygon #${key} is deleted.`);
    } else {
      const [errorMessage] = value?.errors ?? {};

      return getToast(toastType.ERROR, `Polygon #${key} can't be deleted.`, errorMessage);
    }
  });
};

const getToast = (type, message, details) => ({
  type,
  message,
  details: details ?? null,
});

export const getSuccessfulPolygonIds = (response) => {
  return Object.keys(response).map((id) => Number(id));
};

export const getLicensingRestrictionsForPolygons = (response) => {
  let licensingInfo = {};

  for (const polygonId in response) {
    const licensingData = response[polygonId]?.polygon?.licensing_information;

    licensingData?.forEach((licensingRepInfo) => {
      licensingInfo = mapLicensingInfoItem(licensingInfo, licensingRepInfo);
    });
  }

  return licensingInfo;
};

export const getLicensingRestrictionsForPolygon = (response) => {
  let licensingInfo = {};
  const licensingData = response?.licensing_information;

  licensingData?.forEach((licensingRepInfo) => {
    licensingInfo = mapLicensingInfoItem(licensingInfo, licensingRepInfo);
  });

  return licensingInfo;
};

const mapLicensingInfoItem = (currentLicensingInfo, licensingRepInfo) => {
  currentLicensingInfo[licensingRepInfo.rep_id] ??= {
    rep_id: licensingRepInfo.rep_id,
    rep_full_name: licensingRepInfo.rep_full_name,
    has_access_to_work: licensingRepInfo.has_access_to_work,
    states: [],
    counties: [],
    municipalities: [],
  };

  currentLicensingInfo[licensingRepInfo.rep_id].has_access_to_work &&= licensingRepInfo.has_access_to_work;

  currentLicensingInfo[licensingRepInfo.rep_id].states.push({
    name: licensingRepInfo.state_name,
    id: licensingRepInfo.state_id,
    is_license_needed: licensingRepInfo.is_state_license_required,
    has_license: licensingRepInfo.has_state_license,
  });

  currentLicensingInfo[licensingRepInfo.rep_id].counties.push({
    name: licensingRepInfo.county_name,
    id: licensingRepInfo.county_id,
    is_license_needed: licensingRepInfo.is_county_license_required,
    has_license: licensingRepInfo.has_county_license,
  });

  currentLicensingInfo[licensingRepInfo.rep_id].municipalities.push({
    name: licensingRepInfo.municipality_name,
    id: licensingRepInfo.municipality_id,
    is_license_needed: licensingRepInfo.is_municipality_license_required,
    has_license: licensingRepInfo.has_municipality_license,
  });

  return currentLicensingInfo;
};

export const getRestrictedReps = (response) => {
  const restrictedReps = {};

  for (const polygonId in response) {
    const restrictedRepsForPolygon = [];

    response[polygonId]?.polygon?.licensing_information.forEach((licensingInfo) => {
      if (!licensingInfo.has_access_to_work) {
        restrictedRepsForPolygon.push(licensingInfo.rep_id);
      }
    });

    restrictedReps[polygonId] = restrictedRepsForPolygon;
  }

  return restrictedReps;
};

export const getPolygonDispositions = (response) => {
  const { data, total = 0 } = response ?? {};

  const items = [];
  data?.forEach(({
    polygon_id,
    team_name,
    not_knocked,
    knocked_once,
    knocked_twice,
    completed,
  }) => {
    items.push([
      polygon_id,
      team_name,
      not_knocked,
      knocked_once,
      knocked_twice,
      completed,
    ]);
  });

  return { items, total };
};
