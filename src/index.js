import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import history from './history'

import App from './components/App'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
)

render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)
