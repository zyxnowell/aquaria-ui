import ActionButton from "antd/lib/modal/ActionButton";
import { ACTION_TYPES } from "../actions/aquaria";

const initialState = {
  list: [],
  pagination: {},
  pending: true,
  reload: false,
  tableConfig: { search: "", sort: "" },
  wikiList: [],
};

export const aquaria = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      const { docs, ...nodocs }: any = action.payload;
      return {
        ...state,
        list: [...docs],
        pagination: nodocs,
        pending: false,
        reload: false,
        tableConfig: {
          ...state.tableConfig,
          search: action.payload.search,
          sort: action.payload.sort,
        },
      };
    case ACTION_TYPES.CREATE:
      return {
        ...state,
        pending: true,
        reload: true,
      };
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x: any) =>
          x._id == action.payload._id ? action.payload : x
        ),
        reload: true,
      };

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x: any) => x._id != action.payload),
        reload: true,
      };

    case ACTION_TYPES.FETCH_WIKI:
      return {
        ...state,
        wikiList: action.payload,
      };

    default:
      return state;
  }
};
