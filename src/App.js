import React from 'react'; 
import './App.css';
import { Route, withRouter } from 'react-router-dom'; 
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Image from './components/image/Image';
import Editprofile from './components/editprofile/Editprofile';
import Upload from './components/upload/Upload';
import user from './user';
// import user_images from './user_images'; 
import firebase from "firebase/app";
import 'firebase/storage'; 

var config = {
  apiKey: "AIzaSyAN595HmOigQEoVtvo-_Fwb8tHkA_sACXE",
  authDomain: "myimg-1cc76.firebaseapp.com",
  projectId: "myimg-1cc76",
  storageBucket: "myimg-1cc76.appspot.com",
  messagingSenderId: "789867076628",
  appId: "1:789867076628:web:945eca52cd13dcc4cc5b01",
  measurementId: "G-DB10S53E3J"
};
// Initialize Firebase
firebase.initializeApp(config);
// var storage = firebase.storage(); 
// firebase.analytics();

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      user: {}, 
      selectedFile: null
    }
  }

  // login handler 
  handleLogin = (event) => {
    event.preventDefault(); 
    // retrieve user info and validate it
    const input = event.target.input.value; 
    const password = event.target.password.value;
    if ((input === user.email || input === user.username) && password === user.password) {
      this.setState({
        user: user, 
      }); 
      // this.props.history.push('/profile');
      this.props.history.push(`/profile/${user.username}`)
    } else {
      alert('username/password not found');
    }; 
  }

  // logout handler
  handleLogout = (event) => {
    event.preventDefault(); 
    this.setState({
      user: {}, 
      images: [], 
      selectedFile: null
    }); 
    this.props.history.push('/')
  }

  onChangeHandler = (event) => {
    // this.setState({
    //   selectedFile: URL.createObjectURL(event.target.files[0]), 
    // });
    const file = event.target.files[0]; 
    this.setState({
      selectedFile: file
    })
  }
  
  // upload handler
  handleUpload = (event) => {
    event.preventDefault(); 
    const file = this.state.selectedFile;
    const folder = toString(this.state.user.id); 
    console.log(this.state.user.username)
    // create a root reference
    var storageRef = firebase.storage().ref();

    // create a reference to the image

    var imgRef = storageRef.child(`${this.state.user.username}/${file.name}`); 

    imgRef.put(file)    
      .then(snapshot => {
        console.log('uploaded')
      })

    // console.log(this.state.selectedFile)
    // const file = this.state.selectedFile; 
    // const newImg = {
    //   id: 7, 
    //   owner_id: 1, 
    //   file: file
    // };
    // this.setState({
    //   images: [...this.state.images, newImg], 
    //   selectedFile: null
    // }); 
    this.props.history.push(`/profile/${this.state.user.username}`);
  }

  handleDeleteImage = (event) => {
    event.preventDefault(); 
    // console.log(typeof parseInt(event.target.parentNode.id))
    const imgId = parseInt(event.target.parentNode.id); 
    const imgIdx = this.state.images.findIndex(img => {
      return img.id === imgId
    }); 
    const updatedImages = this.state.images; 
    updatedImages.splice(imgIdx, 1); 
    this.setState({
      images: updatedImages
    })
  }

  render() {
    // console.log(this.state.selectedFile)
    // console.log(this.state.images)
    return (
      <div className="App">
          <Route 
          exact path="/"
          component={Landing}/>
          <Route 
          path="/login"
          render={(props) => (
            <Login {...props} handleLogin={this.handleLogin} />
          )}/>
          <Route 
          path="/profile/:username"
          render={(props) => (
            <Profile {...props} images={this.state.images} user={this.state.user} handleLogout={this.handleLogout} />
          )}/>
          <Route 
          path="/image/:id"
          render={(props) => (
            <Image {...props} images={this.state.images} user={this.state.user} handleLogout={this.handleLogout} />
          )}/>
          <Route 
          path="/editprofile"
          render={(props) => (
            <Editprofile {...props} images={this.state.images} user={this.state.user} handleLogout={this.handleLogout} handleDeleteImage={this.handleDeleteImage} />
          )}/>
          <Route 
          path="/upload"
          render={(props) => (
            <Upload {...props} images={this.state.images} user={this.state.user} onChangeHandler={this.onChangeHandler} handleLogout={this.handleLogout} handleUpload={this.handleUpload} />
          )}/>
      </div>
    );
  }
}

export default withRouter(App);
