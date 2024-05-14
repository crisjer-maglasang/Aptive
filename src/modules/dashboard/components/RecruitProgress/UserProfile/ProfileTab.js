import { useState } from 'react';
import { connect } from 'react-redux';
import { isAdminSelector } from '@/redux/auth';
import { Disclosure } from '@headlessui/react';
import { Icon, ProfileDropdown, WorkdayTasksList } from '@/components';
import {
  onboardingConstants,
  onboardingDataValues,
  formatDateDisplay,
  formatPhone,
  genderSelectOptions,
  getSelectedOption,
} from '@/lib';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, UserActionButton } from '@/components/common';
import { addFsExcludeClass, formatNumberToCurrencyString } from '@/lib/utils';
import { repStatusesSelector } from '@/redux/reps';
import PropTypes from 'prop-types';
import {
  currentSituationSelectOptions,
  lastIndustrySelectOptions,
  sourceOfDiscoverySelectOptions,
} from '@/modules/recruits/lib';

const {
  SHIRT_SIZE_LABEL,
  WAIST_SIZE_LABEL,
  JACKET_SIZE_LABEL,
  HAT_SIZE_LABEL,
  SHOE_SIZE_LABEL,
  EMPLOYMENT_HISTORY_LABEL,
  EMPLOYER_LABEL,
  START_DATE_LABEL,
  END_DATE_LABEL,
  REFERENCES_LABEL,
  NAME_LABEL,
  RELATION_LABEL,
  PHONE_NUMBER_LABEL,
  RACE_LABEL,
  WEIGHT_LABEL,
  HAIR_COLOR_LABEL,
  EYE_COLOR_LABEL,
  BIRTH_CITY_LABEL,
  BIRTH_STATE_LABEL,
  OTHER_BIRTH_STATE_LABEL,
  US_CITIZEN_LABEL,
  VISIBLE_MARKINGS_LABEL,
  HEIGHT_LABEL,
  CRIME_CONVICTION_LABEL,
  NO_VALUE_TEXT,
  RENT_DEDUCTION_LABEL,
  NUMBER_OF_ROOMS_LABEL,
  SOCIAL_MEDIA_TITLE,
  FACEBOOK_TITLE,
  LINKEDIN_TITLE,
  TWITTER_TITLE,
  INSTAGRAM_TITLE,
  ACTUAL_START_DATE_LABEL,
  ACTUAL_END_DATE_LABEL,
  REP_EXPERIENCE_SECTION_TITLE,
  LAST_INDUSTRY_LABEL,
  COMPANY_NAME_LABEL,
  COMPANY_YEARS_SOLD_LABEL,
  COMPANY_ACCOUNT_NUMBERS_LABEL,
  SOURCE_OF_DISCOVERY_LABEL,
  CURRENT_SITUATION_LABEL,
  CUSTOMER_FACING_PHONE_NUMBER_LABEL,
} = onboardingConstants;

const {
  STATE_OTHER_VALUE,
  MARRIED_VALUE,
} = onboardingDataValues;

