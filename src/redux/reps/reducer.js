import { createReducer } from '@/redux/root';
import { reduce } from 'lodash-es';

import { logoutAction } from '../auth';

import {
  nameSpace,
  addRepAsync,
  requestDownlineAsync,
  requestRepAsync,
  requestMyTreeUserContactAsync,
  requestRecruitProgressAsync,
  setManagerInterviewAction,
  adminUpdateRepAsync,
  requestRecruitingSeasonAsync,
  requestExperienceOptionsAsync,
  requestApartmentStatusesAsync,
  requestRepsWorkdayTasksAsync,
  updateRepsWorkdayTaskAsync,
  requestAttachmentsAsync,
  requestRepStatusesAsync,
  clearWorkdayTasksErrorsAction,
  requestSalesProgramsAsync,
} from './actions';

const initialState = {
  recruiters: null,
  filteredCount: null,
  downline: null,
  count: null,
  myTree: {},
};

export const repsReducer = createReducer(nameSpace, initialState, {
  [addRepAsync.success]: ({ state, action }) => {
    const { rep } = action.payload;

    state[rep.id] = {
      ...rep,
    };
  },

  [requestDownlineAsync.success]: ({ state, action }) => {
    const { hasFilters, count, items } = action.payload;

    if (hasFilters) {
      state.count = count;
    }

    state.filteredCount = count;
    state.downline = items.map(({ attributes: resource }) => {
      const { recruit_type: type, ...attributes } = resource;

      return {
        type,
        ...attributes,
      };
    });
  },

  [requestMyTreeUserContactAsync.success]: ({ state, action }) => {
    state.myTree[action.payload?.user_id] = {
      ...action.payload,
    };
  },

  [requestRepAsync.success]: ({ state, action }) => {
    const { recruit: { id, ...attributes } } = action.payload;

    state[id] = {
      id,
      ...attributes,
    };
  },

  [requestRecruitProgressAsync.success]: ({ state, action }) => {
    /**
     * Use lodash/reduce because `resources` can be either an array or an array-like object.
     *
     * @param {(Object[]|Object.<number, Object>)} resources
     *
     * @returns {Object[]}
     */
    const mapResponseData = (resources) => reduce(resources, (result, resource) => {
      const { user_id: id, ...attributes } = resource.attributes ? resource.attributes : resource;

      result.push({
        id,
        ...attributes,
        ...(attributes.children && { children: mapResponseData(attributes.children) }),
      });

      return result;
    }, []);

    const { count, items } = action.payload;

    state.recruiters = {
      total: count,
      data: mapResponseData(items),
    };
  },

  [setManagerInterviewAction]: ({ state, action }) => {
    /**
     * Find the requested recruit by id and set their `manager_interview` to value of 1.
     *
     * @param {number} id
     * @param {Object[]} recruits
     *
     * @returns {Object[]}
     */
    const setManagerInterview = (id, recruits) => recruits.map((recruit) => ({
      ...recruit,
      ...(recruit.id === id && { manager_interview: 1 }),
      ...(recruit.children && { children: setManagerInterview(id, recruit.children) }),
    }));

    const { id } = action.payload;

    state.recruiters.data = setManagerInterview(id, state.recruiters.data);
  },

  [adminUpdateRepAsync.success]: ({ state, action }) => {
    const { rep } = action.payload;

    state[rep.id] = {
      ...rep,
    };
  },

  [requestRecruitingSeasonAsync.success]: ({ state, action }) => {
    const { season_id: id, ...attributes } = action.payload;

    state.recruitingSeason = {
      id,
      ...attributes,
    };
  },

  [requestExperienceOptionsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.experienceOptions = items.map(({ attributes: resource }) => {
      const { option_id: id, ...attributes } = resource;

      return {
        id,
        ...attributes,
      };
    });
  },

  [requestSalesProgramsAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.salesPrograms = items.map(({ attributes: resource }) => {
      const { program_id: id, ...attributes } = resource;

      return {
        id,
        ...attributes,
      };
    });
  },

  [requestApartmentStatusesAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.apartmentStatuses = items.map(({ attributes: resource }) => {
      const { status_id: id, ...attributes } = resource;

      return {
        id,
        ...attributes,
      };
    });
  },

  [requestRepStatusesAsync.success]: ({ state, action }) => {
    const { items } = action.payload;

    state.repStatuses = items.map(({ attributes: resource }) => {
      return {
        statusId: resource.status_id,
        statusCode: resource.status_code,
        statusTitle: resource.status_title,
        isLossOfAccess: resource.is_loss_of_access,
        isFinished: resource.is_finished,
        shouldBeUpdatedWithStartDate: resource.should_be_updated_with_start_date,
        shouldBeUpdatedWithEndDate: resource.should_be_updated_with_end_date,
      };
    });
  },

  [logoutAction]: ({ state }) => {
    state.recruiters = initialState.recruiters;
    state.filteredCount = initialState.filteredCount;
    state.downline = initialState.downline;
    state.count = initialState.count;
    state.myTree = initialState.myTree;
  },

  [requestRepsWorkdayTasksAsync.success]: ({ state, action }) => {
    const { userId, receivedWorkdayTasks, hrData } = action.payload;

    const workdayTasks = [
      {
        taskName: 'is_profile_img_lock',
        taskCompleted: receivedWorkdayTasks.data.attributes.is_profile_img_lock,
        taskLabel: 'Approved Photo',
        disabled: false,
      },
      {
        taskName: 'dd_completed',
        taskCompleted: receivedWorkdayTasks.data.attributes.dd_completed,
        taskLabel: 'Direct Deposit',
        disabled: false,
      },
      {
        taskName: 'bc_completed',
        taskCompleted: receivedWorkdayTasks.data.attributes.bc_completed,
        taskLabel: 'Background Check Release Form',
        disabled: false,
      },
      {
        taskName: 'w9',
        taskCompleted: receivedWorkdayTasks.data.attributes.w9,
        taskLabel: 'W-9',
        disabled: false,
      },
      {
        taskName: 'i9_form',
        taskCompleted: receivedWorkdayTasks.data.attributes.i9_form,
        taskLabel: 'I-9 Form',
        disabled: false,
      },
    ];

    state[`user_id_${userId}`] = {
      ...state[`user_id_${userId}`],
      workdayTasks: [...workdayTasks],
    };
  },

  [clearWorkdayTasksErrorsAction]: ({ state, action }) => {
    const { userId } = action.payload;

    state[`user_id_${userId}`] = {
      workdayTasksErrors: null,
    };
  },

  [updateRepsWorkdayTaskAsync.success]: ({ state, action }) => {
    const { userId, receivedWorkdayTasks } = action.payload;

    const workdayTasks = [
      {
        taskName: 'is_profile_img_lock',
        taskCompleted: receivedWorkdayTasks.data.attributes.is_profile_img_lock,
        taskLabel: 'Approved Photo',
        disabled: false,
      },
      {
        taskName: 'dd_completed',
        taskCompleted: receivedWorkdayTasks.data.attributes.dd_completed,
        taskLabel: 'Direct Deposit',
        disabled: false,
      },
      {
        taskName: 'bc_completed',
        taskCompleted: receivedWorkdayTasks.data.attributes.bc_completed,
        taskLabel: 'Background Check Release Form',
        disabled: false,
      },
      {
        taskName: 'w9',
        taskCompleted: receivedWorkdayTasks.data.attributes.w9,
        taskLabel: 'W-9',
        disabled: false,
      },
      {
        taskName: 'i9_form',
        taskCompleted: receivedWorkdayTasks.data.attributes.i9_form,
        taskLabel: 'I-9 Form',
        disabled: false,
      },
    ];

    state[`user_id_${userId}`] = {
      ...state[`user_id_${userId}`],
      workdayTasks: [...workdayTasks],
      workdayTasksErrors: null,
    };
  },

  [updateRepsWorkdayTaskAsync.failure]: ({ state, action: { payload: { payload, response } } }) => {
    const { userId } = payload;

    state[`user_id_${userId}`] = {
      ...state[`user_id_${userId}`],
      workdayTasksErrors: [response.errors.map((error) => error.detail || 'Something went wrong.')],
    };
  },

  [requestAttachmentsAsync.success]: ({ state, action }) => {
    const { userId, receivedAttachments } = action.payload;

    const attachments = receivedAttachments.map((receivedAttachment) => ({
      item: receivedAttachment.attributes?.item,
      url: receivedAttachment.attributes?.meta?.url,
      type: receivedAttachment.attributes?.meta?.type,
      docusignDocumentType: receivedAttachment.attributes?.meta?.docusign_document_type,
    }));

    const selector = userId ? `user_id_${userId}` : 'self_user';

    state[selector] = {
      ...state[selector],
      attachments,
      attachmentsErrors: null,
    };
  },

  [requestAttachmentsAsync.failure]: ({ state, action: { payload: { payload, response } } }) => {
    const { userId } = payload;

    const selector = userId ? `user_id_${userId}` : 'self_user';

    state[selector] = {
      ...state[selector],
      attachmentsErrors: [response.errors.map((error) => error.title || 'Something went wrong.')],
    };
  },
});
