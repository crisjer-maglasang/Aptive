import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { getSocialMediaSiteDomain, formatSocialLinkToUsername, formatUsernameToSocialLink } from '../../ProfileWizard/lib';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/components/common';
import { CustomErrorMessage, CustomInput, generateBaseClasses } from '@/components/common/Form';
import { addFsExcludeClass } from '@/lib/utils';
import { onboardingConstants } from '@/lib';

const {
  FACEBOOK_LINK,
  FACEBOOK_TITLE,
  FACEBOOK_URL,
  LINKEDIN_LINK,
  LINKEDIN_TITLE,
  LINKEDIN_URL,
  TWITTER_LINK,
  TWITTER_TITLE,
  TWITTER_URL,
  INSTAGRAM_LINK,
  INSTAGRAM_TITLE,
  INSTAGRAM_URL,
} = onboardingConstants;

const SocialMedia = ({
  canEditField,
  onChangeHandler,
}) => {
  const { control } = useFormContext();

  const socialMedias = [
    {
      title: FACEBOOK_TITLE,
      label: getSocialMediaSiteDomain(FACEBOOK_URL),
      name: FACEBOOK_LINK,
      icon: <FacebookIcon className="w-8 h-8 mr-2 text-gray-400" />,
    },
    {
      title: LINKEDIN_TITLE,
      label: getSocialMediaSiteDomain(LINKEDIN_URL),
      name: LINKEDIN_LINK,
      icon: <LinkedinIcon className="w-7 h-7 mr-2 text-gray-400" />,
    },
    {
      title: TWITTER_TITLE,
      label: getSocialMediaSiteDomain(TWITTER_URL),
      name: TWITTER_LINK,
      icon: <TwitterIcon className="w-8 h-8 mr-2 text-gray-400" />,
    },
    {
      title: INSTAGRAM_TITLE,
      label: getSocialMediaSiteDomain(INSTAGRAM_URL),
      name: INSTAGRAM_LINK,
      icon: <InstagramIcon className="w-8 h-8 mr-2 text-gray-400" />,
    },
  ];

  return (
    <div className="flex flex-col justify-between gap-y-8">
      {socialMedias.map((social) => {
        return (
          <div key={social.name}>
            <p className="text-sm font-medium text-gray-700 mb-1.5">{social.title}</p>
            <div className="w-full flex items-center">
              {social.icon}
              <div className="w-full flex">
                <label
                  htmlFor={social.name}
                  className="basis-1/4 flex items-center bg-gray-200 text-xs md:text-sm text-gray-500 pl-3 pr-1 rounded-l-md"
                >
                  {social.label}
                </label>
                <Controller
                  name={social.name}
                  control={control}
                  render={({ field: { value }, fieldState: { error } }) => {
                    return (
                      <div className="basis-3/4 relative">
                        <CustomInput
                          id={social.name}
                          name={social.name}
                          type="text"
                          value={formatSocialLinkToUsername(value, social.name)}
                          onChange={(event) => {
                            onChangeHandler({
                              target: {
                                name: social.name,
                                value: formatUsernameToSocialLink(event.target.value, social.name),
                              },
                              type: event.type,
                            });
                          }}
                          hasError={error}
                          baseClasses={generateBaseClasses()}
                          className={addFsExcludeClass('rounded-r-md rounded-l-none')}
                          disabled={!canEditField(social.name)}
                        />
                        {error?.message
                          ? <CustomErrorMessage text={error?.message} className="absolute left-0 -bottom-6" />
                          : null}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

SocialMedia.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
};

export default SocialMedia;
