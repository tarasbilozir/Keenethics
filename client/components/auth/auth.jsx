import React from 'react';
import Registration from './registration.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Auth extends TrackerReact(React.Component) {
    constructor() {
        super();
        
        this.state = {
            logined: Meteor.userId() ? true : false
        };
    }
    findUser() {
        return Meteor.users.findOne({'_id':Meteor.userId()});
    }
    loginForm(user) {
        if (this.state.logined) {
            return (
                <div>
                    {user && user.emails && user.emails[0] && user.emails[0].address ? user.emails[0].address : ''}
                    <button onClick={this.logoutUser.bind(this)}>Logout</button>
                    <a href='/profile'><button>Profile</button></a><br />
                    {user && user.profile && !user.profile.location || user && user.profile && user.profile.location === 'default' ? <a href='/profile'>Please provide us your location to see messages.</a> : ''}
                    
                </div>
            );
        }
        
        return (
            <form onSubmit={this.loginUser.bind(this)}>
                <input type='text' placeholder='Enter email' ref='email' />
                <input type='password' placeholder='Enter password' ref='password' />
                <input type='submit' value='Login' />
            </form>
        );
    }
    loginUser(event) {
        event.preventDefault();
        let email = this.refs.email.value.trim(),
            password = this.refs.password.value.trim();
            
        Meteor.loginWithPassword(email, password, (data) => {
            if (!data) {
                this.setState({logined:true});
            }
            else {
                alert('Wrong email or password!')
            }
        });
    }
    logoutUser(event) {
        event.preventDefault();
        
        Meteor.logout((data) => {
            if (!data) {
                this.setState({logined:false});
            }
        });
    }
    render() {
        return (
            <div>
                <h2>{Meteor.userId() ? '' : 'Login'}</h2>
                {this.loginForm(this.findUser())}
            </div>
        );
    }
}