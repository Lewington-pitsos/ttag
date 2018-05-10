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

  goToCategory(id) {
    dispatcher.dispatch({
      type: 'GOTO',
      id: id,
      thing: false
    })
  },

  visitThing(id) {
    dispatcher.dispatch({
      type: 'GOTO',
      id: id,
      thing: true
    })
  }
}
