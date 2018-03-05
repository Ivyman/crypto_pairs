import React from 'react';
import FontAwesome from 'react-fontawesome';

import NotificationStyles from './NotificationStyles';


class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.dismissTimeout = 30000;
    }

    componentDidMount() {
        setTimeout(() => this.props.dismiss(null, this.props.id), this.dismissTimeout);
    };

    render() {
        let {
            id,
            content,
            type,
            dismiss
        } = this.props;

        return(
            <div style={NotificationStyles.wrapper}>
                <div style={{...NotificationStyles[`${type}Type`], ...NotificationStyles.container}}>
                    {/* Close button */}
                    <button
                        onClick={(e) => dismiss(e, id)}
                        style={NotificationStyles.closeButton}>
                        &times;
                    </button>

                    {/* Content */}

                    <FontAwesome
                        name={(type === 'warning') ? 'exclamation-triangle' : 'exclamation-circle'}
                        style={{...NotificationStyles.sign, ...NotificationStyles[`${type}Sign`]}}/>
                    {content}
                </div>
            </div>
        );
    }
}

export default Notification;