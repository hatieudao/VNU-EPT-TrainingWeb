import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import PermDataSettingOutlinedIcon from '@material-ui/icons/PermDataSettingOutlined';
import logo from '../../image/logo-education.png';
import './SideBar.css';
import { useSelector } from 'react-redux';
function SideBar() {
    const [isShow, setIsShow] = useState(true);
    const role = useSelector(state => state.user.role);
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
                <Link to="/setting">
                    <div className="sidebar__option">
                        <PermDataSettingOutlinedIcon fontSize="large" />
                        <p className="sidebar__option__title">Setting Exam</p>
                    </div>
                </Link>
                <Link to="/study">
                    <div className="sidebar__option">
                        <BorderColorOutlinedIcon fontSize="large" />
                        <p className="sidebar__option__title">Study</p>
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="sidebar__option">
                        <PersonOutlinedIcon fontSize="large" />
                        <p className="sidebar__option__title">Profile</p>
                    </div>
                </Link>
                {
                    role > 0 ?
                        <Link to="/dashboard">
                            <div className="sidebar__option">
                                <DashboardOutlinedIcon fontSize="large" />
                                <p className="sidebar__option__title">Dashboard</p>
                            </div>
                        </Link> : null
                }
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
