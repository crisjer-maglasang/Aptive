export const errorMessageMap = {
  required: 'This field is required',
  date: 'This field must match mm/dd/yyyy format',
  minOneCount: 'This field must have at least 1 entry',
  minThreeCount: 'This field must have at least 3 entries',
  minFive: 'This field requires a minimum of five digits',
  maxTen: 'This field requires a maximum of ten digits',
  elevenDig:'This field requires eleven digits',
  minEleven: 'This field requires a minimum of eleven digits',
  maxEleven: 'This field requires a maximum of eleven digits',
};

export const regexMap = {
  numeric: '^[0-9]*$',
  email:
    '/^(([^<>()[],;:s@]+(.[^<>()[],;:s@]+)*)|(.+))@(([^<>()[],;:s@]+.)+[^<>()[],;:s@]{2,})$/i',
  phone: '/^d{3}-d{3}-d{4}$/gm',
  date: /^\d{2}\/\d{2}\/\d{4}$/,
};
