// TODO: not used anymore as of now.

export const normalizeAddLeadsData = (data) => {
  return {
    userId: data?.['user_id'] ? data?.['user_id'] : '',
    repId: data?.['id'] ? data?.['id'] : '',

    //Add Lead Data
    firstName: data?.['first_name'] ? data?.['first_name'] : '',
    lastName: data?.['last_name'] ? data?.['last_name'] : '',
    email: data?.['email'] ? data?.['email'] : '',
    phone: data?.['phone'] ? data?.['phone'] : '',
    ssnLastFour: data?.['ssn'] ? data?.['ssn '] : '',
    dob: data?.['dob'] ? data?.['dob'] : '',
    recruiterId: data?.['recruiter_id'] ? data?.['recruiter_id'] : '',
    recruitingOfficeId: data?.['recruiting_office_id'] ? data?.['recruiting_office_id'] : '',
  };
};
