import { FETCH_PAGES, FETCH_PAGE, CREATE_PAGE } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGES:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_PAGE:
      return {
        ...state,
        item: action.payload,
      };
    case CREATE_PAGE:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
