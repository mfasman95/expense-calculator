import React from 'react';

/**
 * @class Router - A component that serves as a page router
 * 
 * @prop pages - An array of react components
 * @prop currentPage - The current page to render from pages
 * @prop custom404 - (optional) A custom 404 page to render if current page is not in pages. This has a default react component it will render, and will be passed the property currentPage.
 */

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    // Determine the 404 page for this component
    this.NotFoundPage = (this.props.custom404) ?
      // If a custom 404 page is passed to the router, use it
      this.props.custom404 :
      // Otherwise, use the generic 404 page
      (props) => (
        <div>
          <h1>404: Page Not Found</h1>
          <h3>The page <b>{props.pageWanted}</b> could not be found...</h3>
        </div>
      );
  }
  render() {
    const Page = this.props.pages[this.props.currentPage];

    // Render the current page in pages
    // Fallback to the 404 page if the current page is not in pages
    return Page ? <Page/> : this.NotFoundPage({ pageWanted: this.props.currentPage });
  }
}
