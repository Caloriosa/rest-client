/**
 * @class
 * @static
 */
class DataResolver {
  constructor () {
    throw new Error("Can't instantiate static class!")
  }

  /**
     *
     * @param {UidResolvable} uidResolvable
     * @static
     */
  static resolveUid (uidResolvable) {
    if (typeof uidResolvable === "string") {
      return uidResolvable
    }
    if (uidResolvable.uid && typeof uidResolvable.uid === "string") {
      return uidResolvable.uid
    }
    if (uidResolvable._id && typeof uidResolvable._id === "string") {
      return uidResolvable._id
    }
    return null
  }
}

module.exports = DataResolver
