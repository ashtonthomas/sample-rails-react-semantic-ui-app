import React, { Component } from 'react';
import { connect } from 'react-redux';

// do not export this anymore as we are connecting to state
class BookListComponent extends Component {

  renderList(){
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className="">
          {book.title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="">
        {this.renderList()}
      </ul>
    )
  }

}

function mapStateToProps(state) {
  // whatever is returned will show up as props inside components
  return {
    books: state.books
  }
}

// now export usin the connect
export default connect(mapStateToProps)(BookListComponent);
