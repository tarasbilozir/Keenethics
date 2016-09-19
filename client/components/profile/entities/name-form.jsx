import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NameForm extends TrackerReact(React.Component) {
    constructor() {
        super();
        
        this.state = {
            editName: false
        };
    }
    editName(event) {
        event.preventDefault();
        
        if (this.refs.name.value.trim()) {
            Meteor.call('editUserName', this.refs.name.value.trim(), error => {
                if (!error) {
                    this.setState({'editName':false});
                }
                else {
                    console.error(error);
                    alert('Something went wrong!');
                }
            });
        }
        else {
            alert('Please enter name.');
        }
        
    }
    nameForm(user) {
        if (this.state.editName || user && user.profile && !user.profile.name || user && !user.profile) {
            return (
                <div>
                    <form onSubmit={this.editName.bind(this)}>
                        <input type='text' ref='name' placeholder='Enter new name...' onChange={() => {}}/>
                        <input type='submit' value='Save' />
                        <button onClick={this.closeEditName.bind(this)}>Close</button>
                    </form>
                </div>
            );
        }
        
        return (
            <div>
                {this.props.user && this.props.user.profile && this.props.user.profile.name ? this.props.user.profile.name : ''}
                <button onClick={this.editUserName.bind(this)}>Edit</button>
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
                <h3>Name:</h3>
                {this.nameForm()}
            </div>
        );
    }
}