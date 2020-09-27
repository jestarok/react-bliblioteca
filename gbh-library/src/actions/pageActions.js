import { FETCH_PAGES, FETCH_PAGE, CREATE_PAGE } from './types';
import axios from 'axios';

// export const fetchPages = (ISBN) => (dispatch) => {
//   //fetch
//   axios
//     .get('http://localhost:5000/pages', { params: { isbn: ISBN } })
//     .then((res) => res.data)
//     .then((pages) =>
//       dispatch({
//         type: FETCH_PAGES,
//         payload: pages,
//       })
//     );
// };

export const fetchPages = (ISBN, pageAmount, offset) => (dispatch) => {
  //fetch
  axios
    .get('http://localhost:5000/pages', {
      params: { isbn: ISBN, pageAmount: pageAmount, offset: offset },
    })
    .then((res) => res.data)
    .then((pages) =>
      dispatch({
        type: FETCH_PAGES,
        payload: pages,
      })
    );
};

export const fetchPage = (ISBN, pageNumber) => (dispatch) => {
  //fetch
  axios
    .get('http://localhost:5000/pages', {
      params: { isbn: ISBN, pagenumber: pageNumber },
    })
    .then((res) => res.data)
    .then((page) =>
      dispatch({
        type: FETCH_PAGE,
        payload: page[0],
      })
    );
};
