import produce from 'immer';
import { formConstants } from '../constants';

export const formReducer = produce((draft, action) => {
  const {
    REPLACE_STATE,
    FIRST_LEVEL_PROPERTY,
    SECOND_LEVEL_PROPERTY,
    THIRD_LEVEL_PROPERTY,
    FOURTH_LEVEL_PROPERTY,
    ARRAY_CHANGE_ITEM,
    ARRAY_REMOVE_ITEM,
  } = formConstants;
  const { type, parent, child, subField, field, payload } = action;
  switch (type) {
    case REPLACE_STATE:
      return payload;
    case FIRST_LEVEL_PROPERTY:
      draft[parent] = payload;
      break;
    case SECOND_LEVEL_PROPERTY:
      draft[parent][child] = payload;
      break;
    case THIRD_LEVEL_PROPERTY:
      draft[parent][child][field] = payload;
      break;
    case FOURTH_LEVEL_PROPERTY:
      draft[parent][child][field][subField] = payload;
      break;
    case ARRAY_CHANGE_ITEM:
      const { index, name, fieldName, value } = payload;

      draft[parent][child][index][name] = {
        ...draft[parent][child][index][name],
        [fieldName]: value,
      };
      break;
    case ARRAY_REMOVE_ITEM:
      const { id } = payload;

      draft[parent][child] = draft[parent][child].filter(
        (el) => el.setId !== id
      );
      break;
    default:
      throw new Error();
  }
});
