import React, { Component } from 'react';
import axios from "axios";
import Footer from './Footer/Footer'
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      token: ''
    }
  }

  componentDidMount() {
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    this.setState({
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

  render() {
    return (
      <div>
        <NavBar data={this.state.data} propsData={this.props} />
        <div className="user-details mt-3">
          {!this.state.token &&
            <div>
              <p>Please Sign in to view the home screen</p>
            </div>
          }
          <h3 className="m-0">User Details</h3>
          <img src={this.state.data.files} width={100} height={100} />
          <p className="mb-0">User Contact:{this.state.data.phoneNumber}</p>
          <p className="mb-0">User Email:{this.state.data.email}</p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomeScreen;