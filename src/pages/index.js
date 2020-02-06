import React from "react"
import { Link } from "gatsby"
import MainLayout from "../components/layout"
import SEO from "../components/seo"
import { Button } from "antd"

const IndexPage = () => (
  <MainLayout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Something is great coming soon...</p>

    <Button
      type="primary"
      href="https://www.upwork.com/freelancers/~01b3de937e37eb5fce"
      target="_blank"
      rel="nofollow noreferrer"
    >
      Hire Me
    </Button>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </MainLayout>
)

export default IndexPage
