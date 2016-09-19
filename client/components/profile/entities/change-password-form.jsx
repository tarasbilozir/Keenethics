import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CheckPasswordForm extends React.Component {
    changeAccountPassword(event) {
        event.preventDefault();
        let oldPassword = this.refs.oldPassword.value.trim(), 
            newPassword = this.refs.newPassword.value.trim(), 
            repeatPassword = this.refs.repeatPassword.value.trim();
        
        if (newPassword === repeatPassword) {
            Accounts.changePassword(oldPassword, newPassword, data => {
                if (!data) {
                    alert('Password succesfully changed.');
                    clearFields.call(this);
                }
                else {
                    alert('Something went wrong!');
                }
            });
        }
        else {
            alert('Passwords do not match!');
            clearFields.call(this);
        }
        
        function clearFields() {
            this.refs.oldPassword.value = '', 
            this.refs.newPassword.value = '', 
            this.refs.repeatPassword.value = '';
        }
        
    }
    render() {
        return (
            <div>
                <form onSubmit={this.changeAccountPassword.bind(this)}>
                    <h3>Change password:</h3>
                    Old password:
                    <br />
                    <input type='password' ref='oldPassword' placeholder='...' /><br />
                    New password:
                    <br />
                    <input type='password' ref='newPassword' placeholder='...' /><br />
                    Repeat password:
                    <br />
                    <input type='password' ref='repeatPassword' placeholder='...' /><br />
                    <input type='submit' />
                </form>
            </div>
        );
    }
}