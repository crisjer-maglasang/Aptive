import { useCallback, useContext } from 'react';
import { connect } from 'react-redux';
import { CustomFormElement, Loader, FormSection } from '@/components/common';
import { ProfileWizardContext } from '@/modules/recruits/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { onboardingConstants } from '@/lib/constants';
import { updateWorkdayIdAsync } from '@/redux/reps';
import { workdayValidationSchema } from '../../lib';
import { workdayIdIsLoadingSelector } from '@/redux/loading';
import PropTypes from 'prop-types';

const {
  WORKDAY_ID,
  WORKDAY_ID_LABEL,
  WORKDAY_SECTION_NAME,
} = onboardingConstants;

const WorkdayID = ({
  userId,
  workdayId,
  updateWorkdayId,
  loading,
}) => {
  const { showViewHistory } = useContext(ProfileWizardContext);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      [WORKDAY_ID]: workdayId ?? '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(workdayValidationSchema),
  });

  const onChangeHandler = useCallback((event) => {
    const { name, value } = event.target;

    setValue(name, value, { shouldValidate: true });
  }, [setValue]);

  const handleSubmitForm = useCallback(() => {
    if (!errors?.[WORKDAY_ID]) {
      updateWorkdayId({ userId, workdayId: watch(WORKDAY_ID) });
    }
  }, [
    errors,
    updateWorkdayId,
    userId,
    watch,
  ]);

  return (
    <div className={loading ? 'p-6' : undefined}>
      {loading
        ? <Loader />
        : (
          <form>
            <FormSection
              viewHistory
              onViewHistory={() => {
                showViewHistory(WORKDAY_SECTION_NAME);
              }}
            >
              <CustomFormElement
                id={WORKDAY_ID}
                name={WORKDAY_ID}
                label={WORKDAY_ID_LABEL}
                type="text"
                onChange={onChangeHandler}
                onBlur={handleSubmitForm}
                register={register}
                error={errors?.[WORKDAY_ID]}
              />
            </FormSection>
          </form>
        )}
    </div>
  );
};

WorkdayID.propTypes = {
  userId: PropTypes.number,
  workdayId: PropTypes.string,
  loading: PropTypes.bool,
  updateWorkdayId: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: workdayIdIsLoadingSelector(state),
});

const mapDispatchToProps = {
  updateWorkdayId: updateWorkdayIdAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkdayID);
