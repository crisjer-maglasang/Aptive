import { dashboardConstants, formatDateDisplay } from '@/lib';
import { WhiteButton, TooltipText, SortLabel } from '@/components';
import { dataKeys } from '@/lib/adapters';
import { addFsExcludeClass, arrayWithoutEmpty, truncate } from '@/lib/utils';
import { ReportingTo } from '.';

const {
  NAME,
  RECRUITER,
  REPORTING_TO,
  RA_STATUS,
  NDA_STATUS,
  AGMT_STATUS,
  RECRUIT_SIGNED,
  MANAGE,
  NO_DATA_TO_DISPLAY,
  ONB_COMMS,
  RA_STATUS_TOOLTIP,
  NDA_STATUS_TOOLTIP,
  AGMT_STATUS_TOOLTIP,
  ONB_COMMS_TOOLTIP,
} = dashboardConstants;

const { AGREEMENTS_SIGNED_KEY } = dataKeys;

export const getHeadRows = ({ getSortParam, onSortChange, tileSelected }) => (
  arrayWithoutEmpty([
    {
      value: (
        <SortLabel
          sortName="name"
          onSortChange={onSortChange}
          sortOrder={getSortParam('name')?.order}
          position={getSortParam('name')?.index}
        >
          {NAME}
        </SortLabel>
      ),
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: RECRUITER,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: REPORTING_TO,
      align: 'left',
      className: 'whitespace-nowrap',
    },
    {
      value: (
        <TooltipText
          id={RA_STATUS}
          text={RA_STATUS}
          message={RA_STATUS_TOOLTIP}
        />
      ),
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: (
        <TooltipText
          id={NDA_STATUS}
          text={NDA_STATUS}
          message={NDA_STATUS_TOOLTIP}
        />
      ),
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: (
        <TooltipText
          id={AGMT_STATUS}
          text={AGMT_STATUS}
          message={AGMT_STATUS_TOOLTIP}
        />
      ),
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: (
        <TooltipText
          id={ONB_COMMS}
          text={ONB_COMMS}
          message={ONB_COMMS_TOOLTIP}
        />
      ),
      align: 'center',
      className: 'whitespace-nowrap',
    },
    tileSelected === AGREEMENTS_SIGNED_KEY ? {
      value: (
        <SortLabel
          sortName="date_signed"
          onSortChange={onSortChange}
          sortOrder={getSortParam('date_signed')?.order}
          position={getSortParam('date_signed')?.index}
        >
          {RECRUIT_SIGNED}
        </SortLabel>
      ),
      align: 'center',
      className: 'whitespace-nowrap',
    } : {},
    {
      value: '',
      align: 'left',
      className: 'whitespace-nowrap',
    },
  ])
);

export const parseRepRows = (rows, onSelect, tileSelected) => (
  rows.length ? rows.map((row) => arrayWithoutEmpty([
    {
      value: truncate(row.name.trim(), 25),
      align: 'left',
      className: addFsExcludeClass('font-medium text-gray-900'),
    },
    {
      value: row.recruiter_name,
      align: 'left',
      className: addFsExcludeClass(),
    },
    {
      value: (
        <ReportingTo
          partnership={row.partnership_name}
          regionalManager={row.regional_manager_name}
          divisionManager={row.division_manager_name}
          seniorTeamLeader={row.senior_team_leader_name}
        />
      ),
      align: 'left',
      className: addFsExcludeClass(),
    },
    {
      value: row.ra_status || '-',
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: row.nda_status || '-',
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: row.contract_status || '-',
      align: 'center',
      className: 'whitespace-nowrap',
    },
    {
      value: (row.kickoff_sms_sent && row.kickoff_email_sent) ? 'sent' : '-',
      align: 'center',
      className: 'whitespace-nowrap',
    },
    tileSelected === AGREEMENTS_SIGNED_KEY ? {
      value: row.date_signed ? formatDateDisplay(row.date_signed) : '-',
      align: 'center',
      className: 'whitespace-nowrap',
    } : {},
    {
      value: <WhiteButton onClick={() => onSelect({ recruit: row })} text={MANAGE} />,
      align: 'center',
    },
  ])) : [
    {
      value: NO_DATA_TO_DISPLAY,
      align: 'center',
      colSpan: Number.MAX_SAFE_INTEGER,
      className: 'py-8',
    },
  ]
);
