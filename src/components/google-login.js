import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "./firebase";
class GoogleLogin extends Component{

    onSubmit = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
       console.log(error);
        // ...
      });
    }
    componentDidMount =() =>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              console.log("User Sign in")
            } else {
              console.log("No User Sign in")
            }
          });

    }

    render(){
        return(
        
        <div class="container d-flex justify-content-center my-5">
        <div class="row my-2 mx-2 main">
        <div class="col-md-6 d-flex justify-content-center">
           
            <form class="formone">
                <h6 class="header"> </h6>
           <div>
           <div class="form-group col-md-8 xyz"> <button type="button" class="btn btn-primary gplus" onClick={this.onSubmit}><i class="fa fa-google"></i> Google</button> </div>
                        
  </div>
    </form>
        </div>
        </div>
        </div>

        );
    }
}
export default GoogleLogin;