export const prepareDataForCreateComplex = (data) => {
  const { type, dealer_id, name, email, phone, team_ids, city, state, zip, street, contact } = data;

  return {
    type,
    dealer_id,
    name,
    email,
    phone: phone?.replace(/[^0-9]/g, ''),
    team_ids,
    contact,
    address: {
      city,
      state,
      zip: zip?.replace(/[^0-9]/g, ''),
      street,
    },
  };
};

export const prepareDataForApartment = (data) => {
  return data;
};

export const getComplexes = (response) => {
  const total = response?.meta?.total ?? 0;
  const complexes = response?.data?.map((complex) => {
    const {
      id,
      name,
      address,
      apartments,
    } = complex?.attributes ?? {};

    return {
      id,
      name,
      address,
      apartments,
    };
  });

  return { items: complexes, total };
};

export const getComplexSummaries = (response) => {
  const complexes = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return complexes.map((complex) => {
    const {
      id: value,
      name,
    } = complex?.attributes ?? {};

    return {
      name,
      value,
    };
  });
}

export const getApartmentSummaries = (response) => {
  const apartments = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return apartments.map((apartment) => {
    const {
      id: value,
      unit_id: label,
    } = apartment?.attributes ?? {};

    return {
      value,
      label,
    };
  });
};

export const getPaymentMethods = (response) => {
  const paymentMethods = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return paymentMethods.map((paymentMethod) => {
    const {
      id: value,
      name,
    } = paymentMethod?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};

export const getPaymentTypes = (response) => {
  const paymentTypes = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return paymentTypes.map((paymentType) => {
    const {
      id: value,
      name,
    } = paymentType?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};

export const prepareDataForDocumentUpload = (data) => {
  const formData = new FormData();
  formData.append('document_file', data);
  return formData;
};

export const getTeamsStatistics = (response) => {
  const total = response?.meta?.total ?? 0;
  const teams = response?.data?.map((team) => {
    const {
      team_id: id,
      team_name: name,
      complexes_number: number,
      total_rooms,
      total_beds,
      total_available_beds,
      beds_availability_percentage,
      total_couches,
      total_available_couches,
      couches_availability_percentage,
      total_sleeping_spots,
      total_available_sleeping_spots,
      sleeping_spots_availability_percentage,
    } = team?.attributes ?? {};

    return {
      id,
      name,
      number,
      total_rooms,
      total_beds,
      total_available_beds,
      beds_availability_percentage,
      total_couches,
      total_available_couches,
      couches_availability_percentage,
      total_sleeping_spots,
      total_available_sleeping_spots,
      sleeping_spots_availability_percentage,
    };
  });

  return { items: teams, total };
};

export const getComplexesStatistics = (response) => {
  const total = response?.meta?.total ?? 0;
  const complexes = response?.data?.map((team) => {
    const {
      complex_id: id,
      complex_name: name,
      teams_number: number,
      total_rooms,
      total_beds,
      total_available_beds,
      beds_availability_percentage,
      total_couches,
      total_available_couches,
      couches_availability_percentage,
      total_sleeping_spots,
      total_available_sleeping_spots,
      sleeping_spots_availability_percentage,
    } = team?.attributes ?? {};

    return {
      id,
      name,
      number,
      total_rooms,
      total_beds,
      total_available_beds,
      beds_availability_percentage,
      total_couches,
      total_available_couches,
      couches_availability_percentage,
      total_sleeping_spots,
      total_available_sleeping_spots,
      sleeping_spots_availability_percentage,
    };
  });

  return { items: complexes, total };
};

export const getComplexesWithAddress = (response) => {
  const total = response?.meta?.total ?? 0;
  const complexes = response?.data?.map((complex) => {
    const {
      address: {
        city,
        state,
        street,
        zip,
      },
      name,
      id,
      is_archived,
    } = complex?.attributes ?? {};

    return {
      address: {
        city,
        state,
        street,
        zip,
      },
      name,
      id,
      is_archived,
    };
  });

  return { items: complexes, total };
};

export const getApartmentsWithBeds = (response) => {
  const total = response?.meta?.total ?? 0;
  const apartments = response?.data?.map((apartment) => {
    const {
      id,
      is_archived,
      unit_id,
      has_couch,
      total_rooms,
      total_beds,
      available_beds,
    } = apartment?.attributes ?? {};

    return {
      id,
      is_archived,
      unit_id,
      has_couch,
      total_rooms,
      total_beds,
      available_beds,
    };
  });

  return { items: apartments, total };
}
