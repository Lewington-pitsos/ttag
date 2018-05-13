import dispatcher from '../dispatcher'

export default {
  approve(thingId, userId) {
    dispatcher.dispatch({
      type: 'APPROVE',
      user: userId,
      thing: thingId
    });
  }
}
