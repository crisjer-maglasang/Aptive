import { getNonEmptyObjectValues } from '@/lib/utils';

export const prepareDataForRequestReps = ({
  pageNumber,
  pageSize,
  sortParams,
  regionals,
  recruiters,
  searchText,
}) => {
  const pageParams = { number: pageNumber, size: pageSize };
  const filterParams = {
    regional_ids: regionals,
    recruiter_ids: recruiters,
    search: searchText,
  };

  const page = getNonEmptyObjectValues(pageParams);
  const filter = getNonEmptyObjectValues(filterParams);
  const sort = sortParams ? sortParams : undefined;

  return { page, filter, sort };
};

export const prepareDataForApproveDocuments = (data) => {
  const items = data.map((item) => {
    const { id, reason, description, status } = item;

    const document = {
      status,
      approval_item_id: id,
      reject_reason: reason,
      reject_comment: description,
    };

    return getNonEmptyObjectValues(document);
  });

  return { items };
};
