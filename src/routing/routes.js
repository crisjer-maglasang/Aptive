import { Navigate } from 'react-router-dom';
import { CustomOnboarding, ChangePassword, ForgotPassword, TokenError } from '@/modules/recruits/pages';
import { Login, Layout } from '@/components';
import { abilityConstants, pathConstants, userCan, userGroup } from '@/lib';
import {
  AllLeads,
  Dashboard,
  RecruitProgress,
  SalesOperations,
} from '@/modules/dashboard';
import {
  SalesPlanning,
  SalesPlanningAreas,
  SalesPlanningTeams,
  SalesPlanningAreaDetails,
  SalesPlanningTeamDetails,
  SalesPlanningAreaPolygons,
  SalesPlanningTeamPolygons,
} from '@/modules/SalesPlanning';
import {
  HousingAndVehicleForm,
  PersonalInfoForm,
  UniformForm,
  LicensingForm,
  HrForm,
  SubmitProfileForm,
} from '@/modules/recruits/forms';
import { DocumentsTab } from '@/modules/recruits/components/Contracts';
import { AttachmentsTab } from '@/modules/recruits/components/Attachments';
import { RepsApprovalPage } from '@/modules/RepsApproval';
import { adminToolsRoutes } from '@/modules/AdminTools/routing';
import { housingRoutes } from '@/modules/Housing/routing';
import HousingLayout from '@/modules/Housing/components/Layout';
import { UsersManagement } from '@/modules/dashboard/components';
import { usersManagementConstants } from '@/modules/dashboard/components/UsersManagement/lib';

const {
  ACCESS_ONB_ABILITY,
  ACCESS_ALL_LEADS_ABILITY,
  ACCESS_MY_TREE_ABILITY,
  ACCESS_SALES_OPERATIONS_ABILITY,
  ACCESS_SPT_ABILITY,
  ACCESS_WIZARD_ABILITY,
  VIEW_AREAS_ABILITY,
  VIEW_TEAMS_ABILITY,
  VIEW_POLYGONS_ABILITY,
  ACCESS_USERS_MANAGEMENT_ABILITY,
  ACCESS_REP_APPROVAL_ABILITY,
} = abilityConstants;

const {
  onboarding: {
    HOUSING_VEHICLE_PATH,
    UNIFORM_SWAG_PATH,
    LICENSING_PATH,
    HR_PATH,
    SUBMIT_PROFILE_PATH,
    DOCUMENTS_PATH,
    ATTACHMENTS_PATH,
  },
} = pathConstants;

