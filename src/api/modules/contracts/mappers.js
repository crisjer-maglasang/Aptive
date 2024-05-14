export const getRepContracts = (response) => {
  const contracts = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return contracts.map((contract) => {
    const {
      year,
      status,
      recruiter,
      contract_id: id,
      template_name: title,
      date_signed: dateSigned,
      is_pending: isPending,
      hidden_by: hiddenBy,
      admin_signed: adminSigned,
      recruit_name: recruitName,
      recruit_signed: recruitSigned,
      regional_signed: regionalSigned,
      signature_request_id: signatureRequestId,
      can_sign: canSign,
    } = contract?.attributes ?? {};

    return {
      id,
      year,
      title,
      status,
      dateSigned,
      isPending,
      hiddenBy,
      recruiter,
      adminSigned,
      recruitName,
      recruitSigned,
      regionalSigned,
      signatureRequestId,
      canSign,
    };
  });
};
