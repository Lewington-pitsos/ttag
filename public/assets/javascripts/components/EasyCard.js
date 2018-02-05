import React from 'react';
import Card from './Card'

export default class EasyCard extends Card {
  constructor(props) {
    super(props);
  }

  cardSpecificFlip() {
    $(`#${this.props.id}.flip-container`).toggleClass('hover');
  }
}
