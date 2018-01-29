import React from 'react'
import { Button } from 'semantic-ui-react'
import BookListComponent from '../containers/book_list_component'

import '../../../dist/semantic.min.css';

const App = () => (
  <div>
    <Button onClick={() => console.log("Click!") }>
      The Button Here
    </Button>
  <BookListComponent />
  </div>
)

export default App
