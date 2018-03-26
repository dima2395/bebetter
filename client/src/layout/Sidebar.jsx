import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    // const pathname = window.location.pathname;
    return (
      <aside className="sidebar">
        <ul className="menu">
          <li className="diary">
            <Link to="/diary">
              <Icon name="book" size="large" />
              <div className="text">Дневник</div>
            </Link>
          </li>
          <li className="daily-routines">
            <Link to="/daily-routines">
              <Icon name="clock" size="large" />
              <div className="text">Привычки</div>
            </Link>
          </li>
        </ul>
        {/* <div className="hider">
          <Icon name="angle double left" size="big" />
        </div> */}
      </aside>
    );
  }
}

export default Sidebar;
