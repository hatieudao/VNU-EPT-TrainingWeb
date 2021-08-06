import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import swal from '@sweetalert/with-react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/slices/user';
import ClassNames from 'classnames';
import './Register.css';
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const Register = (e) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                dispatch(login(auth.user));
                history.push('/profile');
            })
            .catch(e => swal(e.message));
    }


    return (
        <div className="login">
            <form action="#" className="loginForm">
                <h1 className="login__title">Register</h1>
                <div className="userInput">
                    <span>Email</span>
                    <div className="userInput__areaType">
                        <PersonOutlineOutlinedIcon className="input__icon" style={{ color: '#333' }} />
                        <input type="text" className="input" name="user"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Type your email" required />
                        <div className="input--focus"></div>
                    </div>
                </div>
                <div className="userInput">
                    <span>Password</span>
                    <div className="userInput__areaType">
                        <LockOutlinedIcon className="input__icon" style={{ color: '#333' }} />
                        <input type="password" className="input"
                            onChange={e => setPassword(e.target.value)}
                            name="pass" placeholder="Type your password" required />
                        <div className="input--focus"></div>
                    </div>
                </div>
                <div className="userInput">
                    <span>Confirm Password</span>
                    <div className="userInput__areaType">
                        <LockOutlinedIcon className="input__icon" style={{ color: '#333' }} />
                        <input type="password" className="input"
                            onChange={e => setRePassword(e.target.value)}
                            name="pass" placeholder="Confirm your password" />
                        <div className={ClassNames({
                            'input--focus': true,
                            'confirm--success': password === rePassword && password.length !== 0,
                            'confirm--error': password !== rePassword || password.length === 0
                        })}>
                            {password === rePassword && password.length !== 0 ?
                                <p className="confirm__message--success">OK</p> :
                                (password.length !== 0 ?
                                    <p className="confirm__message--error">Error</p>
                                    : null
                                )}
                        </div>
                    </div>
                </div>
                <button type="submit" onClick={Register}
                    className="userInput__submitButton">Register</button>
                <Link to={{
                    pathname: '/login',
                    state: { from: '/register' }
                }} >
                    <h3 className="directTitle">You have an account, Login</h3>
                </Link>
            </form>
        </div >
    )
}

export default Register;
