export const errorMessageMap = {
  required: 'This field is required',
  date: 'This field must match mm/dd/yyyy format',
  minFive: 'This field requires a minimum of five digits',
  minTen: 'This field requires a minimum of ten digits',
  maxTen: 'This field requires a maximum of ten digits',
  elevenDig:'This field requires eleven digits',
  minEleven: 'This field requires a minimum of eleven digits',
  maxEleven: 'This field requires a maximum of eleven digits',
  minTwelve: 'This field requires a minimum of twelve digits',
};

export const regexMap = {
  numeric: '^[0-9]*$',
  email:
    '/^(([^<>()[],;:s@]+(.[^<>()[],;:s@]+)*)|(.+))@(([^<>()[],;:s@]+.)+[^<>()[],;:s@]{2,})$/i',
  phone: '/^d{3}-d{3}-d{4}$/gm',
  date: '^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$',
};
