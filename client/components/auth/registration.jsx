import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Registration extends React.Component {
    registerUser(event) {
        event.preventDefault();
        
        let email = this.refs.email.value.trim(),
        password = this.refs.password.value.trim(),
        passwordRepeat = this.refs.passwordRepeat.value.trim();
        
        if (email && password && passwordRepeat) {
            if (password === passwordRepeat) {
                Accounts.createUser({
                    email: email,
                    password: password,
                    profile: {
                        name: null,
                        location: null
                    }
                }, (error) => {
                    if (!error) {
                        FlowRouter.go('/profile');
                    }
                    else {
                        alert('Something went wrong!');
                    }
                });
            }
            else {
                alert('Passwords do not match!');
                this.refs.password.value = '';
                this.refs.passwordRepeat.value = '';
            }
        }
        else {
            alert('Please fill all fields.');
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.registerUser.bind(this)}>
                    Email:<br />
                    <input type='text' placeholder='Enter email' ref='email' /><br />
                    Password:<br />
                    <input type='password' placeholder='Enter password' ref='password' /><br />
                    Repeat password:<br />
                    <input type='password' placeholder='Repeat password' ref='passwordRepeat' /><br />
                    <input type='submit' value='Register' />
                </form>
            </div>
        );
    }
}