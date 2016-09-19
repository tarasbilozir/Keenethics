import React from 'react';

export default class Message extends React.Component {
    render() {
        return (
            <div>
                {`${new Date(this.props.message.date).toUTCString().slice(17,25)} ${this.props.message.text}`}
            </div>
        );
    }
}