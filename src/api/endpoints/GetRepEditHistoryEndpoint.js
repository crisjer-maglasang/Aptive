import { onboardingConstants } from '@/lib';
import { removeTrailingSlashes } from '@/lib/utils';
import { RepEditHistory, Collection } from '@/redux/models';
import { BaseEndpoint } from '.';
import * as Api from '../api';

const {
  BASIC_INFO_SECTION_NAME,
  MARRIAGE_INFO_SECTION_NAME,
  EMERGENCY_INFO_SECTION_NAME,
  ADDRESS_SECTION_NAME,
  GOVERNMENT_ID_SECTION_NAME,
  HOUSING_SECTION_NAME,
  RESIDENTIAL_HISTORY_SECTION_NAME,
  VEHICLES_SECTION_NAME,
  UNIFORM_SECTION_NAME,
  LICENSING_PERSONAL_DETAILS_SECTION_NAME,
  EMPLOYMENT_HISTORY_SECTION_NAME,
  REFERENCES_SECTION_NAME,
  WOTC_TAX_SURVEY_SECTION_NAME,
  DIRECT_DEPOSIT_SECTION_NAME,
  PAY_DETAILS_SECTION_NAME,
  WORKDAY_SECTION_NAME,
  ID_COPY_UPLOAD_SECTION_NAME,
  REP_EXPERIENCE_SECTION_NAME,
} = onboardingConstants;

export default class GetRepEditHistoryEndpoint extends BaseEndpoint {

  static #defaultPageNumber = 1;
  static #defaultPageSize = 10;

  endpoint(id) {
    return Api.get({
      path: removeTrailingSlashes(`/api/v1/reps/edit-history/${id ?? ''}`),
      api: process.env.REACT_APP_ONB_API,
    });
  }

  requestPayload({
    section,
    pageNumber = this.#defaultPageNumber,
    pageSize = this.#defaultPageSize,
    recruitingSeasonId
  }) {
    section = {
      [BASIC_INFO_SECTION_NAME]: 'basic_info',
      [MARRIAGE_INFO_SECTION_NAME]: 'marriage_info',
      [EMERGENCY_INFO_SECTION_NAME]: 'emergency_info',
      [ADDRESS_SECTION_NAME]: 'address',
      [GOVERNMENT_ID_SECTION_NAME]: 'government_identification',
      [HOUSING_SECTION_NAME]: 'housing',
      [RESIDENTIAL_HISTORY_SECTION_NAME]: 'residential_history',
      [VEHICLES_SECTION_NAME]: 'vehicle',
      [UNIFORM_SECTION_NAME]: 'uniform',
      [LICENSING_PERSONAL_DETAILS_SECTION_NAME]: 'licensing_personal_details',
      [REP_EXPERIENCE_SECTION_NAME]: 'rep_experience',
      [EMPLOYMENT_HISTORY_SECTION_NAME]: 'employment_history',
      [REFERENCES_SECTION_NAME]: 'references',
      [WOTC_TAX_SURVEY_SECTION_NAME]: 'wotc_tax_survey',
      [DIRECT_DEPOSIT_SECTION_NAME]: 'direct_deposit',
      [PAY_DETAILS_SECTION_NAME]: 'pay_details',
      [WORKDAY_SECTION_NAME]: 'workday',
      [ID_COPY_UPLOAD_SECTION_NAME]: 'id_copy_upload',
    }[section] ?? null;

    return {
      filter: { section, recruitingSeasonId },
      page: {
        number: pageNumber,
        size: pageSize,
      },
    };
  }

  successPayload({ data, meta: { total } }) {
    const items = data.map(({ attributes }) => {
      const {
        field_name: itemChanged,
        changed_from: changedFrom,
        changed_to: changedTo,
        changed_by_name: changedBy,
        created_at: changedAt,
      } = attributes;

      return new RepEditHistory({
        itemChanged,
        changedFrom,
        changedTo,
        changedBy,
        changedAt,
      });
    });

    return new Collection(items, total);
  }

  failurePayload() {
    return new Collection();
  }

}
