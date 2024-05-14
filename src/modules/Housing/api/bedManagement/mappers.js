export const getUnBeddedSummaries = (response) => {
  const total = response?.meta?.total ?? 0;
  const unBeddedSummaries = response?.data?.map((summary) => {
    const {
      id,
      name,
      bed_allotment_type,
      email,
      phone_number,
      team_id,
      team_name,
    } = summary?.attributes ?? {};

    const { label: type_of_room, number_of_rooms } =
      summary?.attributes?.apartment_status ?? {};

    return {
      id,
      name,
      bed_allotment_type,
      email,
      phone_number,
      type_of_room,
      number_of_rooms,
      team_id,
      team_name,
    };
  });
  return { items: unBeddedSummaries, total };
};

export const prepareDataForGetUnBeddedSummaries = (data) => {
  const {
    team_id,
    complex_id,
    search_query,
    bed_allotment_type,
    season_period,
  } = data;

  return {
    ...(team_id && { team_id }),
    ...(complex_id && { complex_id }),
    ...(search_query && { search_query }),
    ...(bed_allotment_type && { bed_allotment_type }),
    ...(season_period && { season_period }),
  };
};

export const getBedManagement = (response) => {
  const total = response?.meta?.total ?? 0;
  const bedManagementData = response?.data?.map((bed) => {
    const data = bed?.attributes ?? {};

    return data;
  });
  return { items: bedManagementData, total };
};

export const prepareDataForGetBedManagement = (data) => {
  const {
    complex_ids,
    team_ids,
    search_query,
    page,
    season_period,
    recruiting_season_id,
    apartment_types,
    number_of_rooms,
    number_of_available_sleeping_spots,
  } = data;

  return {
    page,
    ...(season_period
      ? { season_period }
      : { season_period: 'regular_season' }),
    ...(complex_ids && { complex_ids }),
    ...(team_ids && { team_ids }),
    ...(search_query && { search_query }),
    ...(recruiting_season_id && { recruiting_season_id }),
    ...(apartment_types && { apartment_types: [apartment_types] }),
    ...(number_of_rooms && { number_of_rooms }),
    ...(number_of_available_sleeping_spots && {
      number_of_available_sleeping_spots,
    }),
  };
};

export const prepareDataForUnassignRep = (data) => {
  const {
    user_type: bed_allotment_type,
    user_id: resident_id,
    season_period,
  } = data;

  return {
    resident_id,
    bed_allotment_type,
    ...(season_period
      ? { season_period }
      : { season_period: 'regular_season' }),
  };
};

export const prepareDataForAssignRep = (data) => {
  const {
    user_type: bed_allotment_type,
    user_id: resident_id,
    assignment_type,
    room_id,
    bed_number,
  } = data;

  return {
    resident_id,
    bed_allotment_type,
    assignment_type,
    ...(room_id && { room_id }),
    ...(bed_number && { bed_number }),
  };
};
