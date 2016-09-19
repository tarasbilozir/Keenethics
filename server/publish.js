Messages = new Mongo.Collection('messages');

Meteor.publish('messages', function() {
    return Messages.find();
});