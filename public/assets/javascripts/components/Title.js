import React from 'react'

export default class App extends React.Component {
   render() {
      return (
         <h1 className="animated bounce">
            {this.props.children}
         </h1>
      );
   }
}
