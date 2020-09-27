import React, { Component, Fragment } from 'react';
import { fetchPage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { Row, Button } from 'react-bootstrap';

class Page extends Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.fetchPage(
      this.props.match.params.isbn,
      this.props.match.params.page
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.props.fetchPage(
        this.props.match.params.isbn,
        this.props.match.params.page
      );
    }
  }

  render() {
    return (
      <Fragment>
        <h1>{this.props.pages.isbn}</h1>
        <p>{this.props.pages.pageText}</p>
        <Row>
          <Button onClick={this.prevPage}> previous </Button>
          <Button onClick={this.nextPage}> next </Button>
        </Row>
      </Fragment>
    );
  }

  prevPage() {
    console.log('prev');
    if (
      this.props.pages.pageNumber - 1 >=
      this.props.pages.firstPage.pageNumber
    ) {
      this.props.onPageChange(this.props.pages.pageNumber - 1);
      this.props.history.push('' + (this.props.pages.pageNumber - 1));
    }
  }

  nextPage() {
    console.log(
      this.props.pages.pageNumber + 1,
      this.props.pages.lastPage.pageNumber
    );
    if (
      this.props.pages.pageNumber + 1 <=
      this.props.pages.lastPage.pageNumber
    ) {
      this.props.onPageChange(this.props.pages.pageNumber + 1);
      this.props.history.push('' + (this.props.pages.pageNumber + 1));
    }
  }
}

const mapStateToProps = (state) => ({
  pages: state.pages.item,
});

export default connect(mapStateToProps, { fetchPage })(Page);
