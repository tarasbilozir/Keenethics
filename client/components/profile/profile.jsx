import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailForm from './entities/email-form.jsx';
import NameForm from './entities/name-form.jsx';
import LocationForm from './entities/location-form.jsx';
import CheckPasswordForm from './entities/change-password-form.jsx';

export default class Profile extends TrackerReact(React.Component) {
    findUser() {
        return Meteor.users.findOne({'_id':Meteor.userId()});
    }
    render() {
        let user = this.findUser();
        return (
            <div>
                <h2>Profile</h2>
                <div>
                    <EmailForm user={user} />
                </div>
                <div>
                    <NameForm user={user} />
                </div>
                <div>
                    <LocationForm user={user} />
                </div>
                <div>
                    <CheckPasswordForm />
                </div>
            </div>
        );
    }
}