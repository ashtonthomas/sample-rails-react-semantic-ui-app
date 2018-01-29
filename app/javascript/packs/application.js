console.log('loading packs/application.js via webpacker');

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../components/app'
// import reducer from '../reducers'

// const store = createStore(reducer)

render(
  // <Provider store={store}>
    <App />
  // </Provider>
  ,
  document.getElementById('root')
)
