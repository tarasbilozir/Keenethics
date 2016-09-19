import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LocationForm extends TrackerReact(React.Component) {
    constructor() {
        super();
        
        this.state = {
            location: Meteor.user() && Meteor.user().profile && Meteor.user().profile.location ? Meteor.user().profile.location : 'default'
        };
    }
    editLocation(event) {
        event.preventDefault();
        
        Meteor.call('editUserLocation', this.refs.location.value.trim(), error => {
            if (!error) {
                alert('Location was succesfully updated.');
            }
            else {
                console.error(error);
                alert('Something went wrong!');
            }
        });
    }
    locationForm(user) {
        return (
            <div>
                <form>
                    <select ref='location' value={this.props.user && this.props.user.profile && this.props.user.profile.location ? this.props.user.profile.location : 'default'} onChange={this.editLocation.bind(this)}>
                        <option value='default' >...</option>
                        <option value='lv'>Lviv</option>
                        <option value='ky'>Kyiv</option>
                        <option value='pr'>Praga</option>
                    </select>
                </form>
            </div>
        );
    }
    editUserName(event, param) {
        event.preventDefault();
        
        this.setState({'editName':true});
    }
    closeEditName(event, param) {
        event.preventDefault();
        
        this.setState({'editName':false});
    }
    render() {
        return (
            <div>
                <h3>Location:</h3>
                {this.locationForm()}
            </div>
        );
    }
}