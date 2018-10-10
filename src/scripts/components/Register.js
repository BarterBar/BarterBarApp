import React, { Component } from 'react';
import firebase from '../firebase';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            showForm: '',
            email: '',
            password: '',
            confirmPassword: '',
            userName: '',
            user: null,
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showForm = (e) => {
        e.preventDefault();
        this.setState({
            showForm: e.target.className
        })
        console.log(this.state.showForm);

    }

    signUp = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((data) => {
                    const userId = data.user.uid
                    // console.log(userId);

                    const usersDirectory = firebase.database().ref(`users/${userId}`);
                    usersDirectory.set({
                        email: this.state.email,
                        userName: this.state.userName
                    })
                });
        }
    }

    logIn = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                const userId = data.user.uid;
                this.setState({
                    user: userId
                })
            });
    }



    render() {
        let form = '';
        if (this.state.showForm === "register") {
            form = (
                <form onSubmit={this.signUp} action="">
                    <label htmlFor="email" className="floatingLabel">Email</label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} required />

                    <label htmlFor="userName" className="floatingLabel">User Name</label>
                    <input type="text" name="userName" id="userName" onChange={this.handleChange} required />

                    <label htmlFor="password" className="floatingLabel">Password</label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} required />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={this.handleChange} required />

                    <input type="submit" />
                </form>
            )
        } else if (this.state.showForm === "login") {
            form = (
                <form onSubmit={this.logIn} action="">
                    <label htmlFor="email" className="floatingLabel">Email</label>
                    <input type="email" name="email" id="email" onChange={this.handleChange} required />

                    <label htmlFor="password" className="floatingLabel">Password</label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} required />

                    <input type="submit" />
                </form>
            )
        }

        return (
            <section className="auth">
                <ul className="container container--login">
                    <li className="container__listItem"><a href="" className="register" onClick={this.showForm}>Register</a></li>
                    <li className="container__listItem"><a href="" className="login" onClick={this.showForm}>Log In</a></li>
                </ul>
                {form}
            </section>
        );
    }
};

export default Register;