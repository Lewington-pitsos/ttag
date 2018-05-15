import dispatcher from '../dispatcher'

export default {
  removeFromCategory(categoryId, thingId) {
    dispatcher.dispatch({
      type: 'REMOVE_FROM_CATEGORY',
      categoryId: categoryId,
      thingId: thingId
    });
  }
}
