import React from 'react';
import Messenger from './components/messaging/messenger.jsx';
import Auth from './components/auth/auth.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Auth />
                <Messenger />
            </div>
        );
    }
}