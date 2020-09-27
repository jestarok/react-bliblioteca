import React, { Component } from 'react';
import MyNavbar from './MyNavbar';
import Books from './Books';
import Book from './Book';
import Page from './Page';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: {},
    };

    this.changePage = this.changePage.bind(this);
  }

  render() {
    return (
      <Router>
        <MyNavbar />
        <Switch>
          <Route exact path="/">
            <About />
          </Route>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route exact path="/books/:isbn" component={Book} />
          <Route
            exact
            path="/books/:isbn/page/:page"
            render={(props) => (
              <Page
                {...props}
                pageNumber={this.state.pageNumber}
                onPageChange={this.changePage}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }

  changePage(pageNumber) {
    this.setState({ pageNumber: pageNumber });
  }
}

export default Home;
