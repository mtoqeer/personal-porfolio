import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./listing.css";

class Listing extends React.Component {
  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;

    return (
      <div className="">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              {!isFirstPage && (
                <Link to={prevPage} className="page-link">
                  Previous
                </Link>
              )}
            </li>

            {[...Array(pageCount)].map((_val, index) => {
              const pageNum = index + 1;
              return (
                <li class="page-item">
                  <Link
                    className="page-link"
                    key={`listing-page-${pageNum}`}
                    to={pageNum === 1 ? "/" : `/${pageNum}/`}
                  >
                    {pageNum}
                  </Link>
                </li>
              );
            })}

            <li class="page-item">
              {!isLastPage && (
                <Link to={nextPage} className="page-link">
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout>
        <div className="container mt-5">
          <div className="posts-container">
            <Helmet title={config.siteTitle} />
            <SEO />
            <PostListing postEdges={postEdges} />
          </div>
          {this.renderPaging()}
        </div>
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
