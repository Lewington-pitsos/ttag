import dispatcher from '../dispatcher'

export default {
  switchAbout() {
    dispatcher.dispatch({
      type: 'SWITCH_ABOUT'
    });
  }
}
