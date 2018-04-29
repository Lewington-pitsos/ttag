import React from 'react';

/*
Literally just displays the category title, which is passed in via props
*/

export default class CategoryTitle extends React.Component {

    titleDisplay() {
      // returns the right kind of title display depending on whethe we are at the root category ot not
      if (this.props.title == 'root') {
        return(<h1 className="text-center">Things that are Good</h1>);
      } else {
        return(<h2 className="text-center">{this.props.title}</h2>);
      }
    }

    render() {
      return (
        <div className="row justify-content-center" id="category-title">
          <div className="row">
            <div className="col-12">
              {this.titleDisplay()}
            </div>
          </div>
        </div>
      );
    }
}
