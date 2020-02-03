import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: '',
      newPassword: '',
      token:''
    }
  }

  componentDidMount() {
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    this.setState({
      userId: id,
      token
    })


    axios.get(`http://localhost:4000/user/getUser/${email}`)
      .then((response) => {
        const data = response.data.user
        this.setState({
          data
        })
      }, (error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(this.props,'-props');
    
    const id = this.state.userId
    const { history } = this.props;
    console.log(history, '------------');

    e.preventDefault();
    const url = `http://localhost:4000/user/reset-password/${id}`
    const { currentPassword, newPassword } = this.state;
    const data = { currentPassword, newPassword, };

    axios.put(url,
      data
    )
      .then((response) => {

        if (response.status === 200) {
          alert("Password Changed sucessfully")
          history.push('/home');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <form className="signin-form" onSubmit={this.handleChange}>
          <h3>Change Password</h3>

          <div className="form-group">
            <label>Current Pasword</label>
            <input
              type="password"
              onChange={(e) => this.setState({ currentPassword: e.target.value })}
              className="form-control"
              placeholder="Enter Current Pasword"
            />

          </div>
          <div className="form-group">
            <label>New Password </label>
            <input
              type="password"
              onChange={(e) => this.setState({ newPassword: e.target.value })}
              className="form-control"
              placeholder="Enter New Pasword"
            />

          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block">Submit</button>
          {!this.state.token &&
            <Link className="nav-link" to={"/sign-in"}>Back to Login</Link>
          }
        </form>
      </div>
    );
  }
}

export default ChangePassword;