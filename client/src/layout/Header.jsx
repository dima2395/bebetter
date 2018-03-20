import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
  return (
        <header className="header">
            <div className="logo">
              <Link to="/">
                B<span>e</span> B<span>e</span>tt<span>e</span>r
              </Link>
            </div>
        </header>
    );
  }
}

export default Header;
