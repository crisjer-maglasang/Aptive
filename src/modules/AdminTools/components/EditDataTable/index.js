import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

import SettingDataTable from '../SettingDataTable';
import EditDataTableField from './EditDataTableField';

const EditDataTable = ({
  title,
  defaultValues,
  fields,
  getSearchField,
  searchPlaceholder,
  sortOrders,
  selector,
  removeAsync,
  createAsync,
  updateAsync,
  getSortField,
  mapData,
  schema,
  editButtons,
  getIsDisabled,
  filters,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const dataState = new Map();
  const errorState = new Map();

  const validate = async (request, data) => {
    if (!schema) {
      dispatch(request(data));

      return;
    }

    let err = null;
    await schema
      .validate(data, { abortEarly: false })
      .then(() => dispatch(request(data)))
      .catch((error) => (err = error));

    const errorsMap = {};
    err?.inner.forEach((error) => (errorsMap[error.path] = error));
    errorState.set(data.id, errorsMap);

    return err;
  };

  const onCreate = (data) => {
    return validate(createAsync.request, data);
  };

  const remove = useCallback(
    (id) => {
      if (!window.confirm('Are you sure?')) {
        return;
      }

      dispatch(removeAsync.request({ id }));
    },
    [dispatch, removeAsync]
  );

  const update = useCallback(
    (id) => {
      const updateData = dataState.get(id);
      if (updateData !== undefined) {
        return validate(updateAsync.request, updateData);
      }
    },
    [dispatch, updateAsync]
  );

  const indexMap = useMemo(() => {
    const map = {};

    data.forEach(({ id }, index) => {
      map[id] = index;
    });

    return map;
  }, [data]);

  const rowMap = useCallback(
    (data) => ({
      data,
      remove: () => remove(data.id),
      update: () => update(data.id),
      index: indexMap[data.id],
      ...mapData,
    }),
    [indexMap, mapData, remove, update]
  );

  const updateValue = useCallback(async (newData, data, name) => {
    let currentData = dataState.get(data.id);
    if (!currentData) {
      currentData = data;
    }
    const newDataState = {
      ...currentData,
      [name]: newData,
    };

    dataState.set(data.id, newDataState);

    let err = null;
    if (schema && schema.fields && schema.fields[name]) {
      await schema
        .validateAt(name, newDataState)
        .catch((error) => (err = error));
    }

    let errorsMap = errorState.get(data.id);
    if (!errorsMap) {
      errorsMap = {};
    }
    if (err) {
      errorsMap[name] = err;
    } else {
      delete errorsMap[name];
    }
    errorState.set(data.id, errorsMap);

    return err;
  }, []);

  if (editButtons) {
    editButtons = [
      {
        label: '',
        render: editButtons,
      },
    ];
  } else {
    editButtons = [
      {
        label: '',
        render: ({ update }) => (
          <div className="text-primary-300 cursor-pointer" onClick={update}>
            Save
          </div>
        ),
      },
      {
        label: '',
        render: ({ remove }) => (
          <div className="text-red-300 cursor-pointer" onClick={remove}>
            Remove
          </div>
        ),
      },
    ];
  }

  const table = useMemo(() => {
    return [
      ...fields.map((props) => {
        const render = (renderProps) => {
          let originalValue = renderProps.data[props.name];
          let originalError = null;
          if (dataState.has(renderProps.data.id)) {
            originalValue = dataState.get(renderProps.data.id)[props.name];
            originalError = errorState.get(renderProps.data.id)?.[props.name];
          }

          return (
            <EditDataTableField
              {...{
                originalValue,
                renderProps,
                props,
                updateValue,
                originalError,
                getIsDisabled,
              }}
              getData={() => dataState.get(renderProps.data.id)}
            />
          );
        };

        return {
          label: props.label,
          sortBy: props.sort === false ? undefined : props.name,
          render: props.Render ? props.Render : render,
        };
      }),
      ...editButtons,
    ];
  }, [fields, updateValue]);

  return (
    <SettingDataTable
      data={data}
      headerOptions={{
        title,
        defaultValues,
        onCreate,
        fields,
        schema,
      }}
      tableOptions={{
        getSortField,
        getSearchField,
        rowMap,
        searchPlaceholder,
        table,
        sortOrders,
        filters,
      }}
    />
  );
};

EditDataTable.propTypes = {
  createAsync: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  defaultValues: PropTypes.any.isRequired,
  fields: PropTypes.array.isRequired,
  removeAsync: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
  getSearchField: PropTypes.func.isRequired,
  sortOrders: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  updateAsync: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  getSortField: PropTypes.func,
  mapData: PropTypes.any,
  schema: PropTypes.any,
  editButtons: PropTypes.any,
  getIsDisabled: PropTypes.func,
  filters: PropTypes.array,
};

export default EditDataTable;
