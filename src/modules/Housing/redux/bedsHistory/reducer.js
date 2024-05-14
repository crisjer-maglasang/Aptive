import { createReducer } from '@/redux/root';
import { s2ab } from '@/lib/utils';
import { saveAs } from 'file-saver';
import { requestBedsHistoryAsync, exportBedsHistoriesAsync, bedsHistoryNameSpace } from './actions';

const downloadBedsHistoriesFile = (payload) => {
  const fileData = payload?.data?.attributes;
  const blob = new Blob([s2ab(atob(fileData?.file))], { type: '' });
  saveAs(blob, fileData?.file_name);
};

const initialState = {
  bedsHistoryList: [],
  bedsHistoryTotal: 0,
};

export const bedsHistoryReducer = createReducer(bedsHistoryNameSpace, initialState, {
  [requestBedsHistoryAsync.success]: ({ state, action }) => {
    const { items, total } = action.payload;
    state.bedsHistoryList = items;
    state.bedsHistoryTotal = total;
  },

  [exportBedsHistoriesAsync.success]: ({ action: { payload } }) => {
    downloadBedsHistoriesFile(payload);
  },
});
