import React from 'react'; 
import './App.css';
import { Route, withRouter } from 'react-router-dom'; 
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';
import Image from './components/image/Image';
import Editprofile from './components/editprofile/Editprofile';
import Upload from './components/upload/Upload';
// import user from './user';
// import user_images from './user_images'; 
import firebase from "firebase/app";
import 'firebase/storage'; 
// import icon from './images/user-icon.png';

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
    const input = event.target.input.value; 
    const password = event.target.password.value;

    fetch('http://localhost:8000/api/login', {
      method: 'GET', 
      headers: {
        'content-type': 'application/json', 
        'input': `${input}`, 
        'password': `${password}`
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then(resJson => {
      this.setState({
        user: resJson
      });
      this.props.history.push(`/profile/${this.state.user.username}`)
    })
    .catch(error => {
      console.log(error)
    }); 

    // if ((input === user.email || input === user.username) && password === user.password) {
    //   this.setState({
    //     user: user, 
    //   }); 
    //   this.props.history.push(`/profile/${user.username}`)
    // } else {
    //   alert('username/password not found');
    // }; 
  }

  // logout handler
  handleLogout = (event) => {
    event.preventDefault(); 
    this.setState({
      user: {}, 
      selectedFile: null
    }); 
    this.props.history.push('/')
  }

  handleSignup = (event) => {
    event.preventDefault(); 
    const email = event.target.email.value; 
    const username = event.target.username.value; 
    const password = event.target.password.value;
    // need to upload icon with post request

    // create a root reference
    // var storageRef = firebase.storage().ref();

    // create a reference to the image

    // var imgRef = storageRef.child(`${username}/user-icon.png`); 

    // const iconFile = new File([icon], "user-icon.png", {type: "image"}); 

    // imgRef.putString(iconFile)    
    //   .then(snapshot => {
    //     console.log(snapshot)
    //     // uploading to firebase
    //     console.log('icon image uploaded for signup POST request'); 
    //   })
    //   .catch(error => {
    //     console.log(error + "signup icon image upload error")
    //   }); 

    const newUser = {
      email: email.toLowerCase(), 
      username: username.toLowerCase(), 
      password: password
    }; 

    fetch('http://localhost:8000/api/users/', {
      method: 'POST', 
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then(resJson => {
      this.setState({
        user: resJson
      }); 
      this.props.history.push(`/profile/${this.state.user.username}`)
    })
    .catch(error => {
      console.log(error)
    }); 
  }

  // onchange handler for file upload
  onChangeHandler = (event) => {
    // this.setState({
    //   selectedFile: URL.createObjectURL(event.target.files[0]), 
    // });
    const file = event.target.files[0]; 
    console.log(file)
    this.setState({
      selectedFile: file
    })
  }
  
  // upload handler
  handleUpload = (event) => {
    event.preventDefault(); 
    const file = this.state.selectedFile;
    const fileName = file.name;
    console.log(file, fileName); 
    
    // create a root reference
    var storageRef = firebase.storage().ref();

    // create a reference to the image

    var imgRef = storageRef.child(`${this.state.user.username}/${fileName}`); 


    const updatedImages = this.state.user.images; 
    console.log(updatedImages)
    const newImg = {
      name: fileName, 
      date: new Date()
    }; 

    updatedImages.push(newImg); 
    // console.log(newImg)

    const updatedUser = {
      id: this.state.user.id, 
      email: this.state.user.email, 
      username: this.state.user.username, 
      password: this.state.user.password, 
      profile_img: this.state.user.profile_img, 
      images: updatedImages
    }

    // console.log(updatedImages, updatedUser)

    imgRef.put(file)    
      .then(snapshot => {
        // uploading to firebase
        console.log('uploaded'); 
      })
      .then(() => {

        // retrieve current user information via state
        // update that user via PATCH request
        fetch(`http://localhost:8000/api/users/${this.state.user.id}`, {
          method: 'PATCH', 
          body: JSON.stringify(updatedUser), 
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => {
          if (!res.ok){
            throw new Error()
          }
          return res.json()
        })
        .then(resJson => {
          console.log(resJson); 
          this.setState({
            user: resJson[0]
          }); 
        })
        .catch(error => {
          console.log(error + "fetch call error")
        })
      })
      .then(() => {
        this.setState({
          selectedFile: null
        }); 
        this.props.history.push(`/profile/${this.state.user.username}`);
      })
      .catch(error => {
        console.log(error + "firebase error")
      })
  }

  handleDeleteImage = (event) => {
    event.preventDefault(); 

    const imgName = event.target.parentNode.getAttribute('name');
    const userName = this.state.user.username;
    // console.log(imgName, userName); 

    var storageRef = firebase.storage().ref();

    const imageRef = storageRef.child(`${userName}/${imgName}`); 

    alert('are you sure?');

    // need to add DELETE request here

    const updatedImages = this.state.user.images; 
    // const indexToRemove = userImages.indexOf(userImages.imgName); 

    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i].name === imgName) {
        var indexToRemove = i; 
      }
    }; 

    updatedImages.splice(indexToRemove, 1); 

    // updating the user with removed image

    const updatedUser = {
      id: this.state.user.id, 
      email: this.state.user.email, 
      username: this.state.user.username, 
      password: this.state.user.password, 
      profile_img: this.state.user.profile_img, 
      images: updatedImages
    }; 
    
    imageRef.delete().then(() => {
      console.log('image deleted successfully from Firebase')
    })
    .then(() => {
      // PATCH request where we remove the image from the user.images array
      fetch(`http://localhost:8000/api/users/${this.state.user.id}`, {
        method: 'PATCH', 
        body: JSON.stringify(updatedUser), 
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then(resJson => {
        this.setState({
          user: resJson[0]
        })
      })
      .catch(error => {
        console.log(error, 'error occurred with PATCH request for deleting image')
      })
    })
    .then(() => {
      this.props.history.push(`/profile/${this.state.user.username}`)
    })
    .catch((error) => {
      console.log(error, 'error occurred uploading image to firebase')
    });
  }

  render() {
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
          path="/signup"
          render={(props) => (
            <Signup handleSignup={this.handleSignup} />
          )}
          />
          <Route 
          path="/profile/:username"
          render={(props) => (
            <Profile {...props} images={this.state.images} user={this.state.user} handleLogout={this.handleLogout} />
          )}/>
          <Route 
          path="/image/:name"
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
