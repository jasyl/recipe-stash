import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import googleLogo from '../../img/google-logo.png';
import hero_image from '../../img/hero_image.jpg';
import Button from 'react-bootstrap/Button'
import Alert from 'react-s-alert';

class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-page">
                <img className='hero-image' src={hero_image} alt="orange soup"/>
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-site-intro">
                            <h1 className="login-site-title">Welcome to Recipe Stash!</h1>
                            <p className='login-site-desc'>
                                Recipe stash makes it easy and simple to organize all your recipes in one place without clutter! 
                            </p>
                        </div>
                        <SocialLogin />
                        <div className="or-separator">
                            <span className="or-text">OR</span>
                        </div>
                        <LoginForm {...this.props} />
                        <div className='signup-small-text'>

                        <p className="signup-link">Don't have an account?</p>
                        <p><Link className="sign-up-link" to="/signup">Sign up for free</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
            </div>
        );
    }
}


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.setMessage({message: "You're successfully logged in!", type: 'success'});
            this.props.history.push("/");
        }).catch(error => {
            this.props.setMessage({message: (error && error.message) || 'Oops! Something went wrong. Please try again!', type: 'error'});
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <Button type="submit" variant='flat' className="btn btn-block">Login</Button>
                </div>
            </form>                    
        );
    }
}

export default Login
