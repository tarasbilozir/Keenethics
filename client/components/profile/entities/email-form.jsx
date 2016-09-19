import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailForm extends TrackerReact(React.Component) {
    constructor() {
        super();
        
        this.state = {
            editEmail: false
        };
    }
    editEmail(event) {
        event.preventDefault();
        
        if (this.refs.email.value.trim()) {
            Meteor.call('editUserEmail', this.refs.email.value.trim(), error => {
                if (!error) {
                    this.setState({'editEmail':false});
                }
                else {
                    console.error(error);
                    alert('Something went wrong!');
                }
            });
        }
        else {
            alert('Please enter new email.');
        }
    }
    emailForm() {
        if (this.state.editEmail) {
            return (
                <div>
                    <form onSubmit={this.editEmail.bind(this)}>
                        <input type='email' ref='email' placeholder='Enter new email...' onChange={() => {}} />
                        <input type='submit' value='Save' />
                        <button onClick={this.closeEditEmail.bind(this)}>Close</button>
                    </form>
                </div>
            );
        }
        
        return (
            <div>
                <div>
                    {this.props.user && this.props.user.emails && this.props.user.emails[0] && this.props.user.emails[0].address ?  this.props.user.emails[0].address : ''}
                    <button onClick={this.editUserEmail.bind(this)}>Edit</button>
                </div>
            </div>
        );
    }
    editUserEmail(event, param) {
        event.preventDefault();
        
        this.setState({'editEmail':true});
    }
    closeEditEmail(event) {
        event.preventDefault();
        
        this.setState({'editEmail':false});
    }
    render() {
        return (
            <div>
                <h3>Email:</h3>
                {this.emailForm()}
            </div>
        );
    }
}