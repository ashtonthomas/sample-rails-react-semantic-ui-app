import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment } from 'semantic-ui-react';

// do not export this anymore as we are connecting to state
class BookListComponent extends Component {

  renderList(){
    return this.props.books.map((book) => {
      return (
        <List.Item>
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

// now export usin the connect
export default connect(mapStateToProps)(BookListComponent);
