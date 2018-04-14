import React from 'react';

/*
Displays no further components

Relies on no stores

This is literally just static html.

*/
export default class About extends React.Component {
   render() {
      return (
        <div id="about">
          <div className="row justify-content-center">
            <div className="col-8 d-flex align-items-center flex-column">
              <h1>Good Question</h1>
              <p>Lorem ipsum dolor sit amet, omnis lucilius vis at, probo mentitum oportere has eu. Ea eos dolores scripserit complectitur. Sit noluisse similique in, justo ignota urbanitas pro ei. Partem essent id sed, summo integre efficiendi ne vix. Quas civibus tincidunt mei at. Nonumes phaedrum consectetuer nam an, cu quo fugit mollis.</p>

              <p>Ex quod tritani iuvaret nam. Libris bonorum nominati no usu, ad ius illud admodum. Id quod alii causae sed. Solet luptatum per ut, vix eu brute expetenda. Viderer contentiones cu est, error democritum id qui. Ex vis quem dico, nam impetus appellantur an.</p>

              <h3>Contact</h3>

            </div>
          </div>
        </div>
      );
   }
}
