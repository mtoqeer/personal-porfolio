/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import "antd/dist/antd.min.css"
import { Layout, Menu, Breadcrumb } from "antd"
const { Header, Content, Footer } = Layout

const MainLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Home</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Developed & Desinged By{" "}
        <a href="https://toqeeriqbal.com">Toqeer Iqbal</a>{" "}
      </Footer>
    </Layout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
