export const getCountriesStates = (response) => {
  const countries = [];
  const states = {};

  response?.data?.forEach((country) => {
    const {
      name,
      country_id: countryId,
      states: countryStates,
    } = country?.attributes ?? {};

    countries.push({ name, value: String(countryId) });

    states[countryId] = countryStates?.map((state) => {
      const { name, province_code: value } = state ?? {};

      return { name, value };
    });
  });

  return { items: { countries, states } };
};
