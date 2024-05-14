import { SearchDropdown, CustomFormElement } from '@/components/common';
import { dashboardConstants } from '@/lib';
import { addFsExcludeClass } from '@/lib/utils';
import { useMemo } from 'react';

const {
  RECRUITER_INFO,
  SELECT_RECRUITER_LABEL,
  PARTNERSHIP,
  REGIONAL_MANAGER,
  DIVISION_MANAGER,
  SENIOR_TEAM_LEADER,
  RECRUITING_OFFICE_LABEL,
  RECRUITER_NAME,
  RECRUITING_OFFICE_NAME,
} = dashboardConstants;

const RecruiterInfo = ({
  data,
  onChangeField,
  recruiters,
  recruitingOffices,
  errors,
  register,
  recruiterManagersIsLoading,
}) => {
  const selectedRecruiter = recruiters.find((rec) => rec.value === data[RECRUITER_NAME]);
  const managers = useMemo(() => (
    Object
      .entries(selectedRecruiter?.managers ?? {})
      .reduce((result, [key, value]) => ({ ...result, [key]: value.name }), {})
  ), [
    recruiters,
    data?.[RECRUITER_NAME],
  ]);

  return (
    <div className="pt-4">
      <div>
        <h3 className="font-medium leading-6 text-md text-aptivegreen">
          {RECRUITER_INFO}
        </h3>
      </div>
      <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <SearchDropdown
            required
            label={`*${SELECT_RECRUITER_LABEL}`}
            items={recruiters}
            displayProp="label"
            onChange={(item) => onChangeField(RECRUITER_NAME, item.value)}
            register={register}
            error={errors?.[RECRUITER_NAME]}
            className={addFsExcludeClass('h-9')}
          />
        </div>

        <CustomFormElement
          required
          disabled
          label={SENIOR_TEAM_LEADER}
          type="text"
          name="senior_team_leader"
          id="senior_team_leader"
          loading={recruiterManagersIsLoading}
          formValue={managers?.senior_team_leader ?? ''}
          error={errors?.senior_team_leader}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          required
          disabled
          label={DIVISION_MANAGER}
          type="text"
          name="division_manager"
          id="division_manager"
          loading={recruiterManagersIsLoading}
          formValue={managers?.division_manager ?? ''}
          error={errors?.division_manager}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          required
          disabled
          label={REGIONAL_MANAGER}
          type="text"
          name="regional_manager"
          id="regional_manager"
          loading={recruiterManagersIsLoading}
          formValue={managers?.regional_manager ?? ''}
          error={errors?.regional_manager}
          register={register}
          className={addFsExcludeClass()}
        />

        <CustomFormElement
          required
          disabled
          label={PARTNERSHIP}
          type="text"
          name="partnership"
          id="partnership"
          loading={recruiterManagersIsLoading}
          formValue={managers?.partnership ?? ''}
          error={errors?.partnership}
          register={register}
          className={addFsExcludeClass()}
        />

        <div className="sm:col-span-3">
          <SearchDropdown
            required
            label={`*${RECRUITING_OFFICE_LABEL}`}
            items={recruitingOffices}
            displayProp="label"
            onChange={(item) => onChangeField(RECRUITING_OFFICE_NAME, item.value)}
            register={register}
            error={errors?.[RECRUITING_OFFICE_NAME]}
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterInfo;
