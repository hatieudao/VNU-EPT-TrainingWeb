import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WorkSpace from './components/WorkSpace/WorkSpace';
import SideBar from './components/SideBar/SideBar';
import Login from './components/Login/Login';
import Result from './components/Result/Result';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import './App.css';
function App() {
  const user = useSelector(state => state.user);
  const history = useHistory();
  console.log(user);
  useEffect(() => {
    if (user.length === 0) {
      console.log("asdads")
      history.push("/login");
    }
  })
  return (

    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <SideBar />
          <WorkSpace />
        </Route>
        <Route path="/result">
          <SideBar />
          <Result />
        </Route>
        <Route path="/profile">
          <SideBar />
          <Profile />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </div>

  );
}

export default App;
