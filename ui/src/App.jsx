import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import TopicList from "./TopicList.jsx";

class Page extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="" to="/sign-in" />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/topic-list" component={TopicList} />
      </Switch>
    );
  }
}

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById("root"));
