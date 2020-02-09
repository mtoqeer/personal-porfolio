import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        <Navbar bg="light">
          <Navbar.Brand href="/">
            <img
              src={config.siteLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="M Toqeer Iqbal"
            />
          </Navbar.Brand>
        </Navbar>
        {children}
      </div>
    );
  }
}