const ProfileTab = ({
  rep,
  onUserDeleted,
  isAdmin,
  repStatuses,
}) => {
  const [
    showPersonalInfo,
    setShowPersonalInfo,
    showHousingInfo,
    setShowHousingInfo,
    showSwagInfo,
    setShowSwagInfo,
    showLicensingInfo,
    setShowLicensingInfo,
    showHRInfo,
    setShowHRInfo,
    showTeamInfo,
    setShowTeamInfo,
    showWorkdayTasksInfo,
    setShowWorkdayTasksInfo,
  ] = useState(false);

  const renderSocialLinks = () => {
    const socialMedia = [
      { link: rep?.facebook_username, title: FACEBOOK_TITLE, icon: <FacebookIcon className="w-5 h-5 text-gray-400" /> },
      { link: rep?.linkedin_username, title: LINKEDIN_TITLE, icon: <LinkedinIcon className="w-5 h-5 text-gray-400" /> },
      { link: rep?.twitter_username, title: TWITTER_TITLE, icon: <TwitterIcon className="w-5 h-5 text-gray-400" /> },
      { link: rep?.instagram_username, title: INSTAGRAM_TITLE, icon: <InstagramIcon className="w-5 h-5 text-gray-400" /> },
    ];

    return socialMedia.map((social) => (social.link ? (
      <div key={social.title} className="flex items-center gap-x-2 mb-0.5">
        {social.icon}
        <a href={social.link} target="_blank" className="text-aptivegreen underline" rel="noreferrer">
          {social.title}
        </a>
      </div>
    ) : null));
  };

  return (
    <div className="h-screen max-w-2xl px-6 py-5 overflow-x-hidden overflow-y-scroll bg-gray-100 border-b border-gray-200 sm:px-6">
      <Disclosure>
        {({ open }) => (
          <>
            <ProfileDropdown
              tabName="Personal Info"
              showInfo={showPersonalInfo}
              setShowInfo={setShowPersonalInfo}
              info={
                <div className="justify-around">
                  <div className="grid grid-flow-row-dense grid-cols-2 pb-4">
                    <div className="text-sm text-gray-600 font-small">
                      <h5>Status</h5>
                      <p className="text-base text-gray-800">
                        {repStatuses.find((repStatus) => repStatus.statusCode === rep?.status)?.statusTitle}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 font-small">
                      <h5>Role</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.rep_role}
                      </h4>
                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>First Name</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.first_name}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Last Name</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.last_name}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Gender</h5>
                        <h4 className="text-base text-gray-800">
                          {getSelectedOption(rep?.gender, genderSelectOptions)}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Birth Date</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.dob ? formatDateDisplay(rep.dob) : NO_VALUE_TEXT}
                        </h4>
                      </div>

                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Marital Status</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.marital_status}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Address</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.permanent_address}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Emergency Contact Name</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.emergency_contact_name}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Emergency Contact Number</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.emergency_phone_number ? formatPhone(rep?.emergency_phone_number) : NO_VALUE_TEXT}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Upfront Pay</h5>
                        <p className="text-base text-gray-800">
                          {formatNumberToCurrencyString(rep?.upfront_pay)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{RENT_DEDUCTION_LABEL}</h5>
                        <p className="text-base text-gray-800">
                          {formatNumberToCurrencyString(rep?.rent_deduction, 2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="justify-around">
                      <div className="grid grid-cols-2 pb-4">
                        <div className="text-sm text-gray-600 font-small">
                          <h5>Drivers License</h5>
                          <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                            {rep?.drivers_license_number}
                          </h4>
                          <Icon icon="document" />
                        </div>
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{SOCIAL_MEDIA_TITLE}</h5>
                          {renderSocialLinks()}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-4">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{CUSTOMER_FACING_PHONE_NUMBER_LABEL}</h5>
                        <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                          {rep?.customer_facing_mobile ? formatPhone(rep?.customer_facing_mobile) : NO_VALUE_TEXT}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            {showPersonalInfo && <Disclosure.Panel static />}
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <ProfileDropdown
              tabName="Housing & Vehicles"
              showInfo={showHousingInfo}
              setShowInfo={setShowHousingInfo}
              info={
                <div className="justify-around">
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Aptive Housing</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.rent_situation}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Housing Type</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.apartment_status}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>{NUMBER_OF_ROOMS_LABEL}</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.apartment_status === MARRIED_VALUE ? rep?.no_of_rooms : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Expected Arrival Date</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.arrival_date ? formatDateDisplay(rep?.arrival_date) : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Knocking Start Date</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.start_date ? formatDateDisplay(rep?.start_date) : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Knocking End Date</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.end_date ? formatDateDisplay(rep?.end_date) : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>{ACTUAL_START_DATE_LABEL}</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.start_date ? formatDateDisplay(rep?.actual_start_date) : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>{ACTUAL_END_DATE_LABEL}</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.end_date ? formatDateDisplay(rep?.actual_end_date) : NO_VALUE_TEXT}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Roommate Request</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.roommate_request}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Segway</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.has_segway === '1' ? 'yes' : 'no'}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Personal Vehicle</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.is_personal_vehicle}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Make/Model</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.vehicle_model}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Vehicle Color</h5>
                      <h4 className="text-base text-gray-800">{rep?.vehicle_color}</h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Year</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.purchase_year}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>License Plate Number</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.license_plate_number}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>License State</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.license_state}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Registered Vehicle Owner</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.vehicle_owner_name}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small pb-4">
                      <h5>Address of Owner</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.vehicle_owner_address}
                      </h4>
                    </div>
                  </div>
                </div>
              }
            />
            {showHousingInfo && <Disclosure.Panel static />}
          </>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <>
            <ProfileDropdown
              tabName="Uniform & Swag"
              showInfo={showSwagInfo}
              setShowInfo={setShowSwagInfo}
              info={
                <div className="justify-around">
                  <div className="grid grid-cols-2 pb-4">
                    <div className="text-sm text-gray-600 font-small">
                      <h5>{SHIRT_SIZE_LABEL}</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.polo_shirt_size}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small">
                      <h5>{WAIST_SIZE_LABEL}</h5>
                      <h4 className="text-base text-gray-800">
                        {rep?.waist_size}
                      </h4>
                    </div>
                  </div>

                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{SHOE_SIZE_LABEL}</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.shoe_size}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{JACKET_SIZE_LABEL}</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.jacket_size}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{HAT_SIZE_LABEL}</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.hat_size}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            {showSwagInfo && <Disclosure.Panel static />}
          </>
        )}
      </Disclosure>

      {isAdmin && (
        <Disclosure>
          {({ open }) => (
            <>
              <ProfileDropdown
                tabName="Licensing"
                showInfo={showLicensingInfo}
                setShowInfo={setShowLicensingInfo}
                info={
                  <div className="justify-around">
                    <div className="grid grid-flow-row-dense grid-cols-2 pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{RACE_LABEL}</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.ethnicity}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>{HEIGHT_LABEL}</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.height}
                        </h4>
                      </div>
                    </div>

                    <div className="justify-around">
                      <div className="grid grid-cols-2 pb-2">
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{WEIGHT_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.weight}
                          </h4>
                        </div>
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{HAIR_COLOR_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.hair_color}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="justify-around">
                      <div className="grid grid-cols-2 pb-2">
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{EYE_COLOR_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.eye_color}
                          </h4>
                        </div>
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{BIRTH_CITY_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.place_of_birth}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="justify-around">
                      <div className="grid grid-cols-2 pb-2">
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{US_CITIZEN_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.is_us_citizen}
                          </h4>
                        </div>
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{VISIBLE_MARKINGS_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.has_visible_markings}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="justify-around">
                      <div className="grid grid-cols-2 pb-2">
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{CRIME_CONVICTION_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.is_crime}
                          </h4>
                        </div>
                        <div className="text-sm text-gray-600 font-small">
                          <h5>{BIRTH_STATE_LABEL}</h5>
                          <h4 className="text-base text-gray-800">
                            {rep?.birth_state}
                          </h4>
                        </div>
                      </div>
                    </div>
                    {rep?.birth_state === STATE_OTHER_VALUE && (
                      <div className="justify-around">
                        <div className="grid grid-cols-2 pb-2">
                          <div className="text-sm text-gray-600 font-small">
                            <h5>{OTHER_BIRTH_STATE_LABEL}</h5>
                            <h4 className="text-base text-gray-800">
                              {rep?.other_birth_state}
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="justify-around pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5 className="pb-1">{EMPLOYMENT_HISTORY_LABEL}</h5>
                        {rep?.employment.map(({ employer, service_from, service_to }, i) => {
                          return (
                            <div className="grid grid-cols-3" key={i}>
                              <div>
                                <div>{EMPLOYER_LABEL}</div>
                                <span className={addFsExcludeClass('text-base text-gray-800')}>{employer}</span>
                              </div>
                              <div>
                                <div>{START_DATE_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {service_from ? formatDateDisplay(service_from) : NO_VALUE_TEXT}
                                </span>
                              </div>
                              <div>
                                <div>{END_DATE_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {service_from ? formatDateDisplay(service_to) : NO_VALUE_TEXT}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="justify-around pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5 className="pb-1">{REFERENCES_LABEL}</h5>
                        {rep?.references.map(({ name, phone, relation }, i) => {
                          return (
                            <div className="grid grid-cols-3" key={i}>
                              <div>
                                <div>{NAME_LABEL}</div>
                                <span className={addFsExcludeClass('text-base text-gray-800')}>{name}</span>
                              </div>
                              <div>
                                <div>{PHONE_NUMBER_LABEL}</div>
                                <span className={addFsExcludeClass('text-base text-gray-800')}>
                                  {phone ? formatPhone(phone) : NO_VALUE_TEXT}
                                </span>
                              </div>
                              <div>
                                <div>{RELATION_LABEL}</div>
                                <span className="text-base text-gray-800">{relation}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="justify-around pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5 className="pb-1">{REP_EXPERIENCE_SECTION_TITLE}</h5>
                        <div className="justify-around">
                          <div className="grid grid-cols-2 pb-2">
                            <div className="text-sm text-gray-600 font-small">
                              <h5>{CURRENT_SITUATION_LABEL}</h5>
                              <h4 className="text-base text-gray-800">
                                {getSelectedOption(rep?.current_situation, currentSituationSelectOptions)}
                              </h4>
                            </div>
                            <div className="text-sm text-gray-600 font-small">
                              <h5>{SOURCE_OF_DISCOVERY_LABEL}</h5>
                              <h4 className="text-base text-gray-800">
                                {getSelectedOption(rep?.source_of_discovery, sourceOfDiscoverySelectOptions)}
                              </h4>
                            </div>
                          </div>
                        </div>
                        {rep?.experiences?.map(({ last_industry, sales_company, years_sold, number_of_accounts }, i) => {
                          return (
                            <div className="grid grid-cols-4" key={i}>
                              <div className="pr-2">
                                <div>{LAST_INDUSTRY_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {getSelectedOption(last_industry, lastIndustrySelectOptions)}
                                </span>
                              </div>
                              <div className="pr-2">
                                <div>{COMPANY_NAME_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {sales_company}
                                </span>
                              </div>
                              <div className="pr-2">
                                <div>{COMPANY_YEARS_SOLD_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {years_sold}
                                </span>
                              </div>
                              <div className="pr-2">
                                <div>{COMPANY_ACCOUNT_NUMBERS_LABEL}</div>
                                <span className="text-base text-gray-800">
                                  {number_of_accounts}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                }
              />
              {showLicensingInfo && <Disclosure.Panel static />}
            </>
          )}
        </Disclosure>
      )}

      {isAdmin && (
        <Disclosure>
          {({ open }) => (
            <>
              <ProfileDropdown
                tabName="HR Information"
                showInfo={showHRInfo}
                setShowInfo={setShowHRInfo}
                info={
                  <div className="flex flex-wrap justify-start">
                    <div className="w-1/2 mb-2.5 text-sm text-gray-600 font-small">
                      <div className="flex items-center">
                        {rep?.dl_img ? (
                          <label htmlFor="driverLicenseImage" className="mr-1">
                            Drivers License Info
                          </label>
                        ) : (
                          <h5 className="mr-1">Drivers License Info</h5>
                        )}
                        <Icon icon="document" />
                      </div>
                      {rep?.dl_img && (
                        <div className="w-40 mt-2">
                          <img
                            id="driverLicenseImage"
                            className={addFsExcludeClass('rounded-sm')}
                            alt="driver license"
                            src={rep.dl_img}
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 mb-2.5 text-sm text-gray-600 font-small">
                      <div className="flex items-center">
                        {rep?.passport_img ? (
                          <label htmlFor="passportImage" className="mr-1">
                            Passport
                          </label>
                        ) : (
                          <h5 className="mr-1">Passport</h5>
                        )}
                        <Icon icon="document" />
                      </div>
                      {rep?.passport_img && (
                        <div className="w-40 mt-2">
                          <img
                            id="passportImage"
                            className={addFsExcludeClass('rounded-sm')}
                            alt="passport"
                            src={rep.passport_img}
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 mb-2.5 text-sm text-gray-600 font-small">
                      <div className="flex items-center">
                        {rep?.ss_img ? (
                          <label htmlFor="socialSecurityImage" className="mr-1">
                            Social Security Card
                          </label>
                        ) : (
                          <h5 className="mr-1">Social Security Card</h5>
                        )}
                        <Icon icon="document" />
                      </div>
                      {rep?.ss_img && (
                        <div className="w-40 mt-2">
                          <img
                            id="socialSecurityImage"
                            className={addFsExcludeClass('rounded-sm')}
                            alt="social security card"
                            src={rep.ss_img}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
              {showHRInfo && <Disclosure.Panel static />}
            </>
          )}
        </Disclosure>
      )}

      <Disclosure>
        {({ open }) => (
          <>
            <ProfileDropdown
              tabName="Team Info"
              showInfo={showTeamInfo}
              setShowInfo={setShowTeamInfo}
              info={
                <div className="justify-around">
                  <div className="grid grid-cols-2 pb-2">
                    <div className="text-sm text-gray-600 font-small">
                      <h5>Regional Manager</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.regional_manager_name}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 font-small">
                      <h5>Recruiter</h5>
                      <h4 className={addFsExcludeClass('text-base text-gray-800')}>
                        {rep?.recruiter_name}
                      </h4>
                    </div>
                  </div>
                  <div className="justify-around">
                    <div className="grid grid-cols-2 pb-2">
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Assigned Team</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.team}
                        </h4>
                      </div>
                      <div className="text-sm text-gray-600 font-small">
                        <h5>Date Signed</h5>
                        <h4 className="text-base text-gray-800">
                          {rep?.date_signed ? formatDateDisplay(rep.date_signed) : NO_VALUE_TEXT}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            {showTeamInfo && <Disclosure.Panel static />}
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <ProfileDropdown
              tabName="Workday Tasks"
              showInfo={showWorkdayTasksInfo}
              setShowInfo={setShowWorkdayTasksInfo}
              info={
                <WorkdayTasksList
                  userId={rep?.user_id}
                  isEditable={isAdmin}
                />
              }
            />
            {showWorkdayTasksInfo && <Disclosure.Panel static />}
          </>
        )}
      </Disclosure>
      <UserActionButton onActionCompleted={onUserDeleted} userId={rep?.user_id} className="mt-2" type="delete" />
    </div>
  );
};

ProfileTab.propTypes = {
  repStatuses: PropTypes.arrayOf(PropTypes.object),
  rep: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAdmin: isAdminSelector(state),
  repStatuses: repStatusesSelector(state),
});

export default connect(mapStateToProps)(ProfileTab);
