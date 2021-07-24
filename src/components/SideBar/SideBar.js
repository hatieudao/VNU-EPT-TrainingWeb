import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import logo from '../../image/logo-education.png';
import './SideBar.css';
function SideBar() {
    const [isShow, setIsShow] = useState(true);
    return (<>{isShow ?
        <div className={classNames({ "sidebar": true, "sidebar--hidden": false })} >
            <button className="sidebar__toggle"
                onClick={() => setIsShow(!isShow)} >
                {isShow ? <ArrowBackOutlinedIcon /> : <ListOutlinedIcon />}
            </button>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <div className="sidebar__options">
                <div className="sidebar__option">
                    <DashboardOutlinedIcon fontSize="large" />
                    <p className="sidebar__option__title">Dashboard</p>
                </div>
                <div className="sidebar__option">
                    <BorderColorOutlinedIcon fontSize="large" />
                    <p className="sidebar__option__title">Study</p>
                </div>
                <Link to="/profile">
                    <div className="sidebar__option">
                        <PersonOutlinedIcon fontSize="large" />
                        <p className="sidebar__option__title">Profile</p>
                    </div>
                </Link>
            </div>
        </div>
        : <button className="sidebar__toggle--hidden"
            onClick={() => setIsShow(!isShow)} >
            <ListOutlinedIcon />
        </button>
    }
    </>
    )
}

export default SideBar;
