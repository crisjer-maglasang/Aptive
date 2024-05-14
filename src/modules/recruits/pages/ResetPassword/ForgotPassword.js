import React from 'react';
import { connect } from 'react-redux';
import { ForgotPasswordForm } from '@/modules/recruits/forms';

const ForgotPassword = () => {

  return (
    <ForgotPasswordForm />
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
