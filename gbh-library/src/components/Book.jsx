import React, { Component, Fragment } from 'react';
import Pages from './Pages';
import { fetchBook } from '../actions/bookActions';
import { connect } from 'react-redux';
import { Card, Button, Row, Col } from 'react-bootstrap';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchBook(this.props.match.params.isbn);
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md={3} sm={12}>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/1000" />
              <Card.Body>
                <Card.Title>{this.props.books.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {this.props.books.publicationYear}
                </Card.Subtitle>
                <Card.Text></Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* <Link to={`/books/${this.props.books.ISBN}/page`}>
          Read {this.props.books.ISBN}
        </Link> */}
          <Col md={9} sm={12}>
            <Pages isbn={this.props.match.params.isbn} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Book.propTypes = {
  //isbn: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books.item,
});

export default connect(mapStateToProps, { fetchBook })(Book);
