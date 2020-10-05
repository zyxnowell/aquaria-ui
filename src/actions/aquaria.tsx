import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
  FETCH_WIKI: "FETCH_WIKI",
};

export const fetchAll = (data: any) => (dispatch: any) => {
  const search = data.search !== undefined ? data.search : "";
  const sort = data.sort !== undefined ? data.sort : "";
  const params = {
    page: data.page,
    size: data.size,
    search,
    sort,
  };
  api
    .aquaria()
    .fetchAll(params)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: { ...res.data, search, data: data.sort },
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data: any, onSuccess: any) => (dispatch: any) => {
  api
    .aquaria()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const update = (id: string, data: any, onSuccess: any) => (
  dispatch: any
) => {
  api
    .aquaria()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const Delete = (id: string, onSuccess: any) => (dispatch: any) => {
  api
    .aquaria()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const searchWiki = (search: any) => (dispatch: any) => {
  if (search !== "") {
    const params = {
      action: "query",
      list: "search",
      origin: "*",
      format: "json",
      srsearch: `${search} freshwater fish`,
    };
    api
      .aquaria()
      .searchWiki(params)
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.FETCH_WIKI,
          payload: res.data.query.search || [],
        });
      })
      .catch((err) => console.log(err));
  } else {
    dispatch({
      type: ACTION_TYPES.FETCH_WIKI,
      payload: [],
    });
  }
};
