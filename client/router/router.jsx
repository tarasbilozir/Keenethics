import React from 'react';
import {mount} from 'react-mounter';

import {Layout} from '../layout/layout.jsx';
import App from '../app.jsx';
import Registration from '../components/auth/registration.jsx';
import Auth from '../components/auth/auth.jsx';
import Profile from '../components/profile/profile.jsx';

FlowRouter.route('/', {
    action() {
        mount(Layout, {
            content: (<App />)
        })
    }
});

FlowRouter.route('/registration', {
    action() {
        mount(Layout, {
            content: (<Registration />)
        })
    }
});

FlowRouter.route('/profile', {
    action() {
        mount(Layout, {
            content: (<Profile />)
        })
    }
});