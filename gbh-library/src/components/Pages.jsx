import React, { Component, Fragment } from 'react';
import Table from './Table';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages } from '../actions/pageActions';
import { ButtonGroup, Button } from 'react-bootstrap';

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  componentDidMount() {
    this.props.fetchPages(this.props.isbn, 5, this.state.offset);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.props.fetchPages(this.props.isbn, 5, this.state.offset);
    }
  }

  render() {
    return (
      <Fragment>
        <Table
          headers={['ISBN', 'Pagina']}
          rows={this.props.pages.map((page) => [
            <Link
              key={page.id}
              to={`/books/${page.ISBN}/page/${page.pageNumber}`}
            >
              {pad(page.ISBN, 13)}
            </Link>,
            page.pageNumber,
          ])}
        />
        <ButtonGroup>
          <Button onClick={this.prevPage}> previous </Button>
          <Button onClick={() => {}} disabled>
            {this.state.offset + 1}
          </Button>
          <Button onClick={this.nextPage}> next </Button>
        </ButtonGroup>
      </Fragment>
    );
  }

  prevPage() {
    console.log('prev', this.state.offset);
    if (this.state.offset >= 1) {
      this.setState({ offset: this.state.offset - 1 });
    }
  }

  nextPage() {
    console.log('next');
    if (this.state.offset <= 1) {
      this.setState({ offset: this.state.offset + 1 });
    }
  }
}

Pages.propTypes = {
  isbn: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  pages: state.pages.items,
});

function pad(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export default connect(mapStateToProps, { fetchPages })(Pages);
