import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import FileBase64 from 'react-file-base64';
import axios from "axios";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      emailValidation: '',
      passwordValidation: '',
      dobValidation: '',
      addressValidation: '',
      phoneValidation: '',
      imageValidation: '',
      errors: {},
      files: [],
      phoneNumber: '',
      email: '',
      address: '',
      dob: '',
      password: '',
      answer1: '',
      answer2: '',
      answer3: '',
      question1: { label: '', value: "" },
      question2: { label: '', value: "" },
      question3: { label: '', value: "" },
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

  getFiles(files) {
    this.setState({ files: files[0].base64 })
  }

  handleQuestionValChange = (option, index) => {
    const newQuestionVals = this.state.questionVals;
    newQuestionVals[index] = option;
    this.setState({
      [index]: option

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

  handleSignup = (e) => {
    const { history } = this.props
    e.preventDefault();
    const url = "http://localhost:4000/user/signup"
    const { phoneNumber, email, password, address, dob, answer1, answer2, answer3, files, question1: { value: question1 },  question2: { value: question2 }, question3: { value: question3 } } = this.state;
    const data = { email, password, dob, phoneNumber, answer1, answer2, answer3, address, files, question1, question2, question3 };
    const emailValidation = this.validateEmail(email)
    const passwordValidation = this.validatePassword(password)
    const dobValidation = this.validateDob(dob)
    const addressValidation = this.validateAddress(address)
    const phoneValidation = this.validatePhone(phoneNumber)
    const imageValidation = this.validateImage(files)
    this.setState({
      emailValidation,
      passwordValidation,
      dobValidation,
      addressValidation,
      phoneValidation,
      imageValidation
    })

    axios.post(url,
      data
    )
      .then((response) => {
        if (response.status === 200) {
          history.push('/sign-in');
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
      <div>

        <form className="signin-form" onSubmit={this.handleSignup}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
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
              onChange={(e) => this.setState({ address: e.target.value })}
              className="form-control"
              placeholder="Address"
            />
            <p style={{ color: 'red' }}>{this.state.addressValidation}</p>
          </div>

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
            <label>Date of birth</label>
            <input
              type="date"
              onChange={(e) => this.setState({ dob: e.target.value })}
              className="form-control"
              placeholder="Enter DOB" />
            <p style={{ color: 'red' }}>{this.state.dobValidation}</p>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control"
              placeholder="Enter password" />
            <p style={{ color: 'red' }}>{this.state.passwordValidation}</p>
          </div>

          <div className="form-group">
            <label>Security Question</label>

            <Select
              name="question1"
              placeholder="Question #1"
              value={this.state.question1}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, "question1");
              }}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Answer #1"
              onChange={(e) => this.setState({ answer1: e.target.value })}
            />

            < br />
            <Select
              name="question2"
              placeholder="Question #2"
              value={this.state.question2}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, "question2");
              }}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Answer #2"
              onChange={(e) => this.setState({ answer2: e.target.value })}
            />

            < br />
            <Select
              name="question3"
              placeholder="Question #3"
              value={this.state.question3}
              options={this.getAvailableOptions()}
              onChange={e => {
                this.handleQuestionValChange(e, "question3");
              }}
            />


            <input
              type="text"
              className="form-control"
              placeholder="Answer #3"
              onChange={(e) => this.setState({ answer3: e.target.value })}
            />

            < br />
            <FileBase64
              multiple={true}
              onDone={this.getFiles.bind(this)} />
            <p style={{ color: 'red' }}>{this.state.imageValidation}</p>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          <p className=" text-right">
            Already registered?
             <Link className="nav-link" to={"/sign-in"}>Login</Link>
          </p>
        </form>
      </div>

    );
  }
}