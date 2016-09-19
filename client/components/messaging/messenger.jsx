import React from 'react';
import Message from './message.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

Messages = new Mongo.Collection('messages');

export default class Messenger extends TrackerReact(React.Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                messages: Meteor.subscribe('messages')
            }
        };
    }
    componentWillUnmount() {
        this.state.subscription.messages.stop();
    }
    sendMessage(event) {
        event.preventDefault();
        let message = this.refs.messageInput.value.trim();
        
        if (Meteor.userId()) {
            if (message) {
                Meteor.call('sendMessage', message, (error, data) => {
                    this.refs.messageInput.value = '';
                });
            }
            else {
                alert('Enter message please.');
            }
        }
        else {
            alert('Please sign-in.');
        }
    }
    messages() {
        let user = Meteor.user();
        
        return Messages.find({location: user && user.profile && user.profile.location}).fetch();
    }
    render() {
        if (Meteor.userId()) {
            return (
                <div>
                    <h2>Lets chat!</h2>
                    <form onSubmit={this.sendMessage.bind(this)}>
                        <input type='text' placeholder='Enter message...' ref='messageInput' />
                        <input type='submit' value='Send' />
                    </form>
                    <ul>
                        {this.messages().map((message) => {
                            return <Message key={message._id} message={message} />
                        })}
                    </ul>
                </div>
            );
        }
        
        return (
            <div></div>
        );
        
    }
}