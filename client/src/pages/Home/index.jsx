import React from "react";
import { Segment } from "semantic-ui-react";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Segment className="page-main-segment">
          <h1>Добро пожаловать</h1>
          <h3>BeBetter - приложение позволяющее вам стать лучше.</h3>
        </Segment>
      </div>
    );
  }
}

export default Home;
