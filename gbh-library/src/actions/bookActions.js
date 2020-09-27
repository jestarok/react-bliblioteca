import { FETCH_BOOKS, FETCH_BOOK, CREATE_BOOKS } from './types';
import axios from 'axios';

export const fetchBooks = () => (dispatch) => {
  //fetch
  axios
    .get('http://localhost:5000/books')
    .then((res) => res.data)
    .then((books) =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books,
      })
    );
};
export const fetchBook = (ISBN) => (dispatch) => {
  //fetch
  axios
    .get('http://localhost:5000/books', { params: { isbn: ISBN } })
    .then((res) => res.data)
    .then((book) =>
      dispatch({
        type: FETCH_BOOK,
        payload: book[0],
      })
    );
};
