import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../reducers/slices/user';
import { auth } from '../../firebase';
import './Profile.css';
function Profile() {
    const user = useSelector(state => state.user[0]);
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className="profile">
            {/* <img src="" alt="" srcset="" /> */}
            <h1>{user?.displayName}</h1>
            <h3>{user?.email}</h3>
            {user?.photoURL &&
                <img src={user.photoURL} alt="avatar" />}
            <button className="logout" onClick={() => {
                dispatch(logout());
                auth.signOut()
                    .then(() => history.push('/login'))
                    .catch(e => alert(e.message))
            }}>Logout</button>
        </div>
    )
}

export default Profile
