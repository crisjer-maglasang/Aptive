export const getRecruiters = (response) => ({
  items: response?.data?.map(({ attributes }) => {
    const { user_id: value, full_name: label, dealer_id: dealerId } = attributes;

    return { value, label, dealerId };
  }) ?? [],
});

export const getRecruiterManagers = (response) => ({
  items: response?.data?.map(({ attributes }) => {
    const { manager_id: id, role, name } = attributes;

    return { id, role, name };
  }) ?? [],
});

export const getRecruitingOffices = (response) => ({
  items: response?.data?.map(({ attributes }) => {
    const { office_id: value, name: label } = attributes;

    return { label, value };
  }) ?? [],
});
