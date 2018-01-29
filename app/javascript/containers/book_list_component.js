import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment } from 'semantic-ui-react';

import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

// do not export this anymore as we are connecting to state
class BookListComponent extends Component {

  renderList(){
    return this.props.books.map((book) => {
      return (
        <List.Item key={book.title} onClick={() => this.props.selectBook(book)}>
          <List.Content>

            <List.Header>
              {book.title}
            </List.Header>

            {book.description}

          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <Segment inverted>
        <List divided inverted relaxed>
          {this.renderList()}
        </List>
      </Segment>
    )
  }

}

function mapStateToProps(state) {
  // whatever is returned will show up as props inside components
  return {
    books: state.books
  }
}

// anything returned from this function will end up as props
// on the BookListComponent container
// this.props.selectBook will call this
function mapDispatchToProps(dispatch){
  // whenever select book is called,
  // the result should pass throug to all reducers

  // bindActionCreators spits this through all the reducers
  // select book is just a simple function
  return bindActionCreators({ selectBook: selectBook }, dispatch)
}

// now export usin the connect
// Promot BookListComponent from a component to a container
export default connect(mapStateToProps, mapDispatchToProps)(BookListComponent);
