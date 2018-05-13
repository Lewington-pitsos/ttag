import React from 'react';

/*
Displays a number of components depending on props

  - CategoryCard (a square box representing a category of things)

Relies on no store, but does rely on props:

  - Expects an array of objects, each represneting a category, to be passed in

Has no user interactions.

Handles the entry animation of all the Cards:

  - each Card will fly in swiftly fomr the screen bottom, with earlier/higher cards travelling faster

*/

export default class ThingContent extends React.Component {

    similarThings() {
      console.log(this.props.similarThings);
      return this.props.similarThings.map(function(thing) {
        return <span key={thing.id}>{ thing.name }</span>;
      })
    }

    render() {
      return (
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-4">
              IMAGE
            </div>
            <div className="col-8">
              <div className="container-fluid p-0">
                <div className='row'>
                  <div className="col-4 p-0">
                    <h4>{ this.props.content.name }</h4>
                  </div>
                  <div className="col-7 p-0">
                    <table>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td>Approval: </td>
                          <td>{ this.props.content.approval }</td>
                        </tr>
                        <tr>
                          <td>Similar Things: </td>
                          <td>{ this.similarThings() }</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p>{this.props.content.text} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
