import React, { Component } from "react";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";
import "css/styles.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <section className="main">
          <Sidebar />
          <Page />
        </section>
      </div>
    );
  }
}

export default App;
