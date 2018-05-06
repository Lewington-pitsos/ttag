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
  },

  goToNode(id, thing) {
    dispatcher.dispatch({
      type: 'GOTO',
      id: id,
      thing: thing
    })
  }
}
