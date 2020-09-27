import React, { Component } from 'react';
import Table from './Table';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/bookActions';

class Books extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <Table
        headers={['ISBN', 'Titulo', 'Año de Publicación']}
        rows={this.props.books.map((book) => [
          <Link key={book.id} to={`/books/${book.ISBN}`}>
            {pad(book.ISBN, 13)}
          </Link>,
          book.title,
          book.publicationYear,
        ])}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books.items,
});

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export default connect(mapStateToProps, { fetchBooks })(Books);
