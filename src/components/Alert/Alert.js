import React from 'react';
import logo from '../../image/logo-education.png';
import './Alert.css';
function Alert({ message }) {
    return (
        <div className="notification">
            <img src={logo} alt="logo" />
            <p className="notification">{message}</p>
        </div>
    )
}

export default Alert
