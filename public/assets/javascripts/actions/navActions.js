import dispatcher from '../dispatcher'

export default {
  up() {
    dispatcher.dispatch({
      type: 'UP'
    });
  },

  root() {
    dispatcher.dispatch({
      type: 'ROOT'
    });
  }
}
