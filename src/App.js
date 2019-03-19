import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/DashBoard';
import Login from './Components/Login';
import Error from './Components/Error';
import ProtectedRoutes from './Components/protectedRoutes'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './Reducers'

const store = createStore(rootReducer)

class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <ProtectedRoutes  path="/" component={Home} exact/>
          {/* <Route  path="/" component={Home} exact/> */}
          <Route path="/login" component={Login} />
          <Route path="/Error" component={Error} />
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
