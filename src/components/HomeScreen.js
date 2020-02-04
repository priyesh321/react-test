import React, { Component } from 'react';
import axios from "axios";
import Footer from './Footer/Footer'
import NavBar from './NavBar'

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: null
    }
  }

  componentDidMount() {
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    this.setState({
      token
    })

    axios.get(`https://newtestnode.herokuapp.com/user/getUser/${email}`)
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
          <h3 className="m-0"> <u>User Details</u></h3>
          <div style={{ marginTop: 25 }}>
            <img src={this.state.data.files} width={100} height={100} alt='' />
            <p className="mb-0">User Contact: {this.state.data.phoneNumber}</p>
            <p className="mb-0">User Email: {this.state.data.email}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomeScreen;