import NewAgreementListRow from './NewAgreementListRow';

const NewAgreementList = ({
  addendumOpened,
  onToggleAddendum,
  agreements,
  selectedAgreements,
  onToggleSelected,
  addendums,
  mds,
  onChangeMd,
}) => {
  const rows = [];

  if (agreements) {
    agreements.forEach((agreement) => {
      const selected = selectedAgreements.includes(agreement.id);
      const addendum = addendums ? addendums[agreement.id] : '';
      const md = mds ? mds[agreement.id] : '';
      rows.push(
        <NewAgreementListRow
          addendumOpened={addendumOpened}
          onToggleAddendum={onToggleAddendum}
          agreement={agreement}
          key={agreement.id}
          selected={selected}
          onToggleSelect={onToggleSelected}
          addendum={addendum}
          md={md}
          onChangeMd={onChangeMd}
        />
      );
    });
  }

  return <ul className="space-y-3">{rows}</ul>;
};

export default NewAgreementList;
