import { Switch, Route } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import List from './components/list';

function App() {
  return (
    <Switch>
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/list' component={List} />
    </Switch>
  );
}

export default App;
