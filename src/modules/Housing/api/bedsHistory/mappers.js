export const getBedsHistory = (response) => {
  const total = response?.meta?.total ?? 0;
  const history = response?.data?.map((record) => {
    const {
      changed_by_id,
      changed_by_name,
      team_id,
      team_name,
      complex_id,
      complex_name,
      apartment_id,
      unit_id,
      season_period,
      resident_id,
      resident_name,
      resident_type,
      move_type,
      bed_type,
      changed_at,
    } = record?.attributes ?? {};

    return {
      changed_by_id,
      changed_by_name,
      team_id,
      team_name,
      complex_id,
      complex_name,
      apartment_id,
      unit_id,
      season_period,
      resident_id,
      resident_name,
      resident_type,
      move_type,
      bed_type,
      changed_at,
    };
  });

  return { items: history, total };
}