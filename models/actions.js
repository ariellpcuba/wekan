import { Meteor } from 'meteor/meteor';

Actions = new Mongo.Collection('actions');

Actions.allow({
  insert(userId, doc) {
    return allowIsBoardAdmin(userId, Boards.findOne(doc.boardId));
  },
  update(userId, doc) {
    return allowIsBoardAdmin(userId, Boards.findOne(doc.boardId));
  },
  remove(userId, doc) {
    return allowIsBoardAdmin(userId, Boards.findOne(doc.boardId));
  },
});

Actions.helpers({
  description() {
    return this.desc;
  },
});

Actions.before.update((userId, doc, fieldNames, modifier, options) => {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
});

if (Meteor.isServer) {
  Meteor.startup(() => {
    Actions._collection._ensureIndex({ modifiedAt: -1 });
  });
}

export default Actions;
