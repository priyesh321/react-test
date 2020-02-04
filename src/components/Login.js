import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailValidation: '',
      passwordValidation: ''
    }
  }

  componentDidMount() {
    const {history} = this.props
    const token = localStorage.getItem("token")
    if(token !== null) {
      history.push('/home')
    }
  }

  validateEmail = email => {
    let error
    if (!email) {
      error = "Please enter the email address"
    } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = ""
    } else {
      error = "Please enter valid email address"
    }
    return error
  }

  validatePassword = password => {
    let error
    if (!password) {
      error = "Invalid password"
    } else if (password.length < 6) {
      error = "Invalid password"
    } else {
      error = ""
    }
    return error
  }


  handleSignin = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const url = "https://newtestnode.herokuapp.com/user/login"
    const { email, password } = this.state;
    const emailValidation = this.validateEmail(email)
    const passwordValidation = this.validatePassword(password)
    this.setState({
      emailValidation,
      passwordValidation,
    })
    const data = { email, password };
    axios.post(url,
      data
    )
      .then((response) => {
        if (response.status === 200) {
          const { email } = response.data;
          const { token } = response.data;
          const { id } = response.data
          localStorage.setItem("email", email);
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);

          history.push('/home');
        } else {
          history.push('/sign-up');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <form className="signin-form" onSubmit={this.handleSignin}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            onChange={(e) => this.setState({ email: e.target.value })}
            className="form-control"
            placeholder="Enter email"
          />
          <p style={{ color: 'red' }}>{this.state.emailValidation}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            className="form-control"
            placeholder="Enter password"
          />
          <p style={{ color: 'red' }}>{this.state.passwordValidation}</p>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block">Submit</button>
        <Link className="nav-link" to={"/sign-up"}>New user? Register</Link>
      </form>
    );
  }
}