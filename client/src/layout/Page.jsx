import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Diary from "pages/Diary";
import DailyRoutines from "pages/DailyRoutines";

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/diary" component={Diary} />
          <Route exact path="/daily-routines" component={DailyRoutines} />
        </Switch>
      </div>
    );
  }
}

export default Page;
