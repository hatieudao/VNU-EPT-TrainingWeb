import React, { useState, useEffect } from 'react';
import { auth, provider, facebookProvider } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import logoFacebook from '../../image/facebook.png';
import logoGoogle from '../../image/search.png';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import swal from '@sweetalert/with-react';
import Alert from '../Alert/Alert';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/slices/user';
import './Login.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const signIn = (e) => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                dispatch(login(auth.user));
                history.push('/profile');
            })
            .catch(e => swal(<Alert message={e.message} />));
    }
    const signInGoogle = (e) => {
        e.preventDefault();
        auth
            .signInWithPopup(provider)
            .then(auth => {
                dispatch(login(auth.user));
                history.push('/profile');
            })
            .catch(e => swal(<Alert message={e.message} />));
    }
    const signInFacebook = (e) => {
        e.preventDefault();
        auth
            .signInWithPopup(facebookProvider)
            .then(auth => {
                dispatch(login(auth.user));
                history.push('/profile');
            })
            .catch(e => swal(<Alert message={e.message} />));
    }

    useEffect(() => {
        if (history.location.state?.from !== '/register')
            swal(<Alert message="Please login to continue ^^" />);
    }, []);

    return (
        <div className="login">
            <form action="#" className="loginForm">
                <h1 className="login__title">Login</h1>
                <div className="userInput">
                    <span>Username</span>
                    <div className="userInput__areaType">
                        <PersonOutlineOutlinedIcon className="input__icon" style={{ color: '#333' }} />
                        <input type="text" className="input" name="user"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Type your username" />
                        <div className="input--focus"></div>
                    </div>
                </div>
                <div className="userInput">
                    <span>Password</span>
                    <div className="userInput__areaType">
                        <LockOutlinedIcon className="input__icon" style={{ color: '#333' }} />
                        <input type="password" className="input"
                            onChange={e => setPassword(e.target.value)}
                            name="pass" placeholder="Type your password" />
                        <div className="input--focus"></div>
                    </div>
                </div>
                <button type="submit" onClick={signIn}
                    className="userInput__submitButton">LOGIN</button>
                <Link to="/register">
                    <h5 className="directTitle">Don't have an account, Sign Up</h5>
                </Link>
                <h5 className="bottomTitle">Or Sign Up Using</h5>
                <div className="login__social">
                    <button onClick={signInFacebook}>
                        <img src={logoFacebook} alt="facebook" />
                    </button>
                    <button onClick={signInGoogle}>
                        <img src={logoGoogle} alt="google" />
                    </button>
                </div>
            </form>
        </div >
    )
}

export default Login
