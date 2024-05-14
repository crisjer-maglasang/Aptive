import { createReducer } from '@/redux/root';
import { settingsNameSpace, requestSettingsAsync } from './actions';
import { NAME } from './selectors';

const settingNames = [
  'agreement_lengths',
  'plan_categories',
  'plan_pricing_levels',
  'plan_service_frequencies',
  'plan_statuses',
];

const emptySettings = {};

settingNames.forEach((name) => (emptySettings[name] = []));

const labelOptions = ({ name, id }) => ({
  label: name,
  value: id,
});

const frequencyOptions = ({ frequency, id }) => ({
  label: `${frequency}`,
  value: id,
});

function sortSettingsByOrder(settings) {
  // Sort each array in the settings object by the "order" property
  for (const key in settings) {
    if (Array.isArray(settings[key])) {
      settings[key].sort((a, b) => a.order - b.order);
    }
  }

  return settings;
}

const Settings = (settings) => {
  settings = sortSettingsByOrder(settings);
  const maps = {};
  settingNames.forEach((name) => {
    maps[name] = new Map();
    settings[name].forEach((setting) => {
      maps[name].set(setting.id, setting);
    });
    settings[name].sort((a, b) => a.order - b.order);
  });

  const get = (setting_name, id, field) => {
    id = parseInt(id);
    const setting = maps[setting_name].get(id);
    if (setting === undefined) {
      return null;
    }
    if (field === undefined) {
      return setting;
    }

    return setting[field];
  };

  const options = {
    agreement_lengths: settings['agreement_lengths'].map(labelOptions),
    plan_categories: settings['plan_categories'].map(labelOptions),
    plan_pricing_levels: settings['plan_pricing_levels'].map(labelOptions),
    plan_service_frequencies:
      settings['plan_service_frequencies'].map(frequencyOptions),
    plan_statuses: settings['plan_statuses'].map(labelOptions),
  };

  return {
    get,
    ...settings,
    options,
  };
};

export const planSettingsReducer = {
  [NAME]: createReducer(
    settingsNameSpace,
    {
      settings: Settings(emptySettings),
    },
    {
      [requestSettingsAsync.success]: ({ state, action: { payload } }) => {
        state.settings = Settings(payload);
      },
    }
  ),
};
