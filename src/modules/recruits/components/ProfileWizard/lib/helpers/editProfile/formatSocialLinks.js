import { onboardingConstants } from '@/lib/constants';
import { removeTrailingSpaces } from '@/lib/utils';

const {
  FACEBOOK_URL,
  FACEBOOK_LINK,
  LINKEDIN_URL,
  LINKEDIN_LINK,
  TWITTER_URL,
  TWITTER_LINK,
  INSTAGRAM_URL,
  INSTAGRAM_LINK,
} = onboardingConstants;

const socialMedia = {
  [FACEBOOK_LINK]: FACEBOOK_URL,
  [LINKEDIN_LINK]: LINKEDIN_URL,
  [TWITTER_LINK]: TWITTER_URL,
  [INSTAGRAM_LINK]: INSTAGRAM_URL,
};

export const formatUsernameToSocialLink = (value, name) => {
  if (!value) {
    return '';
  }

  let username = value;
  const host = socialMedia[name];

  if (value.includes(host)) {
    username = formatSocialLinkToUsername(value, name);
  }
  const formattedUsername = removeTrailingSpaces(username).replace(/^\/+/, '');

  return `${host}${formattedUsername}`;
};

export const formatSocialLinkToUsername = (value, name) => {
  if (!value) {
    return '';
  }

  const host = socialMedia[name];
  const username = value.split(host);

  return username[username.length - 1];
};

export const getSocialMediaSiteDomain = (url) => {
  const urlDivided = url.split('https://www.');

  return urlDivided[urlDivided.length - 1];
};
