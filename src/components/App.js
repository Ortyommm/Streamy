import { Route, Redirect, Switch } from 'react-router-dom'
import StreamList from './streams/StreamList'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamShow from './streams/StreamShow'
import Header from './Header'

const App = () => {
  return (
    <div className="ui container">
      <Header />
      <div>
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  )
}

export default App
