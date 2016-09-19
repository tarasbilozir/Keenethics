Meteor.methods({
    sendMessage(message) {
        Messages.insert({
            text: message,
            location: Meteor.user().profile.location ? Meteor.user().profile.location : null,
            date: new Date().getTime()
        });
    },
    editUserEmail(email) {
        Meteor.users.update(Meteor.userId(), {
            $set: {'emails':[{address:email, 'verified':false}]}
        });
    },
    editUserName(name) {
        Meteor.users.update(Meteor.userId(), {
            $set: {'profile':{name:name, location:Meteor.user().profile.location ? Meteor.user().profile.location : ''}}
        });
    },
    editUserLocation(location) {
        Meteor.users.update(Meteor.userId(), {
            $set: {'profile':{location:location, name:Meteor.user().profile.name ? Meteor.user().profile.name : ''}}
        });
    }
});