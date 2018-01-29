import React from 'react'
import { Button } from 'semantic-ui-react'

import '../../../dist/semantic.min.css';

const App = () => (
  <div>
    <Button onClick={() => console.log("Click!") }>
      The Button Here
    </Button>
  </div>
)

export default App
