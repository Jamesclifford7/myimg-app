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
import user_images from './user_images'

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      user: {}, 
      images: [], 
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
        images: user_images
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
    this.setState({
      selectedFile: URL.createObjectURL(event.target.files[0]), 
    });
  }

  // upload handler
  handleUpload = (event) => {
    event.preventDefault(); 
    console.log(this.state.selectedFile)
    const file = this.state.selectedFile; 
    const newImg = {
      id: 7, 
      owner_id: 1, 
      file: file
    };
    this.setState({
      images: [...this.state.images, newImg], 
      selectedFile: null
    }); 
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
