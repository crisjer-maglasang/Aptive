import React from 'react';
import { connect } from 'react-redux';
import { ResetPasswordForm } from '@/modules/recruits/forms';

const ChangePassword = () => {

  return (
    <ResetPasswordForm />
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
