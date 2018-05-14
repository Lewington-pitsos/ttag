import dispatcher from '../dispatcher'

export default {
  approve(thingId, userId) {
    dispatcher.dispatch({
      type: 'APPROVE',
      user: userId,
      thing: thingId
    });
  },

  disapprove(thingId, userId) {
    dispatcher.dispatch({
      type: 'DISAPPROVE',
      user: userId,
      thing: thingId
    });
  }
}
