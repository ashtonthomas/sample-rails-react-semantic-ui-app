import React from 'react'
import { Button, Grid, Header, Icon } from 'semantic-ui-react'
import BookListComponent from '../containers/book_list_component'

import '../../../dist/semantic.min.css';

const App = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='users' />
      Sample App
      <Header.Subheader>
        A simple sample app that uses react, redux, etc.
      </Header.Subheader>
    </Header>
    <Grid>
      <Grid.Row>
        <Grid.Column width="1" />
        <Grid.Column width="14">
          <BookListComponent />
        </Grid.Column>
        <Grid.Column width="1" />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button onClick={() => console.log("Click!") }>
            The Button Here
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default App