const routes = (isAuthenticated, user, redirectUrl) => {
  const group = userGroup(user);
  const layout = <Layout user={user} isAuthenticated={isAuthenticated} />;
  const housingLayout = <HousingLayout user={user} isAuthenticated={isAuthenticated} />;

  let defaultRoute;
  switch (true) {
    case userCan(user, ACCESS_ONB_ABILITY):
      defaultRoute = <Navigate to="/onboarding" />;

      break;
    case userCan(user, ACCESS_SPT_ABILITY):
      defaultRoute = <Navigate to="/sales-planning" />;

      break;
    default:
      defaultRoute = <Navigate to="/onboarding" />;
  }

  const protectedRoute = (element, ability) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (userCan(user, ability)) {
      return element;
    } else {
      return defaultRoute;
    }
  };

  const redirectRoute = () => {
    if (redirectUrl) {
      return <Navigate to={redirectUrl} />;
    } else {
      return defaultRoute;
    }
  };

  return [
    {
      path: '/',
      element: !isAuthenticated ? layout : redirectRoute(),
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
      ],
    },
    {
      path: '/reset-password',
      element: !isAuthenticated ? layout : defaultRoute,
      children: [
        { path: '/reset-password', element: <ChangePassword /> },
      ],
    },
    {
      path: '/token-error',
      element: !isAuthenticated ? layout : defaultRoute,
      children: [
        { path: '/token-error', element: <TokenError /> },
      ],
    },
    {
      path: '/forgot-password',
      element: !isAuthenticated ? layout : defaultRoute,
      children: [
        { path: '/forgot-password', element: <ForgotPassword /> },
      ],
    },
    {
      path: '/onboarding',
      element: layout,
      children: [
        group !== 'N3' && {
          element: protectedRoute(<Dashboard />, ACCESS_ONB_ABILITY),
          children: [
            {
              index: true,
              element: protectedRoute(<SalesOperations />, ACCESS_SALES_OPERATIONS_ABILITY),
            },
            {
              path: '/onboarding/all-leads',
              element: protectedRoute(<AllLeads />, ACCESS_ALL_LEADS_ABILITY),
            },
            {
              path: '/onboarding/my-tree',
              element: protectedRoute(<RecruitProgress />, ACCESS_MY_TREE_ABILITY),
            },
            {
              path: '/onboarding/rep-approval',
              element: protectedRoute(<RepsApprovalPage />, ACCESS_REP_APPROVAL_ABILITY),
            },
            {
              path: '/onboarding/users-management',
              element: protectedRoute(<UsersManagement type={usersManagementConstants.ARCHIVED_USER_TYPE} />, ACCESS_USERS_MANAGEMENT_ABILITY),
            },
            {
              path: '/onboarding/leads-management',
              element: protectedRoute(<UsersManagement type={usersManagementConstants.ARCHIVED_LEAD_TYPE} />, ACCESS_USERS_MANAGEMENT_ABILITY),
            },
          ],
        },
        group === 'N3' && {
          path: '/onboarding',
          element: protectedRoute(<CustomOnboarding />, ACCESS_WIZARD_ABILITY),
          children: [
            {
              index: true,
              element: protectedRoute(<PersonalInfoForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${HOUSING_VEHICLE_PATH}`,
              element: protectedRoute(<HousingAndVehicleForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${UNIFORM_SWAG_PATH}`,
              element: protectedRoute(<UniformForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${LICENSING_PATH}`,
              element: protectedRoute(<LicensingForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${HR_PATH}`,
              element: protectedRoute(<HrForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${SUBMIT_PROFILE_PATH}`,
              element: protectedRoute(<SubmitProfileForm />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${DOCUMENTS_PATH}`,
              element: protectedRoute(<DocumentsTab />, ACCESS_WIZARD_ABILITY),
            },
            {
              path: `/onboarding/${ATTACHMENTS_PATH}`,
              element: protectedRoute(<AttachmentsTab />, ACCESS_WIZARD_ABILITY),
            },
          ],
        },
      ],
    },
    {
      path: '/sales-planning',
      element: layout,
      children: [
        {
          element: protectedRoute(<SalesPlanning />, ACCESS_SPT_ABILITY),
          children: [
            {
              index: true,
              element: protectedRoute(
                userCan(user, VIEW_AREAS_ABILITY)
                  ? <SalesPlanningAreas />
                  : <Navigate to="/sales-planning/teams" />,
                ACCESS_SPT_ABILITY,
              ),
            },
            {
              path: '/sales-planning/area/:areaId',
              element: protectedRoute(<SalesPlanningAreaDetails />, VIEW_AREAS_ABILITY),
            },
            {
              path: '/sales-planning/teams',
              element: protectedRoute(<SalesPlanningTeams />, VIEW_TEAMS_ABILITY),
            },
            {
              path: '/sales-planning/team/:teamId',
              element: protectedRoute(<SalesPlanningTeamDetails />, VIEW_TEAMS_ABILITY),
            },
            {
              path: '/sales-planning/polygons/area/:id',
              element: protectedRoute(<SalesPlanningAreaPolygons />, VIEW_POLYGONS_ABILITY),
            },
            {
              path: '/sales-planning/polygons/team/:id',
              element: protectedRoute(<SalesPlanningTeamPolygons />, VIEW_POLYGONS_ABILITY),
            },
          ],
        },
      ],
    },
    adminToolsRoutes(protectedRoute, layout),
    housingRoutes(protectedRoute, housingLayout),
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];
};

export default routes;
