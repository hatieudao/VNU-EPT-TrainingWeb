import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WorkSpace from './components/WorkSpace/WorkSpace';
import SideBar from './components/SideBar/SideBar';
import Login from './components/Login/Login';
import Result from './components/Result/Result';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Setting from './components/SettingExam/Setting';
import Dashboard from './components/Dashboard/Dashboard';
import { login } from './reducers/slices/user';

import './App.css';
function App() {
  const user = useSelector(state => state.user.infor);
  const role = useSelector(state => state.user.role);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      console.log(user);
      history.push('/login');
    }
  }, [user]);
  return (
    <Router >
      {!user ? <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div> :
        <div className="App">
          <Switch>
            <Route path="/dashboard">
              <SideBar />
              <Dashboard />
            </Route>
            <Route path="/setting">
              <SideBar />
              <Setting />
            </Route>
            <Route path="/result">
              <SideBar />
              <Result />
            </Route>
            <Route path="/profile">
              <SideBar />
              <Profile />
            </Route>
            <Route path="/study">
              <SideBar />
              <WorkSpace />
            </Route>
            <Route exact path="/">
              <Redirect to="/profile" />
            </Route>
            <Route path="*">
              <h1>Not found</h1>
            </Route>
          </Switch>
        </div>
      }
    </Router>
  );
}

export default App;
