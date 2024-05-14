import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { CustomErrorMessage } from '@/components/common/Form';
import { onboardingConstants } from '@/lib';

const { WOTC_TAX_SURVEY_TEXT, WOTC_SURVEY, WOTC_SURVEY_COMPLETED } = onboardingConstants;

const WotcSurvey = ({ canEditField }) => {
  const { setValue, formState: { errors } } = useFormContext();

  const onClickSurvey = (event) => {
    if (!canEditField(WOTC_SURVEY_COMPLETED)) {
      event.preventDefault();

      return;
    }

    setValue(WOTC_SURVEY_COMPLETED, true, { shouldValidate: true });
  };

  return (
    <div className="border-gray-200">
      <div className="">
        <div>
          *
          {WOTC_SURVEY}
        </div>
        <div className="flex border rounded-md">
          <div className="px-2 py-2 border-r text-gray-500 bg-gray-100">https://</div>
          <div className="px-2 py-2">
            <a className="text-blue-500 bg-blue"
              target="_blank"
              href="https://tcs.adp.com/screen/index.html?cc=aptive"
              onClick={onClickSurvey}
              rel="noreferrer"
            >
              tcs.adp.com/screen/index.html?cc=aptive
            </a>
          </div>
        </div>
        <div className="text-sm pt-3">{WOTC_TAX_SURVEY_TEXT}</div>
        {errors?.wotcSurveyCompleted?.message && (
          <CustomErrorMessage text={errors?.wotcSurveyCompleted?.message} />
        )}
      </div>
    </div>
  );
};

WotcSurvey.propTypes = {
  canEditField: PropTypes.func,
};

export default WotcSurvey;
