import dashboardConstants from '../constants/dashboard';

const {
  SUPER_ADMIN_GROUP,
  DEALER_ADMIN_GROUP,
  MANAGERS_GROUP,
  USERS_GROUP,
  REGIONAL_MANAGEMENT_GROUP,
  BRANCH_MANAGEMENT_GROUP,
} = dashboardConstants;

const ACCESS_ALL_LEADS_ABILITY = 'access_all_leads';
const ACCESS_MY_TREE_ABILITY = 'access_my_tree';
const ACCESS_USERS_MANAGEMENT_ABILITY = 'access_users_management';
const ACCESS_ONB_ABILITY = 'access_onb';
const ACCESS_PLAN_BUILDER_ABILITY = 'access_plan_builder';
const ACCESS_REP_APPROVAL_ABILITY = 'access_rep_approval';
const ACCESS_SALES_OPERATIONS_ABILITY = 'access_sales_operations';
const ACCESS_SPT_ABILITY = 'access_spt';
const ACCESS_WIZARD_ABILITY = 'access_wizard';
const VIEW_AREAS_ABILITY = 'view_areas_ability';
const VIEW_TEAMS_ABILITY = 'view_teams_ability';
const VIEW_POLYGONS_ABILITY = 'view_teams_ability';
const VIEW_ANY_AREA_ABILITY = 'view_any_area';
const VIEW_ANY_TEAM_ABILITY = 'view_any_team';
const ACCESS_HOUSING_ABILITY = 'access_housing_ability';

export const abilityConstants = {
  ACCESS_ALL_LEADS_ABILITY,
  ACCESS_MY_TREE_ABILITY,
  ACCESS_ONB_ABILITY,
  ACCESS_PLAN_BUILDER_ABILITY,
  ACCESS_REP_APPROVAL_ABILITY,
  ACCESS_SALES_OPERATIONS_ABILITY,
  ACCESS_SPT_ABILITY,
  ACCESS_USERS_MANAGEMENT_ABILITY,
  ACCESS_WIZARD_ABILITY,
  VIEW_AREAS_ABILITY,
  VIEW_TEAMS_ABILITY,
  VIEW_POLYGONS_ABILITY,
  VIEW_ANY_AREA_ABILITY,
  VIEW_ANY_TEAM_ABILITY,
  ACCESS_HOUSING_ABILITY,
};

export const userCan = (user, ability) => {
  switch (ability) {
    case ACCESS_ALL_LEADS_ABILITY:
    case ACCESS_MY_TREE_ABILITY:
    case ACCESS_ONB_ABILITY:
    case ACCESS_SALES_OPERATIONS_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
        DEALER_ADMIN_GROUP,
        MANAGERS_GROUP,
        REGIONAL_MANAGEMENT_GROUP,
      ].includes(user?.group_id);

    case ACCESS_PLAN_BUILDER_ABILITY:
    case ACCESS_REP_APPROVAL_ABILITY:
    case ACCESS_USERS_MANAGEMENT_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
        DEALER_ADMIN_GROUP,
      ].includes(user?.group_id);

    case ACCESS_SPT_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
        DEALER_ADMIN_GROUP,
        BRANCH_MANAGEMENT_GROUP
      ].includes(user?.group_id) || user?.area_management;

    case ACCESS_WIZARD_ABILITY:
      return user?.group_id === USERS_GROUP;

    case VIEW_AREAS_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
      ].includes(user?.group_id);

    case VIEW_TEAMS_ABILITY:
      return true;

    case VIEW_POLYGONS_ABILITY:
      return true;

    case VIEW_ANY_AREA_ABILITY:
    case VIEW_ANY_TEAM_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
        DEALER_ADMIN_GROUP,
      ].includes(user?.group_id);

    case ACCESS_HOUSING_ABILITY:
      return [
        SUPER_ADMIN_GROUP,
        DEALER_ADMIN_GROUP,
      ].includes(user?.group_id);

    default:
      return false;
  }
};
