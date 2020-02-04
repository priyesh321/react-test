import React, { Component } from "react";
import Select from "react-select";
import FileBase64 from 'react-file-base64';
import axios from "axios";

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      data: {},
      emailValidation: '',
      passwordValidation: '',
      dobValidation: '',
      addressValidation: '',
      phoneValidation: '',
      imageValidation: '',
      files: '',
      phoneNumber: '',
      email: '',
      address: '',
      dob: '',
      password: '',
      answer: '',
      answer2: '',
      answer3: '',
      questionVals: [null, null, null],
      filterOptions: [
        {
          value: "What was your childhood nickname?",
          label: "What was your childhood nickname ?"
        },
        {
          value: "In what city did you meet your spouse / significant other?",
          label: "In what city did you meet your spouse / significant other?"
        },
        {
          value: "What is the name of your favorite childhood friend?",
          label: "What is the name of your favorite childhood friend?"
        },
        {
          value: "What street did you live on in third grade?",
          label: "What street did you live on in third grade?"
        },
        {
          value: "What is the middle name of your youngest child?",
          label: "What is the middle name of your youngest child?"
        },
        {
          value: "What is the middle name of your oldest sibling?",
          label: "‘What is the middle name of your oldest sibling?"
        },
        {
          value: "What school did you attend for sixth grade?",
          label: "What school did you attend for sixth grade"
        },
        {
          value: "What was the name of your first stuffed animal?",
          label: "What was the name of your first stuffed animal?"
        },
        {
          value: "In what city or town did your mather and father meet?",
          label: "In what city or town did your mather and father meet?"
        }
      ]
    };
  }

  componentDidMount() {
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("id")
    this.setState({
      userId: id
    })
    axios.get(`http://localhost:4000/user/getUser/${email}`)
      .then((response) => {
        const data = response.data.user
        this.setState({
          phoneNumber: data.phoneNumber,
          address: data.address,
          files: data.files,
          dob: data.dob,
          data
        })
      }, (error) => {
        console.log(error);
      });
  }

  getFiles(files) {
    this.setState({ files: files[0].base64 })
  }

  handleQuestionValChange = (option, index) => {
    const newQuestionVals = this.state.questionVals;
    newQuestionVals[index] = option;
    this.setState(state => {
      return {
        answer: newQuestionVals
      };
    });
  };

  getAvailableOptions = () => {
    const availableOptionsLeft = this.state.filterOptions;
    return availableOptionsLeft.filter(questionOption => {
      return this.state.questionVals.indexOf(questionOption) === -1;
    });
  };

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
      error = "Password must be 6 digit"
    } else {
      error = ""
    }
    return error
  }

  validateDob = dob => {
    let error
    if (!dob) {
      error = "Invalid dob"
    } else if (!dob) {
      error = "DOB cannot be empty"
    } else {
      error = ""
    }
    return error
  }

  validateAddress = address => {
    let error
    if (!address) {
      error = "Invalid Address"
    } else if (!address) {
      error = "Address cannot be empty"
    } else {
      error = ""
    }
    return error
  }

  validatePhone = phone => {
    let error
    if (!phone) {
      error = "Invalid Phone number"
    } else if (phone.length < 10) {
      error = "Invalid Phone number"
    } else {
      error = ""
    }
    return error
  }

  validateImage = image => {
    let error
    if (!image) {
      error = "Image cannot be empty"
    } else if (!image) {
      error = "Image not selected"
    } else {
      error = ""
    }
    return error
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { history } = this.props
    const id = this.state.userId
    const url = `https://newtestnode.herokuapp.com/user/updateUser/${id}`
    const { phoneNumber, address, dob, files } = this.state;
    const data = { dob, phoneNumber, address, files };
    const dobValidation = this.validateDob(dob)
    const addressValidation = this.validateAddress(address)
    const phoneValidation = this.validatePhone(phoneNumber)
    this.setState({
      dobValidation,
      addressValidation,
      phoneValidation,
    })
    axios.put(url,
      data
    )
      .then((response) => {
        if (response.status === 200) {
          alert("updated sucessfully")
          history.push('/home');
        } else {
          history.push('/sign-in');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const data = this.state.data
    return (
      <div>
        <form className="signin-form" method="post" onSubmit={this.handleEdit}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              defaultValue={data.phoneNumber}
              onChange={(e) => this.setState({ phoneNumber: e.target.value })}
              className="form-control"
              placeholder="Phone Number"
            />
            <p style={{ color: 'red' }}>{this.state.phoneValidation}</p>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              defaultValue={data.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              className="form-control"
              placeholder="Address"
            />
            <p style={{ color: 'red' }}>{this.state.addressValidation}</p>
          </div>

          <div className="form-group">
            <label>Date of birth</label>
            <input
              type="date"
              defaultValue={data.dob}
              onChange={(e) => this.setState({ dob: e.target.value })}
              className="form-control"
              placeholder="Enter DOB" />
            <p style={{ color: 'red' }}>{this.state.dobValidation}</p>
          </div>

          <div className="form-group">
            <label>Security Question</label>
            <Select
              name="filters"
              placeholder={data.question1}
              defaultValue={data.question1}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, 0);
              }}
            />
            <input
              type="text"
              defaultValue={data.answer1}
              className="form-control"
              placeholder="Answer #1"
            />

            <br />

            <Select
              name="filters"
              defaultValue={data.question2}
              placeholder={data.question2}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, 1);
              }}
            />
            <input
              type="text"
              defaultValue={data.answer2}
              className="form-control"
              placeholder="Answer #2"
            />

            <br />

            <Select
              name="filters"
              placeholder={data.question3}
              defaultValue={data.question3}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, 2);
              }}
            />
            <input
              type="text"
              defaultValue={data.answer3}
              className="form-control"
              placeholder="Answer #3" />

            <br />

            <FileBase64
              multiple={true}
              defaultValue={this.state.files}
              onDone={this.getFiles.bind(this)}
            />
            <p style={{ color: 'red' }}>{this.state.imageValidation}</p>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Save</button>
        </form>
      </div>
    );
  }
}