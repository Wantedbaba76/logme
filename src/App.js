import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PrimaryButton from 'react-bootstrap/Button';
import firebase from "./components/firebase";
import GoogleLogin from './components/google-login';
import myImg from './log.svg';
import backImg from './back.png';

export default class PhoneLogin extends Component {
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
    };
  }


  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        
        window.confirmationResult = confirmationResult;
        var code = window.prompt("Enter OTP");
confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  console.log("User is signed in");
  
  if (user) {
    window.alert("Welcome User");
  } else {
    console.log("Bad input Otp")
  }
  // ...
}).catch(function (error) {
 
});
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        console.log("Result" + result.verificationID);
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  render() {
    return (
      
      <div class="container-sm">
      <div class="forms-container">
              <div class="signin-signup">
              <tr>
              <td>
      <Card style={{ width: '500px',align:'center' }}  responsive="sm">
  <Card.Header style={{width:'auto', height:'50%', paddingLeft:'auto' }}>
  
  <form action="#" type="submit" ><img src={backImg} alt="Avatar" style={{width:'50px' }}></img></form>
   </Card.Header>
  <Card.Body >
    

 
<GoogleLogin />
   
<Row className="justify-content-center" responsive="sm">
            <Col xs={10} md={6} lg={10}>
            <img src={myImg} alt="Avatar" style={{width:'330px'}}></img>
            
              <h5 className="mb-3">Login with mobile otp</h5>
              <Form className="form" onSubmit={this.onSignInSubmit}>
                <div id="recaptcha-container"></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </Form.Group>
                <PrimaryButton button="Submit" type="submit" >Send Otp</PrimaryButton>
              </Form>
              </Col>
          </Row> 
 

  </Card.Body>
</Card>
</td><div></div><td style={{width:'auto',  paddingright:'auto' }}>
<Card style={{ width: '500px',align:'center' }}  responsive="sm">
  <Card.Header style={{width:'auto', height:'50%', paddingLeft:'auto' }}>
  
  <form action="#" type="submit" ><img src={backImg} alt="Avatar" style={{width:'0px' }}></img></form>
  </Card.Header>
<Card.Body >
    

<Row className="justify-content-center" responsive="sm">
            <Col xs={10} md={6} lg={10}>
            <img src={myImg} alt="Avatar" style={{width:'330px'}}></img>
            
              <h5 className="mb-3">Registration </h5>
              <Form className="form" onSubmit={this.onSignInSubmit}>
                <div id="recaptcha-container"></div>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={this.onChangeHandler}
                    required
                  />
                  <br></br>
                   <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </Form.Group>
                <PrimaryButton button="Submit" type="submit" >Register</PrimaryButton>
              </Form>
              </Col>
          </Row> 
 

  </Card.Body>
</Card>
</td>
<div></div>
</tr>
              
     </div>
      </div>
     </div>
      
    );
  }
}