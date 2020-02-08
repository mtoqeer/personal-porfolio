import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`Home | ${config.siteTitle}`} />
          <h1>Home Page</h1>
        </div>
      </Layout>
    );
  }
}

export default Home;
