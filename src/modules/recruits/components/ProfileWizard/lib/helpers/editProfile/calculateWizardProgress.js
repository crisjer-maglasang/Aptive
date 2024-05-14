const calculateWizardProgress = ({
  menuItems,
  isSubmitted,
  isApproved,
  workdayComplete,
  isAdmin,
  isReadyToSubmit,
}) => {
  let progress;
  let message;

  const { passed, total } = menuItems.wizard.reduce(
    ({ passed, total }, { completed, countable }) => ({
      passed: countable && completed ? ++passed : passed,
      total: countable ? ++total : total,
    }),
    { passed: 0, total: 0 },
  );

  progress = Math.floor(passed / total * 100);
  progress = isFinite(progress) ? progress : 0;

  const shouldDowngradeProgress =
    (isSubmitted && (!isApproved || !workdayComplete))
    && progress === 100;

  if (shouldDowngradeProgress) {
    progress = 95;
    message = '*95% until approved by Admins';
  }

  if (isReadyToSubmit && !isSubmitted) {
    if (!isAdmin) {
      message = 'You are almost done, Please submit to finish.';
    } else {
      message = 'The profile is almost done but not submitted yet.';
    }
  }

  return {
    progress,
    message,
  };
};

export default calculateWizardProgress;
